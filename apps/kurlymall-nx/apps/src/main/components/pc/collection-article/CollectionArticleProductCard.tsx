import type { MouseEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import styled from '@emotion/styled';

import type { ProductMainSelectData, ProductStatus } from '../../../../shared/interfaces';
import type { DeliveryInfoName } from '../../../../product/types';
import { multiMaxLineText } from '../../../../shared/utils';
import { NoProductImageLogo } from '../../../../shared/images';
import COLOR from '../../../../shared/constant/colorset';
import ProductCardPrice from '../../../../shared/components/product/card/ProductCardPrice';
import ProductCardFunction from '../../../../shared/components/product/card/ProductCardFunction';
import NextImage from '../../../../shared/components/NextImage';
import { SHORTCUT_TYPE } from '../../../../shared/constant/shortcut-type';

const Product = styled.li`
  width: 507px;
  &:nth-of-type(2n) {
    margin-left: auto;
  }
`;

const LinkInner = styled.a`
  display: flex;
  flex: 0 0 507px;
  padding-top: 24px;
`;

const ThumbWrapper = styled.span`
  overflow: hidden;
  flex-shrink: 0;
  height: 72px;
  margin-right: 20px;
  border-radius: 4px;
  img {
    transition: all 0.5s ease-in-out;
  }
  :hover img {
    transform: scale(1.02);
    transition: all 0.3s ease-in-out;
  }
`;

const Title = styled.span`
  flex: 0 0 311px;
`;

const Name = styled.p`
  width: 295px;
  padding-top: 10px;
  font-size: 16px;
  line-height: 23px;
  cursor: pointer;
  ${multiMaxLineText(1)};
`;

const Price = styled.div`
  padding-top: 7px;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  .discount-rate {
    padding-right: 6px;
  }
  .price {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    &.discount-price {
      > div:nth-of-type(1) {
        order: 2;
        margin-top: -3px;
      }
      > div:nth-of-type(2) {
        padding-right: 7px;
        order: 1;
      }
    }

    .dimmed-price {
      display: block;
      padding: 4px 0 0 3px;
      font-size: 14px;
      color: ${COLOR.kurlyGray450};
      text-decoration: line-through;
    }
    .won {
      font-weight: 400;
    }
  }
`;

const CartStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 104px;
  height: 36px;
  margin: 18px 0 0 auto;
  border: 1px solid ${COLOR.lightGray};
  border-radius: 4px;
  font-size: 13px;
  > svg {
    width: 18px;
    height: 18px;
    margin: 1px 4px 0 0;
  }
`;

const Cart = styled(ProductCardFunction)`
  ${CartStyle};
`;

const GoodsViewLink = styled.button`
  ${CartStyle};
`;

interface Props {
  index: number;
  canRestockNotify: boolean;
  isGroupProduct: boolean;
  isBuyNow: boolean;
  isMultiplePrice: boolean;
  listImageUrl: string;
  name: string;
  no: number;
  salesPrice: number;
  status: ProductStatus;
  deliveryTypeNames: DeliveryInfoName[];
  selectProduct(selectProduct: ProductMainSelectData): void;
  discount: {
    price: number | null;
    rate: number;
  };
}

export default function CollectionArticleProductCard({
  index,
  listImageUrl,
  no,
  name,
  salesPrice,
  discount,
  isMultiplePrice,
  isGroupProduct,
  canRestockNotify,
  deliveryTypeNames,
  isBuyNow,
  status,
  selectProduct,
}: Props) {
  const router = useRouter();
  const productLink = `/goods/${no}`;

  /**
   * 기존의 상세보기를 누르면 이벤트 버블링에 의하여 select_recommendation_{event_code} 이벤트의 selection_type 값이 'content'로 지정되는데
   * 상세보기 버튼을 눌렀을 때는 'detail'로 지정되어야 하므로 타입을 detail로 직접 주입하고 라우팅 처리
   */
  const handleClickGoodsLink = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    selectProduct({ type: SHORTCUT_TYPE.DETAIL, index, productNo: no });
    router.push(productLink);
  };

  return (
    <Product>
      <Link href={productLink} passHref prefetch={false}>
        <LinkInner href={productLink} onClick={() => selectProduct({ type: 'content', index, productNo: no })}>
          <ThumbWrapper>
            <NextImage
              src={listImageUrl ? listImageUrl : NoProductImageLogo}
              width={72}
              height={72}
              objectFit="cover"
              alt="상품 이미지"
            />
          </ThumbWrapper>
          <Title>
            <Name>{name}</Name>
            <Price>
              <ProductCardPrice
                price={salesPrice}
                discount={discount}
                isMultiplePrice={isMultiplePrice}
                className={'price'}
              />
            </Price>
          </Title>
          {isGroupProduct || isBuyNow ? (
            <GoodsViewLink onClick={handleClickGoodsLink}>상세보기</GoodsViewLink>
          ) : (
            <Cart
              contentProductNo={no}
              code={status.code}
              href={productLink}
              isGroupProduct={isGroupProduct}
              canRestockNotify={canRestockNotify}
              deliveryTypeNames={deliveryTypeNames}
              isBuyNow={isBuyNow}
              selectMainShortcut={() => selectProduct({ type: SHORTCUT_TYPE.CART, index, productNo: no })}
            />
          )}
        </LinkInner>
      </Link>
    </Product>
  );
}
