import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import { merge } from 'lodash';

import { isPC } from '../../../../../util/window/getDevice';
import COLOR from '../../../../shared/constant/colorset';

import { addComma } from '../../../../shared/services';
import { amplitudeService } from '../../../../shared/amplitude';
import { SelectProduct } from '../../../../shared/amplitude/events/mykurly-style/SelectProduct';
import { RecommendProduct } from '../../../../shared/interfaces/MyKurlyStyle';
import { redirectTo } from '../../../../shared/reducers/page';

const Wrapper = styled.div`
  ${!isPC &&
  css`
    &:first-of-type {
      padding-left: 20px;
    }
    &:last-of-type {
      padding-right: 20px;
    }
  `}
`;

const Product = styled.button`
  text-align: left;

  ${isPC
    ? css`
        width: 181px;
      `
    : css`
        width: 32vw;
      `};
`;

const ThumbnailImage = styled.img`
  width: 100%;
  object-fit: cover;

  ${isPC
    ? css`
        height: 233px;
      `
    : css`
        height: 41.2vw;
      `};
`;

const ProductTitle = styled.p`
  margin: 8px 0 4px;
  line-height: 18px;
  word-break: keep-all;
`;

const ProductPrice = styled.div`
  font-weight: 700;

  &::after {
    content: '';
    display: block;
    clear: both;
  }
`;

const RateDiscount = styled.p`
  float: left;
  margin-right: 4px;
  color: ${COLOR.pointText};
`;

const OriginalPrice = styled.p`
  width: 100%;
  margin-top: 3px;
  font-size: 12px;
  color: ${COLOR.kurlyGray400};
  text-decoration: line-through;
  font-weight: 400;
`;

interface Props {
  key: number;
  productIndex: number;
  product: RecommendProduct;
}

export default function RecommendResult({ productIndex, product }: Props) {
  const dispatch = useDispatch();

  const {
    no,
    listImageUrl,
    productVerticalMediumUrl,
    name,
    salesPrice,
    discountedPrice,
    discountRate,
    isMultiplePrice,
  } = product;

  const handleLink = useCallback(async () => {
    void amplitudeService.logEvent(new SelectProduct(merge({ index: productIndex }, product)));

    dispatch(
      redirectTo({
        url: `/goods/${no}`,
      }),
    );
  }, [no, product, productIndex, dispatch]);

  return (
    <Wrapper>
      <Product onClick={handleLink}>
        <ThumbnailImage src={productVerticalMediumUrl || listImageUrl} alt="" />
        <ProductTitle>{name}</ProductTitle>
        <ProductPrice>
          {!!discountRate && !!discountedPrice && discountRate > 0 ? (
            <>
              <RateDiscount>{discountRate}%</RateDiscount>
              {addComma(discountedPrice)} 원{isMultiplePrice && '~'}
              <OriginalPrice>{addComma(salesPrice)}원</OriginalPrice>
            </>
          ) : (
            <>{addComma(salesPrice)} 원</>
          )}
        </ProductPrice>
      </Product>
    </Wrapper>
  );
}
