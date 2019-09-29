import { getRepository } from 'typeorm';
import Group, { GroupType } from 'entities/Group';
import User from 'entities/User';
import ClassAttendance from 'entities/ClassAttendance';

export default {
    groups: async (_, { isActive = true }, { auth }): Promise<Group[]> => {
        const groups = await getRepository(Group).find({ isActive });

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
    assignUserToGroup: async (_, { id }, { auth }): Promise<string | Error> => {
        if (!auth) {
            return new Error('Brak uprawnień.');
        }

        const group = await getRepository(Group).findOne({ id: id });

        if (!group) {
            return new Error('Wybrana grupa nie istnieje.');
        }

        const user = await getRepository(User).findOne({ album: auth.album });

        if (!user) {
            return new Error('Brak uprawnień.');
        }

        user.groups = user.groups || [];
        user.groups.push(group);

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

        const newGroup = new Group();
        newGroup.modeOfStudy = group.modeOfStudy;
        newGroup.fieldOfStudy = group.fieldOfStudy;
        newGroup.groupNumber = group.groupNumber;
        newGroup.groupHalf = group.groupHalf;
        newGroup.courseName = group.courseName;
        if (group.link) {
            newGroup.link = group.link;
        }
        if (group.description) {
            newGroup.description = group.description;
        }

        await getRepository(Group).save(newGroup);

        return 'Dodano grupę';
    },
};
