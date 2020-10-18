import { objectType } from '@nexus/schema';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.float('id');
    t.string('name');
    t.list.field('stores', {
      type: 'Store',
      resolve: (parent, arg, ctx) =>
        ctx.prisma.user
          .findOne({
            where: { id: Number(parent.id) },
          })
          .stores(),
    });
  },
});
