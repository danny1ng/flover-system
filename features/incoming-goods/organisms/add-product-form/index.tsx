import { useCallback, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { redirect } from 'libs';
import { NexusGenArgTypes, NexusGenFieldTypes } from 'nexus-typegen';
import { Button, FormField, InputSelect, TextInput } from 'ui';

import { addIncomingGoodReq } from 'features/incoming-goods/api';
import { getProductsQuery } from 'features/products/api';
import { useStore } from 'features/store';

export const AddIncomingGoodsForm = () => {
  const methods = useForm();
  const { storeId } = useStore();
  const [addIncomingGood] = useMutation(addIncomingGoodReq, {
    onSuccess: () => {
      redirect(null, '/incoming-goods');
    },
  });
  const { data } = useQuery<{ products: NexusGenFieldTypes['Query']['products'] }>([
    getProductsQuery,
    { storeId },
  ]);

  const selectProductOptions = useMemo(() => data?.products.map(item => item.name), [
    data?.products,
  ]);

  const isNotExist = useMemo(() => {
    return !selectProductOptions?.find(
      item => item.toLowerCase() === methods.watch('name')?.toLowerCase(),
    );
  }, [methods, selectProductOptions]);

  const onSubmit = useCallback(
    async (val: NexusGenArgTypes['Mutation']['addIncomingGood']) => {
      const product = data?.products.find(
        item => item.name.toLowerCase() === val.name.toLowerCase(),
      );
      if (product) {
        await addIncomingGood({
          storeId,
          productId: product.id,
          count: Number(val.count),
          note: val.note,
        });
      } else {
        await addIncomingGood({
          storeId,
          name: val.name.toLowerCase(),
          count: Number(val.count),
          price: Number(val.price),
          note: val.note,
        });
      }
    },
    [addIncomingGood, storeId, data],
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
            component={InputSelect}
            className="mb-2"
            name="name"
            label="Название"
            items={selectProductOptions}
            controlled
            rules={{ required: { message: 'поле обязательно', value: true } }}
          />
          {isNotExist && (
            <FormField
              component={TextInput}
              className="mb-2"
              name="price"
              label="Цена"
              rules={{
                required: { message: 'поле обязательно', value: true },
                validate: {
                  positive: value => parseInt(value, 10) > 0 || 'минимум 1',
                },
              }}
            />
          )}
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
