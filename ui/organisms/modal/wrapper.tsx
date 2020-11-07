import { FC } from 'react';
import styled from 'astroturf/react';

import { Portal } from '../../atoms';

const Container = styled('div')`
  position: fixed;
  z-index: 100000;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const Wrapper: FC = ({ children }) => (
  <Portal>
    <Container>{children}</Container>
  </Portal>
);
