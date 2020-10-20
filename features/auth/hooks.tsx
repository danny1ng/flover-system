import { useMemo } from 'react';
import { useMutation, useQueryCache } from 'react-query';

import { useCurrentUser } from 'features/user';

import { redirect } from 'libs/redirect';

import { logout } from './api';
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
  return () => redirect(null, '/sign-in');
  // return useMutation(logout, {
  //   onSuccess: () => {
  //     queryCache.clear();
  //     redirect(null, '/sign-in');
  //   },
  // });
};
