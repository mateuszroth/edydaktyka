import * as jwt from 'jsonwebtoken';
import User from 'entities/User';
import { getRepository } from 'typeorm';

export default async function authenticate(resolve, root, args, context, info) {
    let auth;
    try {
        const user = await getRepository(User).findOne(args.album);
        auth = jwt.verify(context.request.get('Authorization'), user.passwordSalt);
    } catch (e) {
        auth = null;
    }
    const result = await resolve(root, args, { ...context, auth }, info);
    return result;
}
