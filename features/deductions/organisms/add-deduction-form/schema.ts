import { yup } from 'libs';

export const schema = yup.object().shape<any>({
  message: yup.string().required(),
  summary: yup.number().required().positive(),
});
