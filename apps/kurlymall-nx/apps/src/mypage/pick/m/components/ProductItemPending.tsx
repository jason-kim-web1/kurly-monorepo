import { CSSProperties } from 'react';

import Skeleton from 'react-loading-skeleton';

import styled from '@emotion/styled';

import { css } from '@emotion/react';

const Container = styled.div<{ isPC: boolean }>`
  display: flex;
  height: 133px;

  ${({ isPC }) =>
    isPC
      ? css`
          padding: 10px 0;
        `
      : css`
          padding: 8px 16px;
        `};
`;

const InfoArea = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: calc(100% - 90px);
  padding-left: 16px;
`;

const ButtonArea = styled.div`
  display: flex;
  justify-content: space-between;

  > span {
    width: calc(50% - 4px);
  }
`;

interface Props {
  isPC?: boolean;
  style?: CSSProperties;
}

export default function ProductItemPending({ isPC = true, style }: Props) {
  return (
    <Container style={style} isPC={isPC}>
      <Skeleton width={90} height={117} />
      <InfoArea>
        <div>
          <Skeleton height={21} style={{ marginBottom: '4px' }} />
          <Skeleton width={80} height={21} />
        </div>
        <ButtonArea>
          <Skeleton height={36} />
          <Skeleton height={36} />
        </ButtonArea>
      </InfoArea>
    </Container>
  );
}
