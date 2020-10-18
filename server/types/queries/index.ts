import { intArg, queryType, stringArg } from '@nexus/schema';
import { getUserId } from '../../utils';

export const Query = queryType({
  definition(t) {
    t.field('me', {
      type: 'User',
      nullable: true,
      resolve: (parent, args, ctx) => {
        const userId = getUserId(ctx);
        return ctx.prisma.user.findOne({
          where: {
            id: Number(userId),
          },
        });
      },
    });

    t.list.field('stores', {
      type: 'Store',
      resolve: (parent, args, ctx) => {
        return ctx.prisma.store.findMany();
      },
    });

    t.list.field('users', {
      type: 'User',
      resolve: (parent, args, ctx) => {
        return ctx.prisma.user.findMany();
      },
    });

    t.list.field('products', {
      type: 'Product',
      args: {
        storeId: intArg({ nullable: false }),
      },
      resolve: (parent, args, ctx) => {
        return ctx.prisma.product.findMany({
          where: { storeId: Number(args.storeId) },
        });
      },
    });
  },
});
