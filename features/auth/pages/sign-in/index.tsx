import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { NexusGenFieldTypes, NexusGenTypes } from 'nexus-typegen';

import { loginReq } from 'features/auth/api';
import { Head } from 'features/layout';

import { redirect } from 'libs/redirect';

import { withPageAuth } from '../../hocs';
import { AuthWrapper } from '../../templates/auth-wrapper';

const SignIn = () => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm();
  const [login] = useMutation<{ login: NexusGenFieldTypes['Mutation']['login'] }>(loginReq, {
    onSuccess: () => {
      location.href = '/';
    },
  });

  const onSubmit = values => {
    login(values);
  };
  return (
    <>
      <Head title="Войти" />
      <AuthWrapper>
        <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm">
            <div>
              <input
                aria-label="Имя"
                name="name"
                type=""
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                placeholder="Имя"
                ref={register({ required: true })}
              />
            </div>
            <div className="-mt-px">
              <input
                aria-label="Password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                placeholder="Пароль"
                ref={register({ required: true })}
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
              disabled={isSubmitting}
            >
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
              Войти
            </button>
          </div>
        </form>
      </AuthWrapper>
    </>
  );
};

export const SignInPage = withPageAuth({ pageType: 'publicOnly' }, () => '/')(SignIn);
