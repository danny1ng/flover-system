import { objectType } from '@nexus/schema';

export const Sale = objectType({
  name: 'Sale',
  definition(t) {
    t.model.id();
    t.model.count();
    t.model.discount();
    t.model.summary();
    t.model.payType();
    t.model.note();
    t.model.createdAt();
    t.field('product', {
      type: 'Product',
      resolve: (parent, arg, ctx) =>
        ctx.prisma.sale
          .findOne({
            where: { id: Number(parent.id) },
          })
          .product(),
    });
    t.field('store', {
      type: 'Store',
      resolve: (parent, arg, ctx) =>
        ctx.prisma.sale
          .findOne({
            where: { id: Number(parent.id) },
          })
          .store(),
    });
  },
});
