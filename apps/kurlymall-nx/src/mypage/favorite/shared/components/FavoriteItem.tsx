import { CSSProperties } from 'react';

import Link from 'next/link';

import { css } from '@emotion/react';

import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

import { FavoriteProductExtend } from '../../../../shared/interfaces';

import FavoriteItemPrice from './FavoriteItemPrice';
import ProductThumbnail from './ProductThumbnail';
import ProductButton from './ProductButton';
import { isPC } from '../../../../../util/window/getDevice';
import { CartItem } from '../../../../order/cart/interface/CartProduct';

const ProductItem = styled.div`
  display: flex;

  ${isPC
    ? css`
        padding: 10px 0;
      `
    : css`
        padding: 8px 16px;
      `}
`;

const ThumbnailLink = styled.a<{ isDimmed: boolean }>`
  display: block;
  position: relative;
  width: 90px;
  height: 117px;
  background-color: ${COLOR.kurlyGray150};
  ${({ isDimmed }) =>
    isDimmed &&
    css`
      pointer-events: none;
    `}
`;

const Information = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: calc(100% - 90px);
  padding-left: 16px;
`;

const ProductLink = styled.a<{ isDimmed: boolean }>`
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 19px;
  ${({ isDimmed }) =>
    isDimmed &&
    css`
      pointer-events: none;
    `}
`;

const PriceArea = styled.div`
  margin-top: 4px;

  > span {
    margin-right: 4px;
    line-height: 19px;
  }
`;

const ButtonWrap = styled.div`
  > button {
    width: 100%;
  }
  > button > span {
    font-size: 14px;
  }
`;

const PurchaseCount = styled.p`
  margin-bottom: 6px;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  color: ${COLOR.kurlyGray500};
`;

interface Props {
  index: number;
  style: CSSProperties;
  productExtend: FavoriteProductExtend;
  productNoWithQuantity: CartItem[];
  goodsViewLink: string;
  handleClickLink: (productExtend: FavoriteProductExtend, index: number) => () => void;
  handleClickRestock: (productExtend: FavoriteProductExtend) => () => void;
}

export const FavoriteItem = ({
  index,
  style,
  productExtend,
  productNoWithQuantity,
  goodsViewLink,
  handleClickLink,
  handleClickRestock,
}: Props) => {
  const { count, productName, isDisplay } = productExtend;

  return (
    <ProductItem style={style}>
      <Link href={goodsViewLink} passHref prefetch={false}>
        <ThumbnailLink isDimmed={!isDisplay} onClick={handleClickLink(productExtend, index)}>
          <ProductThumbnail productExtend={productExtend} />
        </ThumbnailLink>
      </Link>
      <Information>
        <div>
          <PurchaseCount>{count}회 구매</PurchaseCount>
          <Link href={goodsViewLink} passHref prefetch={false}>
            <ProductLink isDimmed={!isDisplay} onClick={handleClickLink(productExtend, index)}>
              {productName}
            </ProductLink>
          </Link>
          <PriceArea>
            <FavoriteItemPrice productExtend={productExtend} />
          </PriceArea>
        </div>
        <ButtonWrap>
          <ProductButton
            index={index}
            productExtend={productExtend}
            productNoWithQuantity={productNoWithQuantity}
            onClickRestock={handleClickRestock}
          />
        </ButtonWrap>
      </Information>
    </ProductItem>
  );
};
