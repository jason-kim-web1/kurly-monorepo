import { memo, ReactNode } from 'react';

import styled from '@emotion/styled';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 180px;
  font-size: 15px;
  line-height: 24px;
  font-weight: 600;
  margin-right: 8px;
`;

const Text = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Divider = styled.span`
  flex-shrink: 0;
  margin-right: 4px;
`;

const Suffix = styled.span`
  flex-shrink: 0;
`;

interface Props {
  text: string | ReactNode;
  divider?: string;
  suffix?: string;
}

function CollapseSummary({ text, divider, suffix }: Props) {
  return (
    <Wrapper>
      <Text>{text}</Text>
      <Divider>{divider}</Divider>
      <Suffix>{suffix}</Suffix>
    </Wrapper>
  );
}

export default memo(CollapseSummary);
