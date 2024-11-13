import { memo } from 'react';

import styled from '@emotion/styled';

const P = styled.p`
  font-size: 13px;
  color: #0f851a;
  margin-top: -4px;

  &::before {
    content: '✓';
    margin-right: 3px;
  }
`;

interface Props {
  message?: string;
}

function SuccessMessage({ message }: Props) {
  if (!message) {
    return null;
  }

  return <P>{message}</P>;
}

export default memo(SuccessMessage);
