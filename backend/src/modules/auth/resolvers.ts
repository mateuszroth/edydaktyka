import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import encryptPassword from 'modules/auth/utils/encryptPassword';
import User from 'entities/User';

export default {
    currentUser: async (_, { album }, { auth }): Promise<User | Error> => {
        if (!auth || album !== auth.album) {
            return new Error('Brak uprawnień do danych konta użytkownika');
        }

        const user = await getRepository(User).findOne(album);
        user.password = '';
        user.passwordSalt = '';

        return user;
    },
    register: async (_, { album, firstName, lastName, password, email, photo }): Promise<string> => {
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

        return jwt.sign(
            {
                album: newUser.album,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
            },
            salt,
            { expiresIn: '30d' },
        );
    },
    resetPassword: async (_, { album }): Promise<string | Error> => {
        const user = await getRepository(User).findOne(album);

        if (!user) {
            return new Error('Użytkownik nie istnieje');
        }

        // TODO send email
    },
    login: async (_, { album, password }): Promise<string | Error> => {
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
