import { rule, shield, allow } from 'graphql-shield';
import { getUserId } from '../utils';

const rules = {
  isAuthenticatedUser: rule()((parent, args, context) => {
    const userId = getUserId(context);
    return Boolean(userId);
  }),
  isAdmin: rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
    return ctx.user.role === 'admin';
  }),

  isEditor: rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
    return ctx.user.role === 'editor';
  }),
};

export const permissions = shield({
  Query: {
    stores: rules.isAdmin,
  },
  Mutation: {
    // login: true,
    //   createDraft: rules.isAuthenticatedUser,
    //   deletePost: rules.isPostOwner,
    //   publish: rules.isPostOwner,
  },
});
