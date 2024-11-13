/* eslint-disable react/no-unused-prop-types */
import { CSSProperties, ReactNode } from 'react';

import styled from '@emotion/styled';

const Wrapper = styled.div``;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 14px;
  + div {
    padding-top: 13px;
  }
`;

const Subject = styled.strong`
  min-width: 104px;
  margin-right: 16px;
  font-weight: normal;
  color: #666;
  flex-shrink: 1;
`;

const Contents = styled.span<{ style?: any }>`
  color: #333;
  flex-grow: 1;
  word-break: break-all;
  ${({ style }) => style || ''};
`;

interface Coulmns {
  subject: ReactNode;
  contents: ReactNode;
}

interface Props {
  columns: Coulmns[];
  style?: CSSProperties;
}

export default function MultiColumns({ columns, style }: Props) {
  return (
    <Wrapper>
      {columns.map(({ subject, contents }: Coulmns) => (
        <Item key={`multi-column-${subject}`}>
          <Subject>{subject}</Subject>
          <Contents style={style}>{contents}</Contents>
        </Item>
      ))}
    </Wrapper>
  );
}
