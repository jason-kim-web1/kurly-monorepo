import { css } from '@emotion/css';

import type { ChildrenOnlyProps } from '../../../../../../../shared/types';

const rootStyle = css`
  & > .swiper {
    padding: 0 16px;
    > .swiper-wrapper {
      align-items: stretch;
      > .swiper-slide {
        width: 36.26vw !important;
        height: auto;
      }
    }
  }
`;

const ThemeSectionProductListWrap = ({ children }: ChildrenOnlyProps) => <div className={rootStyle}>{children}</div>;

export { ThemeSectionProductListWrap };
