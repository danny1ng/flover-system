import styled from 'astroturf';

export const DefaultModalCloseButton = styled('button')`
  position: fixed;
  border: 0;
  top: 16px;
  right: 16px;
  background: transparent;
  &:focus,
  & {
    outline: none;
  }

  &:before {
    content: '✕';
  }
`;
