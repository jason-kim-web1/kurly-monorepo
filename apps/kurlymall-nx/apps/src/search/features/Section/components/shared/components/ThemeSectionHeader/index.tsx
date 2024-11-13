import { css } from '@emotion/css';

import { isNotEmpty } from '../../../../../../../shared/utils/lodash-extends';
import { multiMaxLineText } from '../../../../../../../shared/utils';
import { ArrowNext18x18 } from '../../../../../../../shared/components/icons/svg/ArrowNext18x18';

const rootStyle = css`
  padding: 20px 10px 16px 16px;
`;

const titleWrapStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const titleStyle = css`
  ${multiMaxLineText(1)};
  flex-shrink: 0;
  flex-basis: 79.65%;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  margin-right: 4px;
`;

const showMoreButtonStyle = css`
  color: inherit;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: end;
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
`;

const subTitleStyle = css`
  margin-top: 4px;
  font-size: 13px;
  line-height: 18px;
  font-weight: 400;
`;

type ThemeSectionHeaderProps = {
  title: string;
  subTitle?: string;
  showMoreIconColor?: string;
  onClickShowMore: () => void;
  showMore?: boolean;
};

const ThemeSectionHeader = ({
  title,
  subTitle,
  onClickShowMore,
  showMoreIconColor,
  showMore = true,
}: ThemeSectionHeaderProps) => {
  const hasSubTitle = isNotEmpty(subTitle);
  return (
    <div className={rootStyle}>
      <h2 className={titleWrapStyle}>
        <span className={titleStyle}>{title}</span>
        {showMore ? (
          <button type="button" className={showMoreButtonStyle} onClick={onClickShowMore}>
            <span>전체보기</span>
            <ArrowNext18x18 stroke={showMoreIconColor} />
          </button>
        ) : null}
      </h2>
      {hasSubTitle ? <h3 className={subTitleStyle}>{subTitle}</h3> : null}
    </div>
  );
};

export { ThemeSectionHeader };
export type { ThemeSectionHeaderProps };
