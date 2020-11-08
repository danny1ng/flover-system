import styled from 'astroturf/react';

export const TextInput = styled.input`
  @apply appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md shadow-sm;
  &:focus {
    @apply outline-none border-blue-300 z-10;
  }

  &::placeholder {
    @apply text-gray-500;
  }

  @screen sm {
    @apply text-sm leading-5;
  }
`;
