import { getUserId } from '../utils';

export const rules = {
  isAuthenticatedUser: context => {
    const userId = getUserId(context);
    // return Boolean(userId);
    return true;
  },
  // isAdmin: rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
  //   return ctx.user.role === 'admin';
  // }),
  // isEditor: rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
  //   return ctx.user.role === 'editor';
  // }),
};
