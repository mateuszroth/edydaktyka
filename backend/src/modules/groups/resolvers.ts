import { getRepository } from 'typeorm';
import Group, { GroupType } from 'entities/Group';
import User from 'entities/User';
import ClassAttendance from 'entities/ClassAttendance';

const addGroup = async (group: GroupType): Promise<void> => {
    const newGroup = new Group();
    newGroup.modeOfStudy = group.modeOfStudy;
    newGroup.fieldOfStudy = group.fieldOfStudy;
    newGroup.groupNumber = group.groupNumber;
    newGroup.groupHalf = group.groupHalf;
    newGroup.courseName = group.courseName;
    newGroup.isActive = group.isActive;
    if (group.link) {
        newGroup.link = group.link;
    }
    if (group.description) {
        newGroup.description = group.description;
    }

    await getRepository(Group).save(newGroup);
};

const editGroup = async (group: GroupType): Promise<void> => {
    const editedGroup = await getRepository(Group).findOne(group.id);
    if (group.modeOfStudy !== null && editedGroup.modeOfStudy !== group.modeOfStudy) {
        editedGroup.modeOfStudy = group.modeOfStudy;
    }
    if (group.fieldOfStudy !== null && editedGroup.fieldOfStudy !== group.fieldOfStudy) {
        editedGroup.fieldOfStudy = group.fieldOfStudy;
    }
    if (group.groupNumber !== null && editedGroup.groupNumber !== group.groupNumber) {
        editedGroup.groupNumber = group.groupNumber;
    }
    if (group.groupHalf !== null && editedGroup.groupHalf !== group.groupHalf) {
        editedGroup.groupHalf = group.groupHalf;
    }
    if (group.courseName !== null && editedGroup.courseName !== group.courseName) {
        editedGroup.courseName = group.courseName;
    }
    if (group.isActive !== null && editedGroup.isActive !== group.isActive) {
        editedGroup.isActive = group.isActive;
    }
    if (group.link !== null && editedGroup.link !== group.link) {
        editedGroup.link = group.link;
    }
    if (group.description !== null && editedGroup.description !== group.description) {
        editedGroup.description = group.description;
    }
    await getRepository(Group).save(editedGroup);
};

export default {
    group: async (_, { id }, { auth, user }): Promise<Group | Error> => {
        if (!auth) {
            return new Error('Brak uprawnień.');
        }

        const group = await getRepository(Group).findOne(id);

        if (!group) {
            return new Error('Grupa nie istnieje.');
        }

        if (!user.isAdmin) {
            group.users = Promise.resolve([]);
            const attendances = await group.attendances;
            group.attendances = Promise.resolve(attendances.filter(a => a.userId === Number(user.album)));
            const grades = await group.grades;
            group.grades = Promise.resolve(grades.filter(a => a.userId === Number(user.album)));
        }

        return group;
    },
    groups: async (_, { isActive = true }, { auth }): Promise<Group[]> => {
        const groups = await getRepository(Group).find({ isActive: isActive });

        if (auth) {
            const user = await getRepository(User).findOne({ album: auth.album });

            if (user.isAdmin) {
                return groups;
            }
        }

        groups.forEach(async group => {
            group.users = Promise.resolve([]);
        });

        return groups;
    },
    groupAttendances: async (_, { id }, { auth }): Promise<ClassAttendance[] | Error> => {
        const group = await getRepository(Group).findOne({ id });

        if (!group) {
            return new Error('Grupa nie istnieje.');
        }

        if (auth) {
            const user = await getRepository(User).findOne({ album: auth.album });

            if (user.isAdmin) {
                return group.attendances;
            }
        }

        return new Error('Brak uprawnień.');
    },
    assignUserToGroups: async (_, { groupIds }, { auth }): Promise<string | Error> => {
        if (!auth) {
            return new Error('Brak uprawnień.');
        }

        const groups = await getRepository(Group).findByIds(groupIds);

        if (!groups) {
            return new Error('Wybrana grupa nie istnieje.');
        }

        const user = await getRepository(User).findOne({ album: auth.album });

        if (!user) {
            return new Error('Brak uprawnień.');
        }

        user.groups = user.groups || [];
        groups.forEach(group => {
            user.groups.push(group);
        });

        await getRepository(User).save(user);

        return 'Zapisano przydział do grupy';
    },
    addGroup: async (_, { group }: { group: GroupType }, { auth }): Promise<string | Error> => {
        if (!group) {
            return new Error('Brak danych');
        }

        if (!auth) {
            return new Error('Brak uprawnień');
        }

        const user = await getRepository(User).findOne({ album: auth.album });

        if (!user.isAdmin) {
            return new Error('Brak uprawnień');
        }

        await addGroup(group);
        return 'Dodano grupę';
    },
    putGroup: async (_, { group }: { group: GroupType }, { auth }): Promise<string | Error> => {
        if (!group) {
            return new Error('Brak danych');
        }

        if (!auth) {
            return new Error('Brak uprawnień');
        }

        const user = await getRepository(User).findOne({ album: auth.album });

        if (!user.isAdmin) {
            return new Error('Brak uprawnień');
        }

        if (group.id) {
            await editGroup(group);
            return 'Zedytowano grupę';
        } else {
            await addGroup(group);
            return 'Dodano grupę';
        }
    },
};
