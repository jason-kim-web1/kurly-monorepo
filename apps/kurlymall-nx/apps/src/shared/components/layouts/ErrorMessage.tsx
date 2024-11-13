import { memo } from 'react';

import styled from '@emotion/styled';

import COLOR from '../../constant/colorset';

const P = styled.p`
  font-size: 13px;
  color: ${COLOR.invalidRed};
  margin-top: -4px;
`;

interface Props {
  message?: string;
}

function ErrorMessage({ message }: Props) {
  if (!message) {
    return null;
  }

  return <P>{message}</P>;
}

export default memo(ErrorMessage);
