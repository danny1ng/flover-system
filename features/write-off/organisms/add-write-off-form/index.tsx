import { useCallback, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { redirect } from 'libs';
import { NexusGenArgTypes, NexusGenFieldTypes } from 'nexus-typegen';
import { Button, FormField, Select, TextInput } from 'ui';

import { getProductsQuery } from 'features/products/api';
import { useStore } from 'features/store';

import { addWriteOffReq } from '../../api';

export const AddWriteOffForm = () => {
  const methods = useForm();
  const { storeId } = useStore();
  const [addWriteOff] = useMutation(addWriteOffReq, {
    onSuccess: () => {
      redirect(null, '/write-offs');
    },
  });
  const { data } = useQuery<{ products: NexusGenFieldTypes['Query']['products'] }>([
    getProductsQuery,
    { storeId },
  ]);

  const selectProductOptions = useMemo(
    () =>
      data?.products.map(item => ({
        label: `${item.name} | ${item.count} шт. | ${item.price} р.`,
        value: item.id.toString(),
      })),
    [data?.products],
  );

  const onSubmit = useCallback(
    async (val: NexusGenArgTypes['Mutation']['addWriteOff']) => {
      await addWriteOff({
        storeId,
        productId: Number(val.productId),
        count: Number(val.count),
        note: val.note,
      });
    },
    [addWriteOff, storeId],
  );

  return (
    <div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col mx-auto"
          style={{ maxWidth: 600 }}
        >
          <FormField
            component={Select}
            className="mb-2"
            name="productId"
            label="Продукт"
            items={selectProductOptions}
            controlled
            rules={{ required: { message: 'поле обязательно', value: true } }}
          />

          <FormField
            component={TextInput}
            className="mb-2"
            name="count"
            label="Количество"
            defaultValue={1}
            rules={{
              required: { message: 'поле обязательно', value: true },
              validate: {
                positive: value => parseInt(value, 10) > 0 || 'минимум 1',
              },
            }}
          />
          <FormField
            component={TextInput}
            className="mb-2"
            name="note"
            label="Примечание"
            rules={{
              required: { message: 'поле обязательно', value: true },
            }}
          />
          <Button className="mt-4" disabled={methods.formState.isSubmitting}>
            {methods.formState.isSubmitting ? 'Подождите...' : 'Добавить'}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
