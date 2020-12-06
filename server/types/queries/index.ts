import { intArg, queryType } from '@nexus/schema';

import { getUserId } from '../../utils';

export const Query = queryType({
  definition(t) {
    t.field('me', {
      type: 'User',
      nullable: true,
      authorize: (parent, args, ctx) => ctx.auth.isAuthenticatedUser(ctx),
      resolve: (parent, args, ctx) => {
        const userId = getUserId(ctx);

        return ctx.prisma.user.findUnique({
          where: {
            id: Number(userId),
          },
        });
      },
    });

    t.list.field('stores', {
      type: 'Store',
      authorize: (parent, args, ctx) => ctx.auth.isAuthenticatedUser(ctx),
      resolve: (parent, args, ctx) => {
        return ctx.prisma.store.findMany();
      },
    });

    t.field('store', {
      type: 'Store',
      args: {
        storeId: intArg({ nullable: false }),
      },
      authorize: (parent, args, ctx) => ctx.auth.isAuthenticatedUser(ctx),
      resolve: (parent, { storeId }, ctx) => {
        return ctx.prisma.store.findUnique({ where: { id: storeId } });
      },
    });

    t.list.field('deductions', {
      type: 'Deduction',
      args: {
        storeId: intArg({ nullable: false }),
      },
      authorize: (parent, args, ctx) => ctx.auth.isAuthenticatedUser(ctx),
      resolve: (parent, args, ctx) => {
        return ctx.prisma.deduction.findMany({
          where: { storeId: args.storeId },
        });
      },
    });

    t.list.field('products', {
      type: 'Product',
      args: {
        storeId: intArg({ nullable: false }),
      },
      authorize: (parent, args, ctx) => ctx.auth.isAuthenticatedUser(ctx),
      resolve: (parent, args, ctx) => {
        return ctx.prisma.product.findMany({
          where: { storeId: args.storeId },
        });
      },
    });

    t.field('product', {
      type: 'Product',
      args: {
        productId: intArg({ nullable: false }),
      },
      authorize: (parent, args, ctx) => ctx.auth.isAuthenticatedUser(ctx),
      resolve: (parent, args, ctx) => {
        return ctx.prisma.product.findUnique({
          where: { id: args.productId },
        });
      },
    });

    t.list.field('sales', {
      type: 'Sale',
      args: {
        storeId: intArg({ nullable: false }),
      },
      authorize: (parent, args, ctx) => ctx.auth.isAuthenticatedUser(ctx),
      resolve: (parent, { storeId }, ctx) => {
        return ctx.prisma.sale.findMany({ where: { storeId } });
      },
    });

    t.list.field('incomingGoods', {
      type: 'IncomingGood',
      args: {
        storeId: intArg({ nullable: false }),
      },
      authorize: (parent, args, ctx) => ctx.auth.isAuthenticatedUser(ctx),
      resolve: (parent, { storeId }, ctx) => {
        return ctx.prisma.incomingGood.findMany({ where: { storeId } });
      },
    });

    t.list.field('writeOffs', {
      type: 'WriteOff',
      args: {
        storeId: intArg({ nullable: false }),
      },
      authorize: (parent, args, ctx) => ctx.auth.isAuthenticatedUser(ctx),
      resolve: (parent, { storeId }, ctx) => {
        return ctx.prisma.writeOff.findMany({ where: { storeId } });
      },
    });
  },
});
