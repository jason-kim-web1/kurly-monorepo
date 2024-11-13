import { memo, forwardRef, ForwardedRef } from 'react';

import Link from 'next/link';

import { isEmpty, isUndefined } from 'lodash';

import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import COLOR from '../../../../shared/constant/colorset';
import ProductCardFunction from '../../../../shared/components/product/card/ProductCardFunction';
import ProductCardPrice from '../../../../shared/components/product/card/ProductCardPrice';
import ProductCardTag from './ProductCardTag';
import ProductCardDeliveryType from './ProductCardDeliveryType';
import { getPageUrl, PRODUCT_PATH } from '../../../../shared/constant';
import ReviewBubble from '../../../../shared/icons/ReviewBubble';
import { NOT_PURCHASABLE_STATUS } from '../../../../shared/constant/productStatusCode';
import type { ShortCutType } from '../../../../shared/types';
import { ProductImage } from '../../../../shared/components/ProductImage';
import { ProductImageType } from '../../../../shared/components/ProductImage/constants';
import type { ProductCardProps } from '../../types';
import { getProductCardEventData, getProductShortCutEventData } from '../../shared/util/productCard';
import { ne } from '../../../../shared/utils/lodash-extends';
import { productStatusMap } from '../../../../shared/services/product.service';

const Container = styled(motion.a)`
  color: ${COLOR.kurlyGray800};
  position: relative;
  width: 50%;
  padding-right: 4px;
  scroll-snap-align: start;

  &:nth-of-type(2n) {
    padding-right: 0;
    padding-left: 4px;
  }

  .button-wrapper {
    width: 100%;
    height: 32px;
    margin-top: 6px;
    border: 1px solid ${COLOR.lightGray};
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;

    & > button {
      font-size: 13px;
      line-height: 19px;

      & > svg {
        margin-right: 4px;
      }
    }
  }
`;

const Ranking = styled.div`
  height: 24px;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
`;

const Content = styled.div`
  padding: 7px 5px 24px 0;
`;

const Name = styled.div`
  overflow: hidden;
  margin-bottom: 2px;
  font-size: 14px;
  line-height: 20px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  letter-spacing: normal;
  word-break: break-word;
  overflow-wrap: break-word;
`;

const Price = styled(ProductCardPrice)`
  .discount-rate,
  .sales-price {
    font-size: 14px;
    font-weight: bold;
    line-height: 19px;
    white-space: nowrap;
  }
  .discount-rate {
    margin-right: 4px;
    color: ${COLOR.pointText};
  }
  .dimmed-price {
    color: ${COLOR.kurlyGray400};
    font-size: 12px;
    font-weight: 400;
    text-decoration: line-through;
  }
`;

const ReviewCount = styled.div`
  display: flex;
  align-items: center;
  padding-top: 8px;
  font-weight: 600;
  font-size: 12px;
  color: ${COLOR.kurlyGray450};
  line-height: 13px;
`;

const ReviewIcon = styled.span`
  width: 14px;
  height: 14px;
  margin: -1px -1px 0 0;
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
    className,
    deliveryTypeNames,
    tags,
    isMultiplePrice,
    reviewCount,
    isBuyNow,
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
    <Link href={link} as={link} passHref prefetch={false}>
      <Container ref={ref} className={className} onClick={() => handleClickProductCard()}>
        {!isUndefined(ranking) && ne(ranking, -1) ? (
          <Ranking>{ne(code, productStatusMap.SOLD_OUT) ? ranking : ''}</Ranking>
        ) : null}
        <ProductImage
          src={imageUrl}
          type={ProductImageType.PRODUCT_LIST_ITEM}
          stickerList={stickers_v2}
          isSoldOut={isSoldOut}
          soldOutTitle={message?.title}
          soldOutMessage={message?.content}
        />
        <ProductCardFunction
          contentProductNo={productNo}
          code={code}
          href={`/m${link}`}
          isGroupProduct={isGroupProduct}
          deliveryTypeNames={deliveryTypeNames}
          queryId={queryId}
          canRestockNotify={canRestockNotify}
          isBuyNow={isBuyNow}
          onSelectProductShortcut={handleShortcut}
          selectDetailShortcut={handleShortcut}
        />
        <Content className="product-info">
          {!isEmpty(deliveryTypeNames) && <ProductCardDeliveryType deliveryTypeNames={deliveryTypeNames} />}
          <Name className="product-name">{name}</Name>
          <Price className="product-price" price={price} discount={discount} isMultiplePrice={isMultiplePrice} />
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
