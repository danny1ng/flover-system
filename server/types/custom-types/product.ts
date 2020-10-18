import { objectType } from '@nexus/schema';

export const Product = objectType({
  name: 'Product',
  definition(t) {
    t.int('id');
    t.string('name');
    t.int('price');
    t.int('count');
    t.field('store', {
      type: 'Store',
      resolve: (parent, arg, ctx) =>
        ctx.prisma.store.findOne({
          where: { id: Number(parent.id) },
        }),
    });
  },
});
