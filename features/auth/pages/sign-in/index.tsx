import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { getGlobalError } from 'libs';
import { NexusGenFieldTypes } from 'nexus-typegen';
import { Button, TextInput } from 'ui';

import { loginReq } from 'features/auth/api';
import { Head } from 'features/layout';

import { withPageAuth } from '../../hocs';
import { AuthWrapper } from '../../templates/auth-wrapper';

const SignIn = () => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm();
  const [login, { error }] = useMutation<{ login: NexusGenFieldTypes['Mutation']['login'] }>(
    loginReq,
    {
      onSuccess: () => {
        location.href = '/';
      },
    },
  );

  const onSubmit = async values => {
    await login(values);
  };

  return (
    <>
      <Head title="Войти" />
      <AuthWrapper>
        <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm">
            <div>
              <TextInput
                aria-label="Имя"
                name="name"
                type=""
                required
                placeholder="Имя"
                ref={register({ required: true })}
                className="rounded-b-none"
              />
            </div>
            <div className="-mt-px">
              <TextInput
                aria-label="Password"
                name="password"
                type="password"
                required
                className="rounded-t-none"
                placeholder="Пароль"
                ref={register({ required: true })}
              />
            </div>
          </div>
          <div className="text-red-600 mt-2">{getGlobalError(error)}</div>
          <div className="mt-6">
            <Button type="submit" className="w-full group" disabled={isSubmitting}>
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              {isSubmitting ? 'Подождите...' : 'Войти'}
            </Button>
          </div>
        </form>
      </AuthWrapper>
    </>
  );
};

export const SignInPage = withPageAuth({ pageType: 'publicOnly' }, () => '/')(SignIn);
