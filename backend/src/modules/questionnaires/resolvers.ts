import { getRepository } from 'typeorm';
import Questionnaire from 'entities/Questionnaire';

export default {
    addQuestionnaire: async (_, { grade, speed, value, comments, groupId }): Promise<Questionnaire | Error> => {
        const questionnaire = new Questionnaire();
        questionnaire.grade = grade;
        questionnaire.speed = speed;
        questionnaire.value = value;
        questionnaire.comments = comments;
        questionnaire.groupId = groupId;
        const saved = await getRepository(Questionnaire).save(questionnaire);
        return saved;
    },
    questionnaires: async (_, __, { auth, user }): Promise<Questionnaire[] | Error> => {
        if (!auth || (user && !user.isAdmin)) {
            throw new Error('Brak uprawnień');
        }
        const questionnaires = await getRepository(Questionnaire).find();
        return questionnaires;
    },
};
