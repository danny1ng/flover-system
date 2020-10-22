import { useMemo } from 'react';
import { useQuery } from 'react-query';
import constate from 'constate';

import { getCurrentUserQuery } from './api';

const useCurrentUserImpl = () => {
  const { data, isSuccess, isError, isFetched } = useQuery<APIResponse<CurrentUser>>(
    getCurrentUserQuery,
    {
      cacheTime: Infinity,
      // disable default redirect
      onError: () => null,
      retry: 1,
    },
  );
  const isLoaded = isFetched || isSuccess || isError;

  return useMemo(() => ({ currentUser: data?.payload, isLoaded }), [data?.payload, isLoaded]);
};

export const [CurrentUserProvider, useCurrentUser] = constate(useCurrentUserImpl);
