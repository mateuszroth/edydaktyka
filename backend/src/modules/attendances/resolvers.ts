import Class from 'entities/Class';
import { getRepository } from 'typeorm';
import User from 'entities/User';
import ClassAttendance from 'entities/ClassAttendance';
import { storeUpload } from 'modules/upload';

async function addAttendance(attendance): Promise<ClassAttendance> {
    const newAttendance = new ClassAttendance();
    newAttendance.groupId = attendance.groupId;
    newAttendance.classId = attendance.classId;
    newAttendance.userId = attendance.userId;
    if (attendance.isPresent !== null && attendance.isPresent !== undefined) {
        newAttendance.isPresent = attendance.isPresent;
    }
    if (attendance.reportFile) {
        newAttendance.reportFile = attendance.reportFile;
    }
    if (attendance.reportGrade) {
        newAttendance.reportGrade = attendance.reportGrade;
    }
    if (attendance.reportAddedOn) {
        newAttendance.reportAddedOn = attendance.reportAddedOn;
    }

    return await getRepository(ClassAttendance).save(newAttendance);
}

async function updateAttendance(attendance): Promise<ClassAttendance> {
    const id = {
        id: Number(attendance.id),
        classId: Number(attendance.classId),
        userId: Number(attendance.userId),
        groupId: Number(attendance.groupId),
    };
    const editedAttendance = await getRepository(ClassAttendance).findOne(id);

    if (
        attendance.reportGrade !== undefined &&
        attendance.reportGrade !== null &&
        attendance.reportGrade !== editedAttendance.reportGrade
    ) {
        editedAttendance.reportGrade = attendance.reportGrade;
    }

    if (
        attendance.reportFile !== undefined &&
        attendance.reportFile !== null &&
        attendance.reportFile !== editedAttendance.reportFile
    ) {
        editedAttendance.reportFile = attendance.reportFile;
        editedAttendance.reportFileId = attendance.reportFileId;
        editedAttendance.reportFileMimeType = attendance.reportFileMimeType;
        editedAttendance.reportFileEncoding = attendance.reportFileEncoding;
        editedAttendance.reportAddedOn = new Date(Date.now());
    }

    if (
        attendance.isPresent !== undefined &&
        attendance.isPresent !== null &&
        attendance.isPresent !== editedAttendance.isPresent
    ) {
        editedAttendance.isPresent = attendance.isPresent;
    }

    return await getRepository(ClassAttendance).save(editedAttendance);
}

export default {
    putAttendance: async (_, { attendance }, { auth }): Promise<ClassAttendance | Error> => {
        if (!auth) {
            return new Error('Brak uprawnień');
        }

        const user = await getRepository(User).findOne({ album: auth.album });

        if (!user.isAdmin) {
            return new Error('Brak uprawnień');
        }

        if (!attendance.id) {
            const saved = await addAttendance(attendance);
            return saved;
        } else {
            const saved = await updateAttendance(attendance);
            return saved;
        }
    },
    classAttendances: async (_, { id }, { auth }): Promise<ClassAttendance[] | Error> => {
        const currentClass = await getRepository(Class).findOne({ id });

        if (!currentClass) {
            return new Error('Grupa nie istnieje.');
        }

        if (auth) {
            const user = await getRepository(User).findOne({ album: auth.album });

            if (user.isAdmin) {
                const attendances = await currentClass.attendances;
                return attendances;
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
    uploadReport: async (_, { file, attendance }, { auth, user }): Promise<ClassAttendance | Error> => {
        if (!auth) {
            return new Error('Brak uprawnień');
        }

        if (!user.isAdmin && attendance.userId !== user.album) {
            return new Error('Brak uprawnień');
        }

        const { createReadStream, filename, mimetype, encoding } = await file;
        const stream = createReadStream();
        const { id, path } = await storeUpload({ stream, filename });

        const updatedAttendance = {
            ...attendance,
            reportFile: path,
            reportFileId: id,
            reportFileMimeType: mimetype,
            reportFileEncoding: encoding,
        };

        const action = attendance.id ? updateAttendance : addAttendance;
        const updated = await action(updatedAttendance);
        return updated;
    },
    removeReport: async (_, { attendance }, { auth, user }): Promise<ClassAttendance | Error> => {
        if (!auth) {
            return new Error('Brak uprawnień');
        }

        if (!user.isAdmin && attendance.userId !== user.album) {
            return new Error('Brak uprawnień');
        }

        const updatedAttendance = {
            ...attendance,
            reportFile: '',
            reportFileId: null,
            reportFileMimeType: null,
            reportFileEncoding: null,
        };

        const updated = await updateAttendance(updatedAttendance);
        return updated;
    },
};
