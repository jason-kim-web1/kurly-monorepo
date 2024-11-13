import styled from '@emotion/styled';

import { RESULT_NOTICE } from '../constants';
import COLOR from '../../../shared/constant/colorset';

const NoticeText = styled.li`
  display: flex;
  line-height: 19px;
  margin-top: 4px;
  font-weight: 400;
  color: ${COLOR.kurlyGray450};

  ::before {
    content: '';
    width: 3px;
    height: 3px;
    background: ${COLOR.borderColor};
    border-radius: 50%;
    margin: 7px 10px 0 0;
    flex-shrink: 0;
  }
`;

export default function SuccessNotice() {
  return (
    <ul>
      {RESULT_NOTICE.map((notice, index) => (
        <NoticeText key={`신청 성공 유의사항-${index}`}>{notice}</NoticeText>
      ))}
    </ul>
  );
}
