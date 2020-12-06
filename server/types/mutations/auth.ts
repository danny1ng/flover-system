import { mutationField, stringArg } from '@nexus/schema';
import { compare, hash } from 'bcryptjs';
import cookie from 'cookie';
import { sign } from 'jsonwebtoken';

import { APP_SECRET } from '../../utils';

export const login = mutationField('login', {
  type: 'AuthPayload',
  args: {
    name: stringArg({ nullable: false }),
    password: stringArg({ nullable: false }),
  },
  resolve: async (_parent, { name, password }, ctx) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        name: name.toLowerCase(),
      },
    });
    if (!user) {
      throw new Error('Не правильные данные');
    }
    const passwordValid = await compare(password, user.password);
    if (!passwordValid || !user) {
      throw new Error('Не правильные данные');
    }

    ctx.res.setHeader('Set-Cookie', [
      cookie.serialize('authorization', `Bearer ${sign({ userId: user.id }, APP_SECRET)}`, {
        path: '/',
      }),
    ]);
    return {
      token: sign({ userId: user.id }, APP_SECRET),
      user,
    };
  },
});

export const signUp = mutationField('signup', {
  type: 'AuthPayload',
  args: {
    name: stringArg(),
    password: stringArg({ nullable: false }),
  },
  resolve: async (_parent, { name, password }, ctx) => {
    const hashedPassword = await hash(password, 10);
    const user = await ctx.prisma.user.create({
      data: {
        name,
        password: hashedPassword,
        role: 'SELLER',
      },
    });
    return {
      token: sign({ userId: user.id }, APP_SECRET),
      user,
    };
  },
});
