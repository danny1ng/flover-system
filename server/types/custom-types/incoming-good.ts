import { objectType } from '@nexus/schema';

export const IncomingGood = objectType({
  name: 'IncomingGood',
  definition(t) {
    t.model.id();
    t.model.count();
    t.model.name();
    t.model.price();
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
