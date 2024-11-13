import { css } from '@emotion/css';
import { eq } from 'lodash';

import { SECTION_TYPE } from '../../../../shared/constants';

const topSectionStyle = css`
  margin-top: 8px;
`;

const listSectionStyle = css`
  margin-bottom: 24px;
`;

const getSectionStyle = (sectionType: string) => {
  if (eq(sectionType, SECTION_TYPE.TOP)) {
    return topSectionStyle;
  }
  return listSectionStyle;
};

export { getSectionStyle };
