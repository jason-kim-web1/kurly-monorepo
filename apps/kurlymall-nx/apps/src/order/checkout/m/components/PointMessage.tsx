import { memo } from 'react';
import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

const Wrapper = styled.div`
  margin-top: 12px;
  font-size: 14px;
  line-height: 19px;
  color: ${COLOR.kurlyGray450};
`;

const Message = styled.p`
  + p {
    margin-top: 10px;
  }
`;

interface Props {
  message: string;
}

function PointMessage({ message }: Props) {
  return (
    <Wrapper>
      <Message>{message}</Message>
    </Wrapper>
  );
}

export default memo(PointMessage);
