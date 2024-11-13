import { css } from '@emotion/react';

import { ReviewGuidanceIcon } from '../../../../shared/components/icons/ReviewGuidanceIcon';
import { isPC } from '../../../../../util/window/getDevice';
import COLOR from '../../../../shared/constant/colorset';

const wrapper = css`
  padding: ${isPC ? '12px 0' : '16px 20px'};
`;

const content = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 11px 20px;
  background-color: #fbf7ff;
  border-radius: 6px;
`;

const textWrapper = css`
  display: flex;
  flex-direction: column;
  width: 245px;
  margin-right: 8px;
`;

const mainText = css`
  color: ${COLOR.loversLavender};
  font-size: 13px;
  font-weight: 500;
  line-height: 18px;
  padding-bottom: 2px;
`;
const subText = css`
  color: #b489d8;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
`;

const ReviewGuidanceBanner = () => {
  return (
    <div css={wrapper}>
      <figure css={content}>
        <p css={textWrapper}>
          <p css={mainText}>베스트 후기로 선정되면 적립금 5,000원!</p>
          <p css={subText}>텍스트 300자, 이미지 2장 이상 등록</p>
        </p>
        <ReviewGuidanceIcon />
      </figure>
    </div>
  );
};

export { ReviewGuidanceBanner };
