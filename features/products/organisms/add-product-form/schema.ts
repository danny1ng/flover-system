import { yup } from 'libs';

export const schema = yup.object().shape<any>({
  name: yup.string().required(),
  price: yup.number().required().positive(),
  count: yup.number().required().positive(),
});
