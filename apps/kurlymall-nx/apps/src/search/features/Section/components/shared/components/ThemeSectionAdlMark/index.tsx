import { css } from '@emotion/css';

import { clsx } from '../../../../../../../shared/utils/clsx';

const rootStyle = css`
  position: absolute;
  right: 16px;
  bottom: 6px;
  font-size: 10px;
  line-height: 12px;
`;

type ThemeSectionAdlMarkProps = {
  isAds: boolean;
  color: string;
};

const ThemeSectionAdMark = ({ isAds, color }: ThemeSectionAdlMarkProps) => {
  const fontColorStyle = css`
    color: ${color};
  `;
  if (!isAds) {
    return null;
  }
  return <div className={clsx(rootStyle, fontColorStyle)}>광고</div>;
};

export { ThemeSectionAdMark };
export type { ThemeSectionAdlMarkProps };
