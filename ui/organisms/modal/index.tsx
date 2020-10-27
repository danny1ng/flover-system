import { FC, useCallback, useRef } from 'react';
import FocusLock from 'react-focus-lock';
import useKey from 'react-use/lib/useKey';
import { useDisableWindowScroll } from 'libs';

import { Content, ContentContainer } from './content';
import { Underlay } from './underlay';
import { Wrapper } from './wrapper';

export * from './default-close-button';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    if (isOpen && onClose) {
      onClose();
    }
  }, [isOpen, onClose]);

  const handleContentClick = useCallback(e => e.stopPropagation(), []);

  useDisableWindowScroll(isOpen, containerRef);

  useKey('Escape', () => isOpen && onClose && onClose(), {}, [isOpen, onClose]);

  return (
    <Wrapper>
      {isOpen && (
        <ContentContainer
          key="content"
          onClick={handleClose}
          ref={containerRef}
          data-modal-container
        >
          <Content>
            <div onClick={handleContentClick}>
              <FocusLock returnFocus>{children}</FocusLock>
            </div>
          </Content>
        </ContentContainer>
      )}
      {isOpen && <Underlay key="overlay" />}
    </Wrapper>
  );
};

Modal.defaultProps = {
  onClose: () => null,
};
