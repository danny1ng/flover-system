import React, { useEffect, useMemo } from 'react';
import { useSelect } from 'downshift';

import { useStore } from 'features/store';
import { useCurrentUser } from 'features/user';

export const Select = () => {
  const { currentUser } = useCurrentUser();
  const { storeId, updateStoreId } = useStore();

  const storeOptions = useMemo(
    () => currentUser.stores.map(item => ({ label: item.name, value: item.id.toString() })),
    [currentUser.stores],
  );

  const currentStore = useMemo(() => currentUser.stores.find(item => item.id == storeId), [
    currentUser.stores,
    storeId,
  ]);

  const { isOpen, selectedItem, getToggleButtonProps, getMenuProps, getItemProps } = useSelect({
    items: storeOptions,
    defaultSelectedItem: { value: currentStore.id.toString(), label: currentStore.name },
  });

  useEffect(() => {
    updateStoreId(selectedItem?.value || null);
  }, [selectedItem, updateStoreId]);

  return (
    <div className="ml-3 relative">
      <div className="flex">
        <button
          {...getToggleButtonProps()}
          className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 outline-none"
        >
          Точка: {selectedItem?.label}
        </button>
      </div>
      <div
        {...getMenuProps()}
        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg outline-none"
      >
        {isOpen && (
          <div
            className="py-1 rounded-md bg-white shadow-xs"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            {storeOptions.map((item, index) => (
              <li
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                role="menuitem"
                key={item.value}
                {...getItemProps({ key: item.value, item, index })}
              >
                {item.label}
              </li>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
