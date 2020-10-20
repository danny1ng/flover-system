import styled from 'astroturf';

export const ContentContainer = styled.div`
  height: 100%;
  left: 0;
  overflow-y: auto;
  position: absolute;
  top: 0;
  width: 100%;
`;

export const Content = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 64px);

  > * {
    max-width: 100%;
  }
`;
