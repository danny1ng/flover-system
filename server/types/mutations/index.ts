import { enumType, intArg, mutationType, stringArg } from '@nexus/schema';
import { compare, hash } from 'bcryptjs';
import cookie from 'cookie';
import { sign } from 'jsonwebtoken';

import { APP_SECRET } from '../../utils';

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
    t.field('addProduct', {
      type: 'Product',
      args: {
        storeId: intArg({ nullable: false }),
        name: stringArg({ nullable: false }),
        price: intArg({ nullable: false }),
        count: intArg(),
      },
      resolve: async (_parent, { storeId, name, ...product }, ctx) => {
        return ctx.prisma.product.create({
          data: { ...product, name: name.toLowerCase(), store: { connect: { id: storeId } } },
        });
      },
    });
    t.field('deleteProduct', {
      type: 'Product',
      args: {
        productId: intArg({ nullable: false }),
      },
      resolve: async (_parent, { productId }, ctx) => {
        return ctx.prisma.product.delete({ where: { id: productId } });
      },
    });
    t.field('editProduct', {
      type: 'Product',
      args: {
        productId: intArg({ nullable: false }),
        name: stringArg(),
        price: intArg(),
        count: intArg(),
      },
      resolve: async (_parent, { productId, name, ...product }, ctx) => {
        return ctx.prisma.product.update({
          where: { id: productId },
          data: { ...product, name: name.toLowerCase() },
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
        payType: enumType({ name: 'payType', members: ['WIRE', 'CASH'] }),
      },
      resolve: async (_parent, { storeId, productId, discount, count, ...sale }, ctx) => {
        const product = await ctx.prisma.product.findOne({ where: { id: productId } });

        const createdSale = ctx.prisma.sale.create({
          data: {
            ...sale,
            name: product.name,
            count,
            discount,
            summary: product.price * count - (discount || 0),
            store: {
              connect: { id: storeId },
            },
          },
        });

        const updatedProduct = ctx.prisma.product.update({
          where: { id: productId },
          data: { count: product.count - count },
        });

        await ctx.prisma.$transaction([createdSale, updatedProduct]);

        return createdSale;
      },
    });
    t.field('addIncomingGood', {
      type: 'IncomingGood',
      args: {
        storeId: intArg({ nullable: false }),
        productId: intArg(),
        count: intArg({ nullable: false }),
        name: stringArg({ required: false }),
        price: intArg({ required: false }),
      },
      resolve: async (_parent, { storeId, productId, count, price, name }, ctx) => {
        if (productId) {
          const product = await ctx.prisma.product.findOne({ where: { id: productId } });

          const updatedProduct = ctx.prisma.product.update({
            where: { id: productId },
            data: { count: product.count + count },
          });
          const addIncomingGood = ctx.prisma.incomingGood.create({
            data: {
              store: { connect: { id: storeId } },
              count,
              name: product.name,
              price: product.price,
            },
          });
          await ctx.prisma.$transaction([addIncomingGood, updatedProduct]);

          return addIncomingGood;
        } else {
          const createProduct = ctx.prisma.product.create({
            data: { count, name, price, store: { connect: { id: storeId } } },
          });

          const addIncomingGood = ctx.prisma.incomingGood.create({
            data: {
              store: { connect: { id: storeId } },
              count,
              name,
              price,
            },
          });
          await ctx.prisma.$transaction([addIncomingGood, createProduct]);
          return addIncomingGood;
        }
      },
    });
  },
});
