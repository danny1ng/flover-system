import { intArg, mutationField, stringArg } from '@nexus/schema';

export const addDeduction = mutationField('addDeduction', {
  type: 'Deduction',
  args: {
    storeId: intArg({ nullable: false }),
    message: stringArg({ nullable: false }),
    summary: intArg({ nullable: false }),
  },
  resolve: async (_parent, { storeId, message, summary }, ctx) => {
    return ctx.prisma.deduction.create({
      data: { message, summary, store: { connect: { id: storeId } } },
    });
  },
});
