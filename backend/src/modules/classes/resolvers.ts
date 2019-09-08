import Class, { ClassType } from 'entities/Class';
import { getRepository } from 'typeorm';
import User from 'entities/User';

export default {
    addClass: async (_, { classData }: { classData: ClassType }, { auth }): Promise<string | Error> => {
        if (!classData) {
            return new Error('Brak danych');
        }

        if (!auth) {
            return new Error('Brak uprawnień');
        }

        const user = await getRepository(User).findOne({ album: auth.album });

        if (!user.isAdmin) {
            return new Error('Brak uprawnień');
        }

        const newClass = new Class();
        newClass.groupId = classData.groupId;
        newClass.classNumber = classData.classNumber;
        newClass.title = classData.title;
        if (classData.takenOn) {
            newClass.takenOn = classData.takenOn;
        }

        await getRepository(Class).save(newClass);

        return 'Dodano zajęcia';
    },
};
