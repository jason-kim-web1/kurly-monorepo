import styled from '@emotion/styled';

import { BoardList } from '../../../../../../board/components/pc/List';

import COLOR from '../../../../../../shared/constant/colorset';

const Message = styled.p`
  display: flex;
  padding: 117px 0;
  font-size: 16px;
  font-weight: 500;
  color: ${COLOR.kurlyGray800};
  justify-content: center;
  text-align: center;
`;

export default function Empty() {
  return (
    <BoardList.Contents.ExpandView isOpen>
      <Message>작성한 1:1 문의가 없습니다.</Message>
    </BoardList.Contents.ExpandView>
  );
}
