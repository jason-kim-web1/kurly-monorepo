import { forwardRef, memo, ForwardedRef } from 'react';
import { isEmpty, isUndefined } from 'lodash';
import Link from 'next/link';
import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import ProductCardFunction from '../../../../shared/components/product/card/ProductCardFunction';
import ProductCardPrice from '../../../../shared/components/product/card/ProductCardPrice';
import { getPageUrl, PRODUCT_PATH } from '../../../../shared/constant';
import ProductCardTag from './ProductCardTag';
import ProductCardDeliveryType from './ProductCardDeliveryType';
import { multiMaxLineText } from '../../../../shared/utils';
import ReviewBubble from '../../../../shared/icons/ReviewBubble';
import { NOT_PURCHASABLE_STATUS } from '../../../../shared/constant/productStatusCode';
import type { ShortCutType } from '../../../../shared/types';
import { ProductImage } from '../../../../shared/components/ProductImage';
import { ProductImageType } from '../../../../shared/components/ProductImage/constants';
import type { ProductCardProps } from '../../types';
import { getProductCardEventData, getProductShortCutEventData } from '../../shared/util/productCard';
import { ne } from '../../../../shared/utils/lodash-extends';

const Container = styled.a`
  display: flex;
  flex-direction: column;
  min-height: 573px;
  color: ${COLOR.kurlyGray800};
  cursor: pointer;

  & > div:first-of-type {
    flex-shrink: 0;
  }

  :nth-of-type(3n) {
    margin-right: 0;
  }

  .button-wrapper {
    width: 100%;
    height: 36px;
    margin-top: 6px;
    border: 1px solid ${COLOR.lightGray};
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;

    & > button {
      height: 36px;
      font-size: 16px;
      line-height: 19px;

      & > svg {
        margin-right: 4px;
        width: 22px;
        height: 22px;
      }
    }
  }
`;

const Ranking = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  font-weight: 700;
  font-size: 24px;
  line-height: 16px;
`;

const Content = styled.div`
  padding: 8px 10px 0 0;
`;

const Name = styled.span`
  max-height: 58px;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: normal;
  ${multiMaxLineText(2)};
`;

const Price = styled(ProductCardPrice)`
  padding-top: 8px;
  .discount-rate,
  .sales-price {
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    white-space: nowrap;
    letter-spacing: -0.5px;
  }
  .discount-rate {
    margin-right: 7px;
  }
  .dimmed-price {
    font-size: 14px;
    color: ${COLOR.kurlyGray400};
    text-decoration: line-through;
  }
`;

const ShortDescription = styled.p`
  padding-top: 4px;
  font-size: 12px;
  color: ${COLOR.kurlyGray450};
  line-height: 18px;
  letter-spacing: normal;
  ${multiMaxLineText(2)}
`;

const ReviewCount = styled.div`
  display: flex;
  align-items: center;
  padding-top: 8px;
  font-weight: 500;
  font-size: 13px;
  color: ${COLOR.kurlyGray450};
  line-height: 17px;
`;

const ReviewIcon = styled.span`
  width: 15px;
  height: 15px;
  margin: 1px -1px 0 0;
`;

const ReviewNumber = styled.span`
  padding-left: 3px;
  font-weight: 400;
`;

function ProductCard(props: ProductCardProps, ref: ForwardedRef<HTMLAnchorElement>) {
  const {
    productNo,
    imageUrl,
    price,
    discount,
    name,
    status,
    isGroupProduct,
    canRestockNotify,
    deliveryTypeNames,
    shortDescription,
    tags,
    isMultiplePrice,
    isBuyNow,
    reviewCount,
    queryId,
    handleLinkClick,
    selectProduct,
    ranking,
    stickers_v2,
  } = props;

  const link = `${getPageUrl(PRODUCT_PATH.detail)}/${productNo}`;
  const { code, message } = status;
  const isSoldOut = NOT_PURCHASABLE_STATUS.includes(code);

  const handleShortcut = (type: ShortCutType) => selectProduct(getProductShortCutEventData(type, props));

  const handleClickProductCard = () => handleLinkClick(getProductCardEventData(props));

  return (
    <Link href={link} passHref prefetch={false}>
      <Container ref={ref} onClick={() => handleClickProductCard()}>
        {!isUndefined(ranking) ? <Ranking>{ne(ranking, -1) ? ranking : ''}</Ranking> : null}
        <ProductImage
          src={imageUrl}
          type={ProductImageType.PRODUCT_LIST_ITEM}
          isSoldOut={isSoldOut}
          stickerList={stickers_v2}
          soldOutTitle={message?.title}
          soldOutMessage={message?.content}
        />
        <ProductCardFunction
          contentProductNo={productNo}
          code={code}
          href={link}
          isGroupProduct={isGroupProduct}
          deliveryTypeNames={deliveryTypeNames}
          queryId={queryId}
          canRestockNotify={canRestockNotify}
          isBuyNow={isBuyNow}
          onSelectProductShortcut={handleShortcut}
          selectDetailShortcut={handleShortcut}
        />
        <Content>
          {!isEmpty(deliveryTypeNames) && <ProductCardDeliveryType deliveryTypeNames={deliveryTypeNames} />}
          <Name>{name}</Name>
          {shortDescription && <ShortDescription>{shortDescription}</ShortDescription>}
          <Price price={price} discount={discount} isMultiplePrice={isMultiplePrice} />
          {reviewCount && (
            <ReviewCount className="review-count">
              <ReviewIcon>
                <ReviewBubble />
              </ReviewIcon>
              <ReviewNumber className="review-number">{reviewCount}</ReviewNumber>
            </ReviewCount>
          )}
          {tags && !isEmpty(tags) && <ProductCardTag tags={tags} />}
        </Content>
      </Container>
    </Link>
  );
}

export default memo(forwardRef(ProductCard));
