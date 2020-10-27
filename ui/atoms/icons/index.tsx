import { memo } from 'react';
import styled from 'astroturf';

import icons from './sprite.svg';
import { IconsType } from './types';

export type IconProps = {
  name: IconsType;
  src?: '*.svg';
  className?: string;
  size?: number;
  width?: number;
  height?: number;
};

const StyledSvg = styled.svg`
  @apply fill-current inline-flex flex-shrink-0;
`;

const IconImpl = ({ size = 24, src = icons, name, width, height, ...rest }: IconProps) => (
  <StyledSvg
    focusable="false"
    aria-hidden="true"
    role="presentation"
    style={{ width: width || size, height: height || size }}
    {...rest}
  >
    <use xlinkHref={`${src}#${name}`} />
  </StyledSvg>
);

export const Icon = memo(IconImpl);
