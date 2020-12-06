import { queryField } from '@nexus/schema';

import { getUserId } from '../../utils';

export const UserQuery = queryField('me', {
  type: 'User',
  nullable: true,
  authorize: (parent, args, ctx) => ctx.auth.isAuthenticatedUser(ctx),
  resolve: (parent, args, ctx) => {
    const userId = getUserId(ctx);

    return ctx.prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });
  },
});
