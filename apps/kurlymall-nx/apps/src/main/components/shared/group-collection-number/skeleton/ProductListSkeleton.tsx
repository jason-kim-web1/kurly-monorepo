import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import COLOR from '../../../../../shared/constant/colorset';
import useWindowSize from '../../../../../shared/hooks/useWindowSize';
import { isPC } from '../../../../../../util/window/getDevice';
import Repeat from '../../../../../shared/components/Repeat';

const SkeletonItem = styled.div`
  background-color: ${COLOR.kurlyGray200};
`;

const Container = styled.div`
  margin-top: 28px;
  display: flex;
  gap: 32px;
  padding-left: 16px;

  ${isPC &&
  css`
    margin-top: 50px;
    justify-content: center;
  `}
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Card = styled.div`
  display: flex;
  gap: 12px;
`;

const ThumbnailWrapper = styled.div`
  width: ${isPC ? '127px' : '109px'};
`;

const ContentWrapper = styled.div`
  width: ${isPC ? '153px' : '104px'};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Thumbnail = styled(SkeletonItem)`
  width: ${isPC ? '127px' : '109px'};
  height: ${isPC ? '169px' : '145px'};
`;

const TextLine = styled(SkeletonItem)<{ sizeWidth: number; sizeHeight: number }>`
  width: ${({ sizeWidth }) => sizeWidth}px;
  height: ${({ sizeHeight }) => sizeHeight}px;
`;

const Space = styled.div<{ sizeHeight: number }>`
  height: ${({ sizeHeight }) => sizeHeight}px;
`;

const ProductListSkeleton = () => {
  const { width } = useWindowSize();

  const count = useMemo(() => Math.ceil(width / 230), [width]);

  return (
    <Container>
      <Repeat count={isPC ? 3 : count}>
        <List>
          <Repeat count={3}>
            <Card>
              <ThumbnailWrapper>
                <Thumbnail />
              </ThumbnailWrapper>
              <ContentWrapper>
                <div>
                  <TextLine sizeWidth={32} sizeHeight={32} />
                  <Space sizeHeight={4} />
                  <TextLine sizeWidth={isPC ? 153 : 109} sizeHeight={isPC ? 23 : 18} />
                  <Space sizeHeight={4} />
                  <TextLine sizeWidth={80} sizeHeight={18} />
                </div>
                <div>
                  <TextLine sizeWidth={isPC ? 153 : 109} sizeHeight={30} />
                </div>
              </ContentWrapper>
            </Card>
          </Repeat>
        </List>
      </Repeat>
    </Container>
  );
};

export { ProductListSkeleton };
