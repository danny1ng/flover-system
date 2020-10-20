import { objectType } from '@nexus/schema';

export const Sale = objectType({
  name: 'Sale',
  definition(t) {
    t.int('id');
    t.int('count');
    t.int('discount');
    t.int('summary');
    t.int('note');
    t.string('createdAt');
    t.field('product', {
      type: 'Product',
      resolve: (parent, arg, ctx) =>
        ctx.prisma.sale
          .findOne({
            where: { id: Number(parent.id) },
          })
          .product(),
    });
  },
});
