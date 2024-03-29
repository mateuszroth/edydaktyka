import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { ForbiddenError } from 'apollo-server';
import { generate as generatePassword } from 'generate-password';
import { createTransport } from 'nodemailer';
import mailConfig from 'config/mail';
import encryptPassword from 'modules/auth/utils/encryptPassword';
import User from 'entities/User';
import Group from 'entities/Group';

export default {
    currentUser: async (_, { album }, { auth }): Promise<User | Error> => {
        if (!auth || (album && album !== auth.album)) {
            return new Error('Brak uprawnień do danych konta użytkownika');
        }

        const user = await getRepository(User).findOne(album || auth.album);
        user.password = '';
        user.passwordSalt = '';

        return user;
    },
    register: async (_, { album, firstName, lastName, password, email, photo, groupIds }): Promise<string | Error> => {
        const existingUser = await getRepository(User).findOne(album);
        const existingEmailUser = await getRepository(User).findOne({ email: email });
        if (existingUser || existingEmailUser) {
            return new ForbiddenError('Istnieje już użytkownik o podanych danych');
        }

        const { hash, salt } = encryptPassword(password);
        const user = new User();
        user.album = album;
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.password = hash;
        user.passwordSalt = salt;
        user.groups = await getRepository(Group).findByIds(groupIds);
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
    resetPassword: async (_, { email }): Promise<string | Error> => {
        const user = await getRepository(User).findOne({ email: email });
        const resultMessage =
            'Jeśli istnieje użytkownik z podanym adresem email, na jego skrzynkę odbiorcą zostaną wysłane nowe dane logowania.';

        if (!user) {
            return resultMessage;
        }

        const newPassword = generatePassword({
            length: 8,
            numbers: true,
            symbols: false,
            uppercase: false,
            excludeSimilarCharacters: true,
        });

        const { hash, salt } = encryptPassword(newPassword);
        user.password = hash;
        user.passwordSalt = salt;

        await getRepository(User).save(user);

        const transporter = createTransport(mailConfig.smtpConfig);
        const mailOptions = {
            from: mailConfig.from,
            to: email,
            subject: mailConfig.resetPasswordSubject,
            text: mailConfig.resetPasswordText(user.firstName, newPassword),
        };

        await transporter.sendMail(mailOptions);

        return resultMessage;
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
    editAccount: async (
        _,
        { album, firstName, lastName, email, photo, groupIds },
        { auth },
    ): Promise<string | Error> => {
        if (!auth || album !== auth.album) {
            return new Error('Brak uprawnień do danych konta użytkownika');
        }

        const existingUser = await getRepository(User).findOne(album);
        if (!existingUser) {
            return new Error('Nie istnieje użytkownik o podanych danych');
        }

        if (firstName) {
            existingUser.firstName = firstName;
        }
        if (lastName) {
            existingUser.lastName = lastName;
        }
        if (email) {
            existingUser.email = email;
        }
        if (groupIds) {
            existingUser.groups = await getRepository(Group).findByIds(groupIds);
        }
        if (photo) {
            existingUser.photo = photo;
        }

        await getRepository(User).save(existingUser);

        return 'Zmieniono dane użytkownika';
    },
    changePassword: async (_, { album, password }, { auth }): Promise<string | Error> => {
        if (!auth || album !== auth.album) {
            return new Error('Brak uprawnień do danych konta użytkownika');
        }

        const existingUser = await getRepository(User).findOne(album);
        if (!existingUser) {
            return new Error('Nie istnieje użytkownik o podanych danych');
        }

        if (!password) {
            return new Error('Nie podano nowego hasła');
        }

        const { hash, salt } = encryptPassword(password);
        existingUser.password = hash;
        existingUser.passwordSalt = salt;

        await getRepository(User).save(existingUser);

        return jwt.sign(
            {
                album: existingUser.album,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                email: existingUser.email,
            },
            salt,
            { expiresIn: '30d' },
        );
    },
};
