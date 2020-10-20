import { useCallback, useEffect, useRef } from 'react';

const getScrollWidth = () => {
  const rect = document.body.getBoundingClientRect();
  const scrollbarWidth = window.innerWidth - rect.width;

  return scrollbarWidth;
};

export const useDisableWindowScroll = (
  isDisabled: boolean,
  preventScrollingRef?: React.MutableRefObject<HTMLDivElement | null>,
) => {
  const pageOffsetRef = useRef(0);

  const enableScroll = useCallback(() => {
    const body = document.body;
    const html = document.querySelector('html') as HTMLElement;
    body.style.overflowY = 'auto';
    body.style.paddingRight = '0';

    body.style.removeProperty('position');
    body.style.removeProperty('top');
    body.style.removeProperty('width');
    window.scrollTo(0, pageOffsetRef.current);

    pageOffsetRef.current = 0;
    html.style.scrollBehavior = '';
  }, []);

  const disableScroll = useCallback(() => {
    const body = document.body;
    const html = document.querySelector('html') as HTMLElement;
    const scrollBarWidth = getScrollWidth();
    pageOffsetRef.current = window.pageYOffset;
    html.style.scrollBehavior = 'initial';

    body.style.overflowY = 'hidden';
    body.style.paddingRight = `${scrollBarWidth}px`;

    body.style.position = 'fixed';
    body.style.top = `-${pageOffsetRef.current}px`;
    body.style.width = '100%';
  }, []);

  useEffect(() => {
    isDisabled ? disableScroll() : enableScroll();

    // prevent content scrolling down
    if (isDisabled && preventScrollingRef && preventScrollingRef.current) {
      setTimeout(() => {
        preventScrollingRef?.current?.scrollTo(0, 0);
      });
    }

    return () => {
      // make possibility render Modal inside Modal or open many modals in same time
      if (isDisabled && document.querySelectorAll('[data-modal-container]').length === 1) {
        enableScroll();
      }
    };
  }, [disableScroll, enableScroll, isDisabled, preventScrollingRef]);

  return null;
};
