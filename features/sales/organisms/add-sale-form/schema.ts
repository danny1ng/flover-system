import { yup } from 'libs';

export const schema = yup
  .object()
  .shape<any>({
    productId: yup.number().required(),
    count: yup.number().required().positive(),
    payType: yup.string().required(),
    discount: yup
      .number()
      .transform(val => {
        return isNaN(val) ? null : val;
      })
      .positive()
      .nullable(),
    note: yup.string(),
  })
  .required();

export type SaleForm = yup.InferType<typeof schema>;
