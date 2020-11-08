import { intArg, mutationField, mutationType, stringArg } from '@nexus/schema';
import { PrismaClient } from '@prisma/client';
import { compare, hash } from 'bcryptjs';
import cookie from 'cookie';
import { sign } from 'jsonwebtoken';

import { APP_SECRET, getUserId } from '../../utils';

// const A = mutationField({})

export const Mutation = mutationType({
  definition(t) {
    // t.field('signup', {
    //   type: 'AuthPayload',
    //   args: {
    //     name: stringArg(),
    //     password: stringArg({ nullable: false }),
    //   },
    //   resolve: async (_parent, { name, password }, ctx) => {
    //     const hashedPassword = await hash(password, 10);
    //     const user = await ctx.prisma.user.create({
    //       data: {
    //         name,
    //         password: hashedPassword,
    //         role: 'SELLER',
    //       },
    //     });
    //     return {
    //       token: sign({ userId: user.id }, APP_SECRET),
    //       user,
    //     };
    //   },
    // });
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
    t.field('addProduct', {
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
    t.field('addSale', {
      type: 'Sale',
      args: {
        storeId: intArg({ nullable: false }),
        productId: intArg({ nullable: false }),
        count: intArg({ nullable: false }),
        discount: intArg(),
        note: stringArg(),
      },
      resolve: async (_parent, { storeId, productId, discount, count, ...sale }, ctx) => {
        const product = await ctx.prisma.product.findOne({ where: { id: productId } });

        const createdSale = ctx.prisma.sale.create({
          data: {
            ...sale,
            count,
            discount,
            summary: product.price * count - (discount || 0),
            product: {
              connect: { id: productId },
            },
            store: {
              connect: { id: storeId },
            },
          },
        }) as any;

        const updatedProduct = ctx.prisma.product.update({
          where: { id: productId },
          data: { count: product.count - count },
        });

        await ctx.prisma.$transaction([createdSale, updatedProduct]);

        return createdSale;
      },
    });
  },
});
