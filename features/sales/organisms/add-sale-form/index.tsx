import { useCallback, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { redirect } from 'libs';
import { NexusGenFieldTypes } from 'nexus-typegen';
import { Button, FormField, Select, TextInput } from 'ui';

import { getProductsQuery } from 'features/products/api';
import { addSaleReq } from 'features/sales/api';
import { useStore } from 'features/store';

import { SaleForm, schema } from './schema';

export const AddSaleForm = () => {
  const methods = useForm({ resolver: yupResolver(schema) });
  const { storeId } = useStore();
  const [addSale] = useMutation(addSaleReq, {
    onSuccess: () => {
      redirect(null, '/sales');
    },
  });
  const { data } = useQuery<{
    products: NexusGenFieldTypes['Query']['products'];
  }>([getProductsQuery, { storeId }]);

  const selectProductOptions = useMemo(
    () =>
      data?.products.map(item => ({
        label: `${item.name} | ${item.count} шт.`,
        value: item.id.toString(),
      })),
    [data?.products],
  );

  const onSubmit = useCallback(
    async (val: SaleForm) => {
      await addSale({
        storeId,
        productId: Number(val.productId),
        count: Number(val.count),
      });
    },
    [addSale, storeId],
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
            label="Продукты"
            items={selectProductOptions}
            controlled
          />
          <FormField component={TextInput} className="mb-2" name="note" label="Заметка" />
          <FormField component={TextInput} className="mb-2" name="discount" label="Сумма скидки" />
          <FormField
            component={TextInput}
            className="mb-2"
            name="count"
            label="Количество"
            defaultValue={1}
          />
          <Button className="mt-4" disabled={methods.formState.isSubmitting}>
            {methods.formState.isSubmitting ? 'Подождите...' : 'Добавить'}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
