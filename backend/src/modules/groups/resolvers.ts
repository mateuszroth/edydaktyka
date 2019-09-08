import { getRepository } from 'typeorm';
import Group from 'entities/Group';
import User from 'entities/User';

export default {
    groups: async (_, { isActive = true }) => {
        const groups = await getRepository(Group).find({ isActive });

        return groups;
    },
    assignUserToGroup: async (_, { id }, { auth }) => {
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
};
