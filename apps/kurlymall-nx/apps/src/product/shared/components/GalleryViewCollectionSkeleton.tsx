import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';
import type { Property } from 'csstype';
import { useEffect, useRef, useState } from 'react';
import { keyframes } from '@emotion/react';

import Repeat from '../../../shared/components/Repeat';

const gradient = keyframes`
  0% {
    background-position:0 50%
  }
  50% {
    background-position:50% 50%
  }
  100% {
    background-position:200% 50%
  }
`;

const SkeletonBox = styled.div<{ borderRadius?: string; width?: number; height?: number; margin?: Property.Margin }>`
  background: linear-gradient(
    270deg,
    ${vars.color.background.$background3},
    ${vars.color.background.$background4} 42%,
    ${vars.color.background.$background4} 68%,
    ${vars.color.background.$background3}
  );
  background-size: 200%;
  animation: ${gradient} 1s linear infinite;
  border-radius: ${({ borderRadius }) => borderRadius};
  width: ${({ width }) => (width ? `${width}px` : '')};
  height: ${({ height }) => (height ? `${height}px` : '')};
  margin: ${({ margin }) => margin};
`;

const HeaderWrap = styled.div`
  display: flex;
  padding: 0 ${vars.spacing.$16} 0 ${vars.spacing.$20};
  gap: ${vars.spacing.$16};
  align-items: center;
`;

const TitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  gap: ${vars.spacing.$2};
  ${SkeletonBox}
`;

const ButtonWrap = styled.div`
  flex: 0 0 auto;
  min-width: 0;
`;

const ProductWrap = styled.div`
  margin-top: ${vars.spacing.$12};
  gap: ${vars.spacing.$2};
  display: flex;
  padding: 0 ${vars.spacing.$16};
  overflow: auto;
  scroll-snap-type: x mandatory;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ProductItemWrap = styled.div`
  width: 120px;
  scroll-snap-align: start;
  scroll-margin-left: ${vars.spacing.$16};
  scroll-margin-right: 0;
  flex: 0 0 auto;

  &:first-of-type {
    ${SkeletonBox} {
      border-radius: ${vars.radius.$16} 0 0 ${vars.radius.$16};
    }
  }

  &:last-of-type {
    ${SkeletonBox} {
      border-radius: 0 ${vars.radius.$16} ${vars.radius.$16} 0;
    }
  }
`;

const Wrapper = styled.div``;

const ProductItem = () => {
  return (
    <ProductItemWrap>
      <SkeletonBox height={156} />
    </ProductItemWrap>
  );
};

const GalleryViewCollectionSkeleton = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [skeletonCounts, setSkeletonCounts] = useState(0);

  useEffect(() => {
    const width = ref.current?.offsetWidth ?? 0;
    const SKELETON_WIDTH = 128; // 상품 카드 + 마진
    setSkeletonCounts(width / SKELETON_WIDTH + 1);
  }, []);

  return (
    <Wrapper ref={ref}>
      <HeaderWrap>
        <TitleWrap>
          <SkeletonBox borderRadius={vars.radius.$6} height={26} />
          <SkeletonBox borderRadius={vars.radius.$6} height={20} />
        </TitleWrap>
        <ButtonWrap>
          <SkeletonBox borderRadius={vars.radius.$16} width={73} height={32} />
        </ButtonWrap>
      </HeaderWrap>

      <ProductWrap>
        <Repeat count={skeletonCounts}>
          <ProductItem />
        </Repeat>
      </ProductWrap>
    </Wrapper>
  );
};

export { GalleryViewCollectionSkeleton };
