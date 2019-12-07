import { getRepository } from 'typeorm';
import User from 'entities/User';
import { createTransport } from 'nodemailer';
import mailConfig from 'config/mail';

export default {
    sendUserEmail: async (
        _,
        { id, message, title = mailConfig.defaultTitle },
        { auth, user },
    ): Promise<string | Error> => {
        if (!auth || !user.isAdmin) {
            throw new Error('Brak uprawnień');
        }
        if (!id) {
            throw new Error('Brak id');
        }

        const toUser = await getRepository(User).findOne(id);
        const email = toUser && toUser.email;

        if (!email) {
            throw new Error('Brak powiązanego email');
        }

        const transporter = createTransport(mailConfig.smtpConfig);
        const mailOptions = {
            from: mailConfig.from,
            to: email,
            subject: title,
            text: message,
        };

        await transporter.sendMail(mailOptions);

        return `Wysłano wiadomość do ${email}`;
    },
    users: async (_, __, { isAdmin }): Promise<User[] | Error> => {
        if (!isAdmin) {
            throw new Error('Brak uprawnień');
        }
        const users = await getRepository(User).find({ relations: ['groups'] });
        return users;
    },
};
