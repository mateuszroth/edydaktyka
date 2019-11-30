import { getRepository } from 'typeorm';
import User from 'entities/User';
import UserGrade from 'entities/UserGrade';

interface Grade {
    id?: number;
    userId: number;
    groupId: number;
    grade: number;
    gradedOn?: Date;
}

interface ExistingGrade extends Grade {
    id: number;
}

async function addGrade(grade: Grade): Promise<UserGrade> {
    const newGrade = new UserGrade();
    newGrade.groupId = grade.groupId;
    newGrade.userId = grade.userId;
    newGrade.grade = grade.grade;
    newGrade.gradedOn = new Date();
    return await getRepository(UserGrade).save(newGrade);
}

async function updateGrade(grade: ExistingGrade): Promise<UserGrade> {
    const gradeId = { id: grade.id, groupId: grade.groupId, userId: grade.userId };
    const editedGrade = await getRepository(UserGrade).findOne(gradeId);

    if (grade.grade !== null && grade.grade !== editedGrade.grade) {
        editedGrade.grade = grade.grade;
    }
    editedGrade.gradedOn = new Date();

    return await getRepository(UserGrade).save(editedGrade);
}

export default {
    putUserGrade: async (_, { grade }, { auth }): Promise<UserGrade | Error> => {
        if (!grade) {
            return new Error('Brak danych');
        }

        if (!auth) {
            return new Error('Brak uprawnień');
        }

        const user = await getRepository(User).findOne({ album: auth.album });

        if (!user.isAdmin) {
            return new Error('Brak uprawnień');
        }

        if (!grade.id) {
            return await addGrade(grade);
        } else {
            return await updateGrade(grade);
        }
    },
};
