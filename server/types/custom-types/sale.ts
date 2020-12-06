import { objectType } from '@nexus/schema';

export const Sale = objectType({
  name: 'Sale',
  definition(t) {
    t.model.id();
    t.model.count();
    t.model.discount();
    t.model.price();
    t.model.name();
    t.model.summary();
    t.model.payType();
    t.model.note();
    t.model.createdAt();
    t.field('store', {
      type: 'Store',
      resolve: (parent, arg, ctx) =>
        ctx.prisma.sale
          .findUnique({
            where: { id: Number(parent.id) },
          })
          .store(),
    });
  },
});
