import { objectType } from '@nexus/schema';

export const Store = objectType({
  name: 'Store',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.balance();
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
