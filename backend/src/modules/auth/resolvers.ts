import encryptPassword from 'modules/auth/utils/encryptPassword';
import User from 'entities/User';
import { getRepository } from 'typeorm';

export default {
    register: (_, { album, firstName, lastName, password, email, photo }) => {
        const { hash, salt } = encryptPassword(password);
        const user = new User();
        user.album = album;
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.password = hash;
        user.passwordSalt = salt;
        if (photo) {
            user.photo = photo;
        }
        return getRepository(User).save(user);
    },
    resetPassword: async (_, { album }) => {
        const user = await getRepository(User).findOne(album);

        if (!user) {
            return new Error('Użytkownik nie istnieje');
        }
    },
    login: async (_, { album, password }) => {
        const user = await getRepository(User).findOne(album);

        if (!user) {
            return new Error('Użytkownik nie istnieje');
        }
    }
};
