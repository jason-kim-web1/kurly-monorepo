import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { isPC } from '../../../../../util/window/getDevice';
import COLOR from '../../../../shared/constant/colorset';

import SuccessButton from '../../shared/components/SuccessButton';
import { useAppSelector } from '../../../../shared/store';
import { loadRecommendProduct } from '../../slice';

import RecommendResult from './RecommendResult';

const Wrapper = styled.div`
  ${isPC
    ? css`
        width: 820px;
        border: 1px solid ${COLOR.kurlyGray150};
        padding: 35px 30px 40px;
        margin: 0 auto 119px;
      `
    : css`
        overflow-x: visible;
        padding-top: 20px;
        border-top: 1px solid ${COLOR.bg};
      `};
`;

const Title = styled.p`
  font-weight: 700;

  ${isPC
    ? css`
        font-size: 18px;
      `
    : css`
        padding: 0 20px;
        font-size: 16px;
      `};
`;

const Description = styled.p`
  color: ${COLOR.kurlyGray450};

  ${isPC
    ? css`
        margin: 10px 0 16px;
        font-size: 14px;
      `
    : css`
        padding: 0 20px;
        margin: 4px 0 16px;
        line-height: 17px;
      `};
`;

const Products = styled.div`
  display: flex;
  column-gap: 8px;

  ${isPC
    ? css`
        justify-content: space-between;
      `
    : css`
        justify-content: flex-start;
      `};
`;

const SlideWrapper = styled.div`
  overflow-x: scroll;
  overflow-y: visible;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export default function Recommend() {
  const dispatch = useDispatch();

  const {
    profile: { id, hasProfile },
    recommendProduct: { memberName, products },
  } = useAppSelector(({ myKurlyStyle }) => myKurlyStyle);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(loadRecommendProduct(id, hasProfile));
    }
  }, [dispatch, id, hasProfile, products.length]);

  return (
    <Wrapper>
      <Title>{memberName}님을 위한 추천 상품!</Title>
      <Description>비슷한 프로필의 고객이 구매한 상품입니다.</Description>
      <SlideWrapper>
        <Products>
          {products.map((product, index) => (
            <RecommendResult key={product.no} productIndex={index} product={product} />
          ))}
        </Products>
      </SlideWrapper>
      <SuccessButton />
    </Wrapper>
  );
}
