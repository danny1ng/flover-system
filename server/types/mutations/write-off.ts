import { intArg, mutationField, nonNull, stringArg } from '@nexus/schema';

export const addWiteOff = mutationField('addWriteOff', {
  type: 'WriteOff',
  args: {
    storeId: nonNull(intArg()),
    productId: nonNull(intArg()),
    count: intArg({ nullable: false }),
    note: stringArg({ required: false }),
  },
  resolve: async (_parent, { storeId, productId, count, note }, ctx) => {
    const product = await ctx.prisma.product.findUnique({ where: { id: productId } });

    const updatedProduct = ctx.prisma.product.update({
      where: { id: productId },
      data: { count: product.count - count },
    });
    const addIncomingGood = ctx.prisma.writeOff.create({
      data: {
        store: { connect: { id: storeId } },
        count,
        name: product.name,
        note,
      },
    });
    await ctx.prisma.$transaction([addIncomingGood, updatedProduct]);

    return addIncomingGood;
  },
});
