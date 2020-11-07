import { useCallback, useMemo } from 'react';
import { useQueryCache } from 'react-query';

import { useCurrentUser } from 'features/user';

import { checkAuth } from './helpers';
import { AuthParams } from './types';

export const useCheckAuth = (authParams: AuthParams) => {
  const { currentUser, isLoaded } = useCurrentUser();

  return useMemo(
    () => ({
      isPermitted: checkAuth(authParams, currentUser),
      isLoaded,
    }),
    [authParams, currentUser, isLoaded],
  );
};

export const useLogout = () => {
  const queryCache = useQueryCache();
  return useCallback(() => {
    queryCache.clear();
    document.cookie = 'authorization=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    location.href = '/sign-in';
  }, [queryCache]);
};
