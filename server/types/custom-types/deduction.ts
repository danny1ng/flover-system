import { objectType } from '@nexus/schema';

export const Deduction = objectType({
  name: 'Deduction',
  definition(t) {
    t.int('id');
    t.string('message');
    t.int('summary');
    t.field('store', {
      type: 'Store',
      resolve: (parent, arg, ctx) =>
        ctx.prisma.store.findOne({
          where: { id: Number(parent.id) },
        }),
    });
  },
});
