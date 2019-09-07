import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import encryptPassword from 'modules/auth/utils/encryptPassword';
import User from 'entities/User';

export default {
    register: async (_, { album, firstName, lastName, password, email, photo }) => {
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
        const newUser = await getRepository(User).save(user);

        newUser.password = '';
        newUser.passwordSalt = '';

        return jwt.sign(newUser, salt, { expiresIn: '30d' });
    },
    resetPassword: async (_, { album }) => {
        const user = await getRepository(User).findOne(album);

        if (!user) {
            return new Error('Użytkownik nie istnieje');
        }

        // TODO send email
    },
    login: async (_, { album, password }) => {
        const user = await getRepository(User).findOne(album);

        if (!user) {
            return new Error('Niepoprawne dane logowania');
        }

        const { hash, salt } = encryptPassword(password, user.passwordSalt);

        if (hash != user.password) {
            return new Error('Niepoprawne dane logowania');
        }

        const returnUser = { ...user };

        returnUser.password = '';
        returnUser.passwordSalt = '';

        return jwt.sign(returnUser, salt, { expiresIn: '30d' });
    },
};
