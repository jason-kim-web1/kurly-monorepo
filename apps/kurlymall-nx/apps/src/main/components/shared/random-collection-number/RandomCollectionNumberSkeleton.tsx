import { useMemo } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import COLOR from '../../../../shared/constant/colorset';
import useWindowSize from '../../../../shared/hooks/useWindowSize';
import Repeat from '../../../../shared/components/Repeat';
import { isPC } from '../../../../../util/window/getDevice';

const Container = styled.div`
  background: ${isPC ? 'inherit' : `linear-gradient(${COLOR.kurlyWhite}, ${COLOR.kurlyGray200})`};
  padding: 24px 0;
`;

const SectionHeader = styled.div`
  display: flex;
  padding: 0 16px;
  justify-content: space-between;
`;

const SkeletonItem = styled.div`
  background-color: ${COLOR.kurlyGray200};
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const Title = styled(SkeletonItem)`
  width: ${isPC ? '180px' : '124px'};
  height: ${isPC ? '23px' : '22px'};
  margin-top: ${isPC ? '10px' : 0};
`;

const SubTitle = styled(SkeletonItem)`
  width: ${isPC ? '314px' : '232px'};
  height: ${isPC ? '23px' : '18px'};
  margin-top: ${isPC ? '10px' : '4px'};
`;

const ProductList = styled.div`
  display: flex;
  gap: 12px;
  transform: translateX(-94px);

  ${isPC &&
  css`
    justify-content: center;
    gap: 18px;
    transform: none;
  `}
`;

const Thumbnail = styled(SkeletonItem)`
  width: 190px;
  height: ${isPC ? '339px' : '357px'};
`;

const ButtonWrapper = styled.div`
  padding: 0 16px;

  ${isPC &&
  css`
    margin-top: 52px;
    display: flex;
    justify-content: center;
  `}
`;

const ButtonLine = styled.div`
  height: 48px;
  margin-top: 24px;
  border-radius: 4px;
  background-color: ${COLOR.lightGray};

  ${isPC &&
  css`
    width: 516px;
    height: 56px;
  `}
`;

const Space = styled.div<{ sizeHeight: number }>`
  height: ${({ sizeHeight }) => sizeHeight}px;
`;

const RandomCollectionNumberSkeleton = () => {
  const { width } = useWindowSize();
  const repeatCount = useMemo(() => Math.ceil(width / 188) + 1, [width]);

  return (
    <Container>
      <SectionHeader>
        <TitleWrapper>
          <Title />
          <SubTitle />
        </TitleWrapper>
      </SectionHeader>
      <Space sizeHeight={24} />
      <ProductList>
        <Repeat count={isPC ? 5 : repeatCount}>
          <SkeletonItem>
            <Thumbnail />
          </SkeletonItem>
        </Repeat>
        <Space sizeHeight={24} />
      </ProductList>
      <ButtonWrapper>
        <ButtonLine />
      </ButtonWrapper>
    </Container>
  );
};

export { RandomCollectionNumberSkeleton };
