import { Controller, get, useFormContext, ValidationRules } from 'react-hook-form';
import cl from 'clsx';

type GetComponentProps<T> = T extends React.ComponentType<infer P> | React.Component<infer P>
  ? P
  : never;

export type FieldsetProps<T = React.FunctionComponent> = {
  name: string;
  label: string;
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
      <label className="block text-sm font-medium leading-5 text-gray-700">
        <span className="mb-2 block">{label}</span>
        <div>
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
            <Component className="w-full" name={name} ref={register} {...defaultProps} />
          )}
        </div>
      </label>

      {errors && <p className="text-red-600 text-xs absolute">{get(errors, name)?.message}</p>}
    </div>
  );
}
