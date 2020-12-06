import { intArg, queryField } from '@nexus/schema';

export const ProductsQuery = queryField('products', {
  type: 'Product',
  args: {
    storeId: intArg({ nullable: false }),
  },
  authorize: (parent, args, ctx) => ctx.auth.isAuthenticatedUser(ctx),
  resolve: (parent, args, ctx) => {
    return ctx.prisma.product.findMany({
      where: { storeId: args.storeId },
    });
  },
});

export const ProductQuery = queryField('product', {
  type: 'Product',
  list: true,
  args: {
    productId: intArg({ nullable: false }),
  },
  authorize: (parent, args, ctx) => ctx.auth.isAuthenticatedUser(ctx),
  resolve: (parent, args, ctx) => {
    return ctx.prisma.product.findUnique({
      where: { id: args.productId },
    });
  },
});
