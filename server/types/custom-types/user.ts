import { objectType } from '@nexus/schema';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.role();
    t.list.field('stores', {
      type: 'Store',
      resolve: (parent, arg, ctx) =>
        ctx.prisma.user
          .findUnique({
            where: { id: Number(parent.id) },
          })
          .stores(),
    });
  },
});
