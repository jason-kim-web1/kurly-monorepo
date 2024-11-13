import { CSSProperties } from 'react';

import Link from 'next/link';

import { css } from '@emotion/react';

import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { multiMaxLineText } from '../../../../shared/utils';
import { PickProduct, PickProductExtend } from '../../../../shared/api';

import usePickButtonEvent from '../../hooks/usePickButtonEvent';
import ProductPrice from '../../shared/components/ProductPrice';
import ProductThumbnail from '../../shared/components/ProductThumbnail';
import PickProductButton from '../../shared/components/PickProductButton';

const Item = styled.div<{ isPC: boolean }>`
  display: flex;

  ${({ isPC }) =>
    isPC
      ? css`
          padding: 10px 0;
        `
      : css`
          padding: 8px 16px;
        `};
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
  ${({ isDimmed }) =>
    isDimmed &&
    css`
      color: ${COLOR.kurlyGray350};
      pointer-events: none;
    `}
`;

const ProductName = styled.div`
  ${multiMaxLineText(2)};
  line-height: 19px;
`;

const PriceArea = styled.div`
  margin-top: 4px;

  > span {
    margin-right: 4px;
    line-height: 19px;
  }
`;

const ButtonArea = styled.div<{ isPC: boolean }>`
  display: flex;
  justify-content: space-between;
  gap: 6px;

  > button > span {
    font-size: 14px;
  }

  ${({ isPC }) =>
    isPC
      ? css`
          > button {
            width: 100%;
          }
        `
      : css``};
`;

interface Props {
  isPC: boolean;
  index: number;
  product: PickProductExtend;
  style: CSSProperties;
  handleClickCart: (product: PickProduct, index: number) => () => void;
  handleClickRestock: (product: PickProduct) => () => void;
}

export default function PickItem({ isPC, index, product, style, handleClickCart, handleClickRestock }: Props) {
  const { no, isUnavailable, productName } = product;

  const { handleClickLink } = usePickButtonEvent();

  const goodsViewLink = `/goods/${no}`;

  const handleRestock = () => {
    handleClickRestock(product)();
  };

  return (
    <>
      <Item style={style} isPC={isPC}>
        <Link href={goodsViewLink} passHref prefetch={false}>
          <ThumbnailLink isDimmed={isUnavailable} onClick={handleClickLink(product, index)}>
            <ProductThumbnail product={product} />
          </ThumbnailLink>
        </Link>
        <Information>
          <div>
            <ProductName>
              <Link href={goodsViewLink} passHref prefetch={false}>
                <ProductLink isDimmed={isUnavailable} onClick={handleClickLink(product, index)}>
                  {productName}
                </ProductLink>
              </Link>
            </ProductName>
            <PriceArea>
              <ProductPrice product={product} />
            </PriceArea>
          </div>
          <ButtonArea isPC={isPC}>
            <PickProductButton
              isPC={isPC}
              index={index}
              product={product}
              onClickCart={handleClickCart}
              onClickRestock={handleRestock}
            />
          </ButtonArea>
        </Information>
      </Item>
    </>
  );
}
