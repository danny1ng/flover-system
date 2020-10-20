import React from 'react';
import { Controller, get, useFormContext, ValidationRules } from 'react-hook-form';
import cl from 'clsx';

type GetComponentProps<T> = T extends React.ComponentType<infer P> | React.Component<infer P>
  ? P
  : never;

export type FieldsetProps<T = React.FunctionComponent> = {
  name: string;
  className?: string;
  component: T;
  rules?: ValidationRules;
  controlled?: boolean;
} & GetComponentProps<T>;

export function FormField<T = React.FunctionComponent>(props: FieldsetProps<T>) {
  const {
    name,
    label,
    component: Component,
    className,
    controlled,
    rules,
    ...defaultProps
  } = props as any;
  const { register, errors, control } = useFormContext();

  return (
    <div className={cl('relative pb-2', className)}>
      {controlled ? (
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={renderProps => (
            <Component className="w-full" label={label} {...defaultProps} {...renderProps} />
          )}
        />
      ) : (
        <Component
          className="w-full"
          placeholder={label}
          name={name}
          ref={register}
          {...defaultProps}
        />
      )}

      {errors && (
        <p className="text-auxiliaryRed900 text-xs absolute pl-2">{get(errors, name)?.message}</p>
      )}
    </div>
  );
}
