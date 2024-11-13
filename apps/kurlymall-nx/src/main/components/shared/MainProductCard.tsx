import styled from '@emotion/styled';

import Link from 'next/link';

import ProductQuantityChip from './special-deals/ProductQuantityChip';
import ProductCardFunction from '../../../shared/components/product/card/ProductCardFunction';
import COLOR from '../../../shared/constant/colorset';
import ProductCardPrice from '../../../shared/components/product/card/ProductCardPrice';
import type { ProductStatus, ProductMainSelectData } from '../../../shared/interfaces';
import ReviewBubble from '../../../shared/icons/ReviewBubble';
import { NOT_PURCHASABLE_STATUS } from '../../../shared/constant/productStatusCode';
import type { ShortCutType } from '../../../shared/types';
import type { DeliveryInfoName, StickerList } from '../../../product/types';
import { ProductImage } from '../../../shared/components/ProductImage';
import { ProductImageType } from '../../../shared/components/ProductImage/constants';

const ProductWrap = styled.a`
  display: block;
`;

const ProductName = styled.h3`
  color: ${COLOR.benefitGray};
`;

const ProductInfo = styled.div`
  padding: 8px 0;
`;

const ContentRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReviewCount = styled.div`
  display: flex;
  color: ${COLOR.mainReview};
`;

const ReviewIcon = styled.div();

const ReviewNumber = styled.span`
  padding-left: 2px;
  font-weight: 400;
`;

interface Props {
  index: number;
  productNo: number;
  imageUrl: string;
  name: string;
  price: number;
  discount: {
    price: number | null;
    rate: number;
  };
  status: ProductStatus;
  isGroupProduct: boolean;
  canRestockNotify: boolean;
  shortDescription?: string;
  href: string;
  isBuyNow: boolean;
  deliveryTypeNames: DeliveryInfoName[];
  reviewCount: string;
  quantity?: number;
  className?: string;
  as?: string;
  isMultiplePrice?: boolean;
  isReviewCount?: boolean;
  stickers: StickerList;
  imageType?: ProductImageType;
  handleSelectProduct(selectProduct: ProductMainSelectData): void;
  onChangeSoldOutStatus?(): void;
}

export default function MainProductCard({
  index,
  productNo,
  imageUrl,
  price,
  discount,
  name,
  quantity,
  status,
  isGroupProduct,
  canRestockNotify,
  className,
  shortDescription,
  href,
  as,
  isMultiplePrice,
  isBuyNow,
  deliveryTypeNames,
  reviewCount,
  isReviewCount = true,
  handleSelectProduct,
  onChangeSoldOutStatus,
  stickers,
  imageType = ProductImageType.MAIN_PRODUCT_LIST_ITEM,
}: Props) {
  const { code, message } = status;
  const isSoldOut = NOT_PURCHASABLE_STATUS.includes(code);
  const handleSelectShortcut = (type: ShortCutType) => {
    handleSelectProduct({ type, index, productNo });
  };

  return (
    <Link href={href} as={as} passHref prefetch={false}>
      <ProductWrap
        href={href}
        className={className}
        onClick={() => handleSelectProduct({ type: 'content', index, productNo })}
      >
        <ProductImage
          src={imageUrl}
          type={imageType}
          stickerList={stickers}
          isSoldOut={isSoldOut}
          soldOutTitle={message?.title}
          soldOutMessage={message?.content}
        />
        <ProductCardFunction
          className="product-function"
          contentProductNo={productNo}
          code={code}
          href={href.replace('[productCode]', String(productNo))}
          isGroupProduct={isGroupProduct}
          canRestockNotify={canRestockNotify}
          deliveryTypeNames={deliveryTypeNames}
          isBuyNow={isBuyNow}
          selectMainShortcut={handleSelectShortcut}
          selectDetailShortcut={handleSelectShortcut}
          onChangeSoldOutStatus={onChangeSoldOutStatus}
        />
        <ProductInfo className="product-info">
          {shortDescription && <div className="product-description">{shortDescription}</div>}
          <ProductName className="product-name">{name}</ProductName>
          <ContentRow className="content-row">
            <ProductCardPrice
              className="product-price"
              price={price}
              discount={discount}
              isMultiplePrice={isMultiplePrice}
            />
            <ProductQuantityChip quantity={quantity} />
          </ContentRow>
          {reviewCount && isReviewCount && (
            <ReviewCount className="review-count">
              <ReviewIcon className="review-icon">
                <ReviewBubble fill={COLOR.mainReview} />
              </ReviewIcon>
              <ReviewNumber className="review-number">{reviewCount}</ReviewNumber>
            </ReviewCount>
          )}
        </ProductInfo>
      </ProductWrap>
    </Link>
  );
}
