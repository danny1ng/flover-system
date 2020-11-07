import styled from 'astroturf/react';

export const Button = styled.button`
  @apply relative inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 transition duration-150 ease-in-out;
  &:hover {
    @apply bg-indigo-500;
  }
  &:focus {
    @apply outline-none border-indigo-700 bg-indigo-500;
  }

  &:active {
    @apply bg-indigo-700;
  }
`;
