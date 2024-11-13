import { css } from '@emotion/css';

import COLOR from '../../../../shared/constant/colorset';

const sectionStyle = css`
  border-bottom: 8px solid ${COLOR.bg};
`;

const titleStyle = css`
  padding: 24px 16px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const titleTextStyle = css`
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 21px; /* 131.25% */
`;

export { sectionStyle, titleStyle, titleTextStyle };
