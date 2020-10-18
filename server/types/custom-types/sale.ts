import { objectType } from '@nexus/schema';

export const Sale = objectType({
  name: 'Sale',
  definition(t) {
    t.int('id');
    t.int('count');
    t.int('discount');
    t.int('summary');
    t.list.field('users', {
      type: 'User',
      resolve: (parent, arg, ctx) =>
        ctx.prisma.store
          .findOne({
            where: { id: Number(parent.id) },
          })
          .users(),
    });
    t.list.field('products', {
      type: 'Product',
      resolve: (parent, arg, ctx) =>
        ctx.prisma.store
          .findOne({
            where: { id: Number(parent.id) },
          })
          .products(),
    });
  },
});
