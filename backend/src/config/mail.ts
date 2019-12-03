import * as dotenv from 'dotenv';
dotenv.config();

const smtpConfig = {
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10),
    secure: process.env.EMAIL_SECURE === 'true', // use SSL
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
};
const from = process.env.EMAIL_USER;

const SYSTEM_NAME = process.env.SYSTEM_NAME;

const defaultTitle = `Wiadomość z systemu ${SYSTEM_NAME}`;

const resetPasswordSubject = `Nowe hasło | ${SYSTEM_NAME}`;
const resetPasswordText = (name, password): string => `
    Witaj ${name}!
    Właśnie zmieniono hasło Twojego konta w systemie ${SYSTEM_NAME}.
    Twoje nowe hasło logowania składające się z ${password.length} znaków to:

    ${password}

    Jeśli nie Ty zmieniałeś hasło, koniecznie skontaktuj się z administratorem systemu.
    Pozdrawiamy!
`;
const resetPasswordHtml = (name, password): string => resetPasswordText(name, password);

export default {
    smtpConfig,
    from,
    resetPasswordSubject,
    resetPasswordText,
    resetPasswordHtml,
    defaultTitle,
};
