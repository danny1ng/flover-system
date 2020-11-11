import { useFormContext } from 'react-hook-form';

type RadioProps = {
  name: string;
  label: string;
  value: string;
  className?: string;
};

export const Radio = ({ label, className, ...props }: RadioProps) => {
  const { register } = useFormContext();
  return (
    <label className={`mt-4 flex items-center ${className ?? ''}`}>
      <input
        type="radio"
        className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
        ref={register}
        {...props}
      />
      <span className="ml-3 block text-sm leading-5 font-medium text-gray-700">{label}</span>
    </label>
  );
};
