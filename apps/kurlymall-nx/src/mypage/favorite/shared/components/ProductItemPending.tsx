import { CSSProperties } from 'react';

import Skeleton from 'react-loading-skeleton';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

const Container = styled.div`
  display: flex;
  height: 133px;
  padding: 8px 16px;
`;

const InfoArea = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: calc(100% - 90px);
  padding-left: 16px;
`;

const marginBottom = css`
  margin-bottom: 4px;
`;

interface Props {
  style?: CSSProperties;
}

export default function ProductItemPending({ style }: Props) {
  return (
    <Container style={style}>
      <Skeleton width={90} height={117} />
      <InfoArea>
        <div>
          <Skeleton height={18} css={marginBottom} />
          <Skeleton width={100} height={18} css={marginBottom} />
          <Skeleton width={60} height={18} />
        </div>
        <Skeleton height={36} />
      </InfoArea>
    </Container>
  );
}
