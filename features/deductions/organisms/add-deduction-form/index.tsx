import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { redirect } from 'libs';
import { NexusGenFieldTypes } from 'nexus-typegen';
import { Button, FormField, TextInput } from 'ui';

import { useStore } from 'features/store';

import { addDeductionReq } from '../../api';
import { schema } from './schema';

export const AddDeductionForm = () => {
  const { storeId } = useStore();
  const [addDeduction] = useMutation(addDeductionReq, {
    onSuccess: () => {
      redirect(null, '/deductions');
    },
  });

  const methods = useForm({ resolver: yupResolver(schema) });

  const onSubmit = useCallback(
    async (val: NexusGenFieldTypes['Deduction']) => {
      await addDeduction({
        storeId,
        message: val.message.toLowerCase(),
        summary: Number(val.summary),
      });
    },
    [addDeduction, storeId],
  );

  return (
    <div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col mx-auto"
          style={{ maxWidth: 600 }}
        >
          <FormField component={TextInput} className="mb-2" name="message" label="Название" />
          <FormField component={TextInput} className="mb-2" name="summary" label="Сумма" />
          <Button className="mt-4" disabled={methods.formState.isSubmitting}>
            {methods.formState.isSubmitting ? 'Подождите...' : 'Добавить'}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
