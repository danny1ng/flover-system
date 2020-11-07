import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { redirect } from 'libs';
import { NexusGenFieldTypes } from 'nexus-typegen';
import { Button, FormField, TextInput } from 'ui';

import { addProductReq } from 'features/products/api';
import { useStore } from 'features/store';

import { schema } from './schema';

export const AddProductForm = () => {
  const { storeId } = useStore();
  const [addProduct] = useMutation(addProductReq, {
    onSuccess: () => {
      redirect(null, '/products');
    },
  });

  const methods = useForm({ resolver: yupResolver(schema) });

  const onSubmit = useCallback(
    (val: NexusGenFieldTypes['Product']) => {
      addProduct({
        storeId,
        name: val.name,
        count: Number(val.count),
        price: Number(val.price),
      });
    },
    [addProduct, storeId],
  );

  return (
    <div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col mx-auto"
          style={{ maxWidth: 600 }}
        >
          <FormField component={TextInput} className="mb-2" name="name" label="Название" />
          <FormField component={TextInput} className="mb-2" name="price" label="Цена" />
          <FormField
            component={TextInput}
            className="mb-2"
            name="count"
            label="Количество"
            defaultValue={1}
          />
          <Button className="mt-4">Добавить</Button>
        </form>
      </FormProvider>
    </div>
  );
};
