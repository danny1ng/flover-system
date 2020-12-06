import { intArg, mutationField, stringArg } from '@nexus/schema';

export const addProduct = mutationField('addProduct', {
  type: 'Product',
  args: {
    storeId: intArg({ nullable: false }),
    name: stringArg({ nullable: false }),
    price: intArg({ nullable: false }),
    count: intArg(),
  },
  resolve: async (_parent, { storeId, name, ...product }, ctx) => {
    return ctx.prisma.product.create({
      data: { ...product, name: name.toLowerCase(), store: { connect: { id: storeId } } },
    });
  },
});

export const deleteProduct = mutationField('deleteProduct', {
  type: 'Product',
  args: {
    productId: intArg({ nullable: false }),
  },
  resolve: async (_parent, { productId }, ctx) => {
    return ctx.prisma.product.delete({ where: { id: productId } });
  },
});

export const editProduct = mutationField('editProduct', {
  type: 'Product',
  args: {
    productId: intArg({ nullable: false }),
    name: stringArg(),
    price: intArg(),
    count: intArg(),
  },
  resolve: async (_parent, { productId, name, ...product }, ctx) => {
    return ctx.prisma.product.update({
      where: { id: productId },
      data: { ...product, name: name.toLowerCase() },
    });
  },
});
