import { objectType } from '@nexus/schema';

export const Store = objectType({
  name: 'Store',
  definition(t) {
    t.int('id');
    t.string('name');
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
