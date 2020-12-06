import { intArg, mutationField, stringArg } from '@nexus/schema';

export const Mutation = mutationField('addIncomingGood', {
  type: 'IncomingGood',
  args: {
    storeId: intArg({ nullable: false }),
    productId: intArg(),
    count: intArg({ nullable: false }),
    name: stringArg({ required: false }),
    price: intArg({ required: false }),
  },
  resolve: async (_parent, { storeId, productId, count, price, name }, ctx) => {
    if (productId) {
      const product = await ctx.prisma.product.findUnique({ where: { id: productId } });

      const updatedProduct = ctx.prisma.product.update({
        where: { id: productId },
        data: { count: product.count + count },
      });
      const addIncomingGood = ctx.prisma.incomingGood.create({
        data: {
          store: { connect: { id: storeId } },
          count,
          name: product.name,
          price: product.price,
        },
      });
      await ctx.prisma.$transaction([addIncomingGood, updatedProduct]);

      return addIncomingGood;
    } else {
      const createProduct = ctx.prisma.product.create({
        data: { count, name, price, store: { connect: { id: storeId } } },
      });

      const addIncomingGood = ctx.prisma.incomingGood.create({
        data: {
          store: { connect: { id: storeId } },
          count,
          name,
          price,
        },
      });
      await ctx.prisma.$transaction([addIncomingGood, createProduct]);
      return addIncomingGood;
    }
  },
});
