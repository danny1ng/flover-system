import { arg, intArg, mutationField, stringArg } from '@nexus/schema';

export const addSale = mutationField('addSale', {
  type: 'Sale',
  args: {
    storeId: intArg({ nullable: false }),
    productId: intArg({ nullable: false }),
    count: intArg({ nullable: false }),
    discount: intArg(),
    note: stringArg(),
    payType: arg({ type: 'PayType' }),
  },
  resolve: async (_parent, { storeId, productId, discount, count, ...sale }, ctx) => {
    const product = await ctx.prisma.product.findUnique({ where: { id: productId } });
    const store = await ctx.prisma.store.findUnique({ where: { id: storeId } });
    const summarySale = product.price * count - (discount || 0);

    const createdSale = ctx.prisma.sale.create({
      data: {
        ...sale,
        name: product.name,
        price: product.price,
        count,
        discount,
        summary: product.price * count - (discount || 0),
        store: {
          connect: { id: storeId },
        },
      },
    });

    const updatedProduct = ctx.prisma.product.update({
      where: { id: productId },
      data: { count: product.count - count },
    });

    const updateStoreBalance = ctx.prisma.store.update({
      where: { id: storeId },
      data: { balance: store.balance + summarySale },
    });

    await ctx.prisma.$transaction([createdSale, updatedProduct, updateStoreBalance]);

    return createdSale;
  },
});
