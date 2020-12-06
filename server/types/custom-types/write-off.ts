import { objectType } from '@nexus/schema';

export const WriteOff = objectType({
  name: 'WriteOff',
  definition(t) {
    t.model.id();
    t.model.count();
    t.model.name();
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
