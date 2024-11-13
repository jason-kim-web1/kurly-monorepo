import { CSSProperties } from 'react';
import { css } from '@emotion/react';

import styled from '@emotion/styled';

import Skeleton from 'react-loading-skeleton';

import Repeat from '../../../../shared/components/Repeat';
import { isPC } from '../../../../../util/window/getDevice';

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 133px;
  padding: 8px 16px;
`;
const InfoWrapper = styled.div`
  display: flex;
  align-items: start;
`;
const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 90px);
`;

const styles = {
  count: css`
    margin-bottom: 6px;
  `,
  marginBottom: css`
    margin-bottom: 4px;
  `,
  marginRight: css`
    margin-right: 16px;
  `,
  price: css`
    margin-bottom: 15px;
  `,
};
interface Props {
  style?: CSSProperties;
}

export const FavoriteListSkeleton = ({ style }: Props) => {
  return (
    <Repeat count={10}>
      <Container style={style}>
        <InfoWrapper>
          <Skeleton width={90} height={117} css={styles.marginRight} />
          <TextArea>
            <Skeleton width={100} height={14} css={styles.count} />
            <Skeleton width={220} height={18} css={styles.marginBottom} />
            <Skeleton width={130} height={18} css={styles.price} />
            <Skeleton width={isPC ? 500 : 250} height={36} />
          </TextArea>
        </InfoWrapper>
      </Container>
    </Repeat>
  );
};
