import { objectType } from '@nexus/schema';

export const Product = objectType({
  name: 'Product',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.price();
    t.model.count();
    t.field('store', {
      type: 'Store',
      resolve: (parent, arg, ctx) =>
        ctx.prisma.store.findUnique({
          where: { id: Number(parent.id) },
        }),
    });
  },
});
