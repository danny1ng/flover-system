import { useCallback, useEffect, useMemo, useState } from 'react';
import { useEvent, useLocalStorage } from 'react-use';
import constate from 'constate';

import { useCurrentUser } from 'features/user';

const useStoreBase = () => {
  const [value, setValue, remove] = useLocalStorage<string | number>('store');
  const { currentUser } = useCurrentUser();
  const isSeller = currentUser?.role === 'SELLER';
  const currentStoreId = useMemo(() => (value || currentUser?.stores[0].id.toString()) ?? null, [
    currentUser?.stores,
    value,
  ]);
  const [storeId, setStoreId] = useState<string | number | null>(currentStoreId);

  useEffect(() => {
    setStoreId(currentStoreId);
  }, [currentStoreId, currentUser?.stores, value]);

  // FIXME: rerender in dev mode
  useEvent('storage', () => {
    if (process.env.NODE_ENV === 'production') {
      setStoreId(currentStoreId);
    }
  });

  const updateStoreId = useCallback(
    (storeId: number | string) => {
      setStoreId(storeId);
      setValue(storeId);
    },
    [setValue],
  );

  const clearStore = useCallback(() => {
    setStoreId(null);
    remove();
  }, [remove]);

  return {
    storeId: isSeller ? currentUser?.stores[0].id || null : Number(storeId),
    updateStoreId,
    clearStore,
  };
};

export const [StoreProvider, useStore] = constate(useStoreBase);
