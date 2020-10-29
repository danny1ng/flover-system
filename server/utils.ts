import { verify } from 'jsonwebtoken';

import { Context } from './context';

export const APP_SECRET = 'appsecret321';

interface Token {
  userId: string;
}

export function getUserId(context: Context) {
  const Authorization = context.req.cookies.authorization;
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const verifiedToken = verify(token, APP_SECRET) as Token;
    return verifiedToken && verifiedToken.userId;
  }
}

// function getUser(ctx: any) {
//   const auth = ctx.request.get('Authorization');
//   if (users[auth]) {
//     return users[auth];
//   } else {
//     return null;
//   }
// }
