import Class, { ClassType } from 'entities/Class';
import { getRepository } from 'typeorm';
import User from 'entities/User';

const addClass = async (classData: ClassType): Promise<void> => {
    const newClass = new Class();
    newClass.groupId = classData.groupId;
    newClass.classNumber = classData.classNumber;
    newClass.title = classData.title;
    if (classData.takenOn) {
        newClass.takenOn = classData.takenOn;
    }
    newClass.isReportRequired = classData.isReportRequired;

    await getRepository(Class).save(newClass);
};

const updateClass = async (classData: ClassType): Promise<void> => {
    const classId = { id: Number(classData.id), groupId: Number(classData.groupId) };
    const editedClass = await getRepository(Class).findOne(classId);

    if (classData.classNumber !== null && classData.classNumber !== editedClass.classNumber) {
        editedClass.classNumber = classData.classNumber;
    }
    if (classData.title !== null && classData.title !== editedClass.title) {
        editedClass.title = classData.title;
    }
    if (classData.takenOn !== null && classData.takenOn !== editedClass.takenOn) {
        editedClass.takenOn = classData.takenOn;
    }
    if (classData.isReportRequired !== null && classData.isReportRequired !== editedClass.isReportRequired) {
        editedClass.isReportRequired = classData.isReportRequired;
    }

    await getRepository(Class).save(editedClass);
};

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

        await addClass(classData);
        return 'Dodano zajęcia';
    },
    putClass: async (_, { classData }: { classData: ClassType }, { auth }): Promise<string | Error> => {
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

        if (!classData.id) {
            await addClass(classData);
            return 'Dodano zajęcia';
        } else {
            await updateClass(classData);
            return 'Zaktualizowano zajęcia';
        }
    },
    removeClass: async (_, { classData }: { classData: ClassType }, { auth }): Promise<string | Error> => {
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

        if (!classData.id || !classData.groupId) {
            return new Error('Brak danych');
        } else {
            const classToRemove = await getRepository(Class).findOne({ id: classData.id, groupId: classData.groupId });
            await getRepository(Class).delete(classToRemove);
            return 'Usunięto zajęcia';
        }
    },
};
