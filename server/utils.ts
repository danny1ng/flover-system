import { verify } from 'jsonwebtoken';

export const APP_SECRET = 'appsecret321';

interface Token {
  userId: string;
}

export function getUserId(context: any) {
  const Authorization = context.req.headers.authorization;
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
