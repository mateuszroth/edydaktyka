import Class from 'entities/Class';
import { getRepository } from 'typeorm';
import User from 'entities/User';
import ClassAttendance from 'entities/ClassAttendance';

export default {
    classAttendances: async (_, { id }, { auth }): Promise<ClassAttendance[] | Error> => {
        const currentClass = await getRepository(Class).findOne({ id });

        if (!currentClass) {
            return new Error('Grupa nie istnieje.');
        }

        if (auth) {
            const user = await getRepository(User).findOne({ album: auth.album });

            if (user.isAdmin) {
                return currentClass.attendances;
            }
        }

        return new Error('Brak uprawnień.');
    },
    userClassAttendances: async (_, { id }, { auth }): Promise<ClassAttendance[] | Error> => {
        const currentClass = await getRepository(Class).findOne({ id });

        if (!currentClass) {
            return new Error('Grupa nie istnieje.');
        }

        if (auth) {
            const user = await getRepository(User).findOne({ album: auth.album });

            if (user) {
                const attendances = await currentClass.attendances;
                return attendances.filter(attendance => attendance.userId === user.album);
            }
        }

        return new Error('Brak uprawnień.');
    },
};
