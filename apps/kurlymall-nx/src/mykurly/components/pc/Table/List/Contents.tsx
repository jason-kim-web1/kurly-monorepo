import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { Interpolation, Theme } from '@emotion/react';

import COLOR from '../../../../../shared/constant/colorset';

interface ContentsProps {
  style?: Interpolation<Theme>;
}

const Contents = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  text-align: center;
  color: ${COLOR.kurlyGray700};
`;

export default function TableContents({ children, style, ...props }: PropsWithChildren<ContentsProps>) {
  return (
    <Contents css={style} {...props}>
      {children}
    </Contents>
  );
}
