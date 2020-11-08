import { objectType } from '@nexus/schema';

export const Deduction = objectType({
  name: 'Deduction',
  definition(t) {
    t.model.id();
    t.model.message();
    t.model.summary();
    t.field('store', {
      type: 'Store',
      resolve: (parent, arg, ctx) =>
        ctx.prisma.store.findOne({
          where: { id: Number(parent.id) },
        }),
    });
  },
});
