import { intArg, mutationType, stringArg } from '@nexus/schema';
import { compare, hash } from 'bcryptjs';
import cookie from 'cookie';
import { sign } from 'jsonwebtoken';

import { APP_SECRET, getUserId } from '../../utils';

export const Mutation = mutationType({
  definition(t) {
    t.field('signup', {
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
    t.field('login', {
      type: 'AuthPayload',
      args: {
        name: stringArg({ nullable: false }),
        password: stringArg({ nullable: false }),
      },
      resolve: async (_parent, { name, password }, ctx) => {
        const user = await ctx.prisma.user.findOne({
          where: {
            name,
          },
        });
        if (!user) {
          throw new Error(`No user found for email: ${name}`);
        }
        const passwordValid = await compare(password, user.password);
        if (!passwordValid) {
          throw new Error('Invalid password');
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
    t.field('createProduct', {
      type: 'Product',
      args: {
        storeId: intArg({ nullable: false }),
        name: stringArg({ nullable: false }),
        price: intArg({ nullable: false }),
        count: intArg(),
      },
      resolve: async (_parent, { storeId, ...product }, ctx) => {
        return ctx.prisma.product.create({
          data: { ...product, store: { connect: { id: storeId } } },
        });
      },
    });
  },
});
