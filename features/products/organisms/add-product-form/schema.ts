import { yup } from 'libs';

export const schema = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().required().positive(),
  count: yup.number().required().positive(),
});
