import * as yup from 'yup';

export const mixed = {
  default: 'является недопустимым',
  required: 'обязательное поле',
  oneOf: 'должно быть одно из следующих значений: ${values}',
  notOneOf: 'не должен быть одним из следующих значений: ${values}',
  notType: ({ type }) => {
    const msg = `должен быть \`${type}\` тип, `;

    return msg;
  },
  defined: 'должно быть определено',
};

export const string = {
  length: 'должно быть ровно  ${length} символов',
  min: 'должно быть не менее ${min} символов',
  max: 'должно быть не больше ${max} символов',
  matches: 'должен соответствовать следующему: "${regex}"',
  email: 'должен быть действительный email',
  url: 'must be a valid URL',
  uuid: 'must be a valid UUID',
  trim: 'должны быть обрезаны строку',
  lowercase: 'must be a lowercase string',
  uppercase: 'must be a upper case string',
};

export const number = {
  min: 'должно быть больше или равно ${min}',
  max: 'должно быть меньше или равно ${max}',
  lessThan: 'должно быть меньше, чем ${less}',
  moreThan: 'должно быть больше, чем ${more}',
  notEqual: 'должно быть не равно ${notEqual}',
  positive: 'должно быть положительное число',
  negative: 'должно быть отрицательное число',
  integer: 'должно быть целым числом',
};

export const date = {
  min: 'field must be later than ${min}',
  max: 'field must be at earlier than ${max}',
};

export const boolean = {};

export const object = {
  noUnknown: 'field has unspecified keys: ${unknown}',
};

export const array = {
  min: 'field must have at least ${min} items',
  max: 'field must have less than or equal to ${max} items',
};

yup.setLocale({
  mixed,
  string,
  number,
  date,
  object,
  array,
  boolean,
});

export { yup };
