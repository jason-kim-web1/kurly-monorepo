import { css } from '@emotion/css';
import { useMemo } from 'react';

import COLOR from '../../../../../../../shared/constant/colorset';
import { ListAllIcon } from '../../../../../../../shared/components/icons/svg/ListAllIcon';

const rootStyle = css`
  color: inherit;
  width: 100%;
  height: 100%;
  padding: 0 27px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const labelStyle = css`
  margin-top: 8px;
  color: inherit;
  font-size: 14px;
  font-style: normal;
  line-height: 19px;
`;

const grayLabelStyle = css`
  color: ${COLOR.kurlyGray800};
`;

type ThemeSectionShowMoreCardProps = {
  color: string;
  isLabelGray?: boolean;
  onClick: () => void;
};

const ThemeSectionShowMoreCard = ({ color, isLabelGray = false, onClick }: ThemeSectionShowMoreCardProps) => {
  const labelClassName = useMemo(() => {
    const classNames = [labelStyle];
    if (isLabelGray) {
      classNames.push(grayLabelStyle);
    }
    return classNames.join(' ');
  }, [isLabelGray]);
  return (
    <button type="button" className={rootStyle} onClick={onClick}>
      <ListAllIcon circleStroke={color} pathStroke={color} />
      <span className={labelClassName}>더보기</span>
    </button>
  );
};

export { ThemeSectionShowMoreCard };
