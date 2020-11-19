import React, { useEffect, useState } from 'react';
import { useCombobox } from 'downshift';

import { TextInput } from '../text-input';

type SelectProps = {
  items: string[];
  defaultSelectedItem?: string;
  name?: string;
  onChange?: (changes?: string) => void;
};

export const InputSelect = ({ items, onChange, ...props }: SelectProps) => {
  const [inputItems, setInputItems] = useState(items);

  const {
    isOpen,
    selectedItem,
    getMenuProps,
    getComboboxProps,
    getItemProps,
    inputValue,
    selectItem,
    getInputProps,
    highlightedIndex,
    closeMenu,
  } = useCombobox({
    items: inputItems || [],
    defaultInputValue: '',
    onInputValueChange: ({ inputValue }) => {
      onChange && onChange(inputValue);
      setInputItems(items.filter(item => item.toLowerCase().startsWith(inputValue.toLowerCase())));
    },
    ...props,
  });

  useEffect(() => {
    selectedItem && onChange?.(selectedItem);

    //FIXME: cannot close after pick option
    setTimeout(() => {
      closeMenu();
    }, 20);
  }, [closeMenu, onChange, selectedItem]);

  return (
    <div className="relative">
      <span className="inline-block w-full" {...getComboboxProps()}>
        <TextInput {...getInputProps()} />
      </span>
      <div
        className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10 outline-none"
        {...getMenuProps()}
      >
        {isOpen && (
          <ul
            tabIndex={-1}
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-item-3"
            className="max-h-56 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
          >
            {inputItems?.map((item, index) => (
              <li
                key={item}
                role="option"
                className={`cursor-default select-none relative py-2 pl-3 pr-9 hover:text-white hover:bg-indigo-600 ${
                  highlightedIndex === index ? 'text-white bg-indigo-600' : 'text-gray-900 '
                }`}
                {...getItemProps({ item, index })}
              >
                <span
                  className={`${
                    selectedItem === item ? 'font-semibold' : 'font-normal'
                  } block truncate space-x-3`}
                >
                  {item}
                </span>
                {selectedItem === item && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </li>
            ))}
            <li
              onClick={() => selectItem(inputValue)}
              className="cursor-default select-none relative py-2 pl-3 pr-9 hover:text-white hover:bg-indigo-600 text-gray-900"
            >
              <span className="font-normal block truncate space-x-3">Добавить: {inputValue}</span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};
