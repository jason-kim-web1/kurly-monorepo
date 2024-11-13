import { memo } from 'react';
import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

import COLOR from '../../../../shared/constant/colorset';

const Wrapper = styled.div`
  margin-top: 10px;
  font-size: 12px;
  line-height: 18px;
  color: ${COLOR.kurlyGray600};
`;

const Message = styled.p`
  + p {
    margin-top: 4px;
  }
`;

interface Props {
  message: string;
}

function PointMessage({ message }: Props) {
  return <Wrapper>{!isEmpty(message) && <Message>{message}</Message>}</Wrapper>;
}

export default memo(PointMessage);
