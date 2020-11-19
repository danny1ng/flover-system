import { yup } from 'libs';

export const schema = yup.object().shape({
  message: yup.string().required(),
  summary: yup.number().required().positive(),
});
