import styled from 'astroturf';

export const Underlay = styled.div`
  @apply bg-primary bg-opacity-50;
  position: fixed;
  z-index: -1;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
`;
