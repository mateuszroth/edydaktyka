import * as jwt from 'jsonwebtoken';
import User from 'entities/User';
import { getRepository } from 'typeorm';

export default async function authenticate(resolve, root, args, context, info) {
    let auth;
    const token: string = (context.request.get('Authorization') || '').replace('Bearer ', '');
    try {
        const decodedPayload = jwt.decode(token);
        const user = await getRepository(User).findOne(decodedPayload.album);
        auth = jwt.verify(token, user.passwordSalt);
    } catch (e) {
        auth = null;
    }
    const result = await resolve(root, args, { ...context, auth }, info);
    return result;
}
