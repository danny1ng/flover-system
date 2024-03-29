import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { redirect } from 'libs';
import { NexusGenFieldTypes } from 'nexus-typegen';
import { Button, FormField, TextInput } from 'ui';

import { editProductReq } from 'features/products/api';

import { schema } from './schema';

export const EditProductForm = ({
  productData,
}: {
  productData: NexusGenFieldTypes['Query']['product'];
}) => {
  const [editProduct] = useMutation(editProductReq, {
    onSuccess: () => {
      redirect(null, '/products');
    },
  });

  const methods = useForm({ resolver: yupResolver(schema), defaultValues: productData });

  const onSubmit = useCallback(
    async (val: NexusGenFieldTypes['Product']) => {
      await editProduct({
        productId: productData.id,
        name: val.name,
        count: Number(val.count),
        price: Number(val.price),
      });
    },
    [editProduct, productData.id],
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
          <Button className="mt-4" disabled={methods.formState.isSubmitting}>
            {methods.formState.isSubmitting ? 'Подождите...' : 'Редактировать'}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
