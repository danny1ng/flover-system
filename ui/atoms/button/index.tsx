import styled from 'astroturf/react';

export const Button = styled.button`
  @apply group relative inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600;
  &:hover {
    @apply bg-indigo-700;
  }
  &:focus {
    @apply outline-none ring-2 ring-offset-2 ring-indigo-500;
  }

  &:active {
    @apply bg-indigo-700;
  }
`;
