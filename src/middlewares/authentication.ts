import { Context, Next } from 'koa';

import { User } from '../database/models/User';
import { findUserById } from '../services/common/user/queries';
import ErrorType from '../utils/enums/errorType';
import extendedError from '../utils/errors/extendedError';

// TODO: receive bearer token (internal)
const authentication = async (ctx: Context, next: Next): Promise<void> => {
    const { userid } = ctx.request.headers;

    const userId = Array.isArray(userid) ? userid[0] : userid || '';

    if (!userId) throw extendedError({ error: new Error('Missing Token'), type: ErrorType.UNAUTHORIZED });

    const user: User = await findUserById(userId);

    if (!user) throw extendedError({ error: new Error('User Not Found'), type: ErrorType.UNAUTHORIZED });

    ctx.user = { userId };

    await next();
};

export default authentication;
