import styled from '@emotion/styled';

import { css } from '@mui/material';

import COLOR from '../../../../../shared/constant/colorset';
import { multiMaxLineText } from '../../../../../shared/utils/text-formatter';

import { addComma } from '../../../../../shared/services';
import { GiftProductItem } from '../../../../../shared/api/gift/gift';
import { GiftStatus, PRODUCT_PATH, getPageUrl } from '../../../../../shared/constant';
import { GiftOrderStatusTextMap } from '../../constants/status';

import { MobileLink } from '../../../../../shared/components/Link/MobileLink';
import ProductImage from '../../../../../shared/components/product/productImage/ProductImage';

const Wrapper = styled.div<{ disabled: boolean }>`
  display: flex;
  flex-direction: row;
  padding: 16px 20px 18px;
  ${({ disabled }) =>
    disabled &&
    `
    pointer-events: none;
  `};
  + div {
    border-top: 1px solid ${COLOR.bg};
  }
`;

const OrderDataWrapper = styled.div`
  line-height: 20px;
`;

const DealProductName = styled.a`
  font-size: 14px;
  line-height: 19px;
  ${multiMaxLineText(2)}
`;

const ContentsProductName = styled.a`
  display: block;
  margin-top: 2px;
  font-size: 12px;
  line-height: 18px;
  color: ${COLOR.kurlyGray450};
  ${multiMaxLineText(1)}
`;

const PriceWrapper = styled.div`
  padding-top: 2px;
`;

const GoodsPrice = styled.span`
  font-weight: 700;
`;

const OriginalPrice = styled.span`
  margin-left: 3px;
  color: ${COLOR.kurlyGray400};
  text-decoration: line-through;
  font-weight: 400;
`;

const OrderCount = styled.span`
  color: ${COLOR.kurlyGray600};
  font-weight: 600;
`;

const DataSplit = styled.span`
  padding: 0 7px 0 5px;
  &::before {
    content: '';
    display: inline-block;
    width: 1px;
    height: 12px;
    background-color: ${COLOR.lightGray};
    vertical-align: 0;
  }
`;

const StatusWrapper = styled.div`
  margin-top: 5px;
  font-size: 12px;
  font-weight: 600;
`;

const styles = css`
  display: inline-block;
  margin-right: 16px;
`;

interface Props {
  product: GiftProductItem;
  status: GiftStatus;
}

export default function OrderItem({
  product: {
    dealProductName,
    contentsProductName,
    imageUrl,
    contentsProductNo,
    displayPrice,
    displayDiscountPrice,
    quantity,
    isGiveawayProduct,
  },
  status,
}: Props) {
  const productUrl = `${getPageUrl(PRODUCT_PATH.detail)}/${contentsProductNo}`;

  return (
    <Wrapper disabled={isGiveawayProduct}>
      <MobileLink url={productUrl} passHref>
        <a href={productUrl} css={styles}>
          <ProductImage imageUrl={imageUrl} type="small" />
        </a>
      </MobileLink>
      <OrderDataWrapper>
        <MobileLink url={productUrl} passHref>
          <DealProductName data-testid="deal-name">{dealProductName}</DealProductName>
        </MobileLink>
        {dealProductName !== contentsProductName && (
          <MobileLink url={productUrl} passHref>
            <ContentsProductName data-testid="contents-name">{contentsProductName}</ContentsProductName>
          </MobileLink>
        )}
        <PriceWrapper>
          <GoodsPrice data-testid="goods-price">
            {addComma(quantity * (displayPrice - displayDiscountPrice))}원
            {displayDiscountPrice !== 0 && (
              <OriginalPrice data-testid="original-price">{addComma(quantity * displayPrice)}원</OriginalPrice>
            )}
          </GoodsPrice>
          <DataSplit />
          <OrderCount>{addComma(quantity)}개</OrderCount>
        </PriceWrapper>
        {!isGiveawayProduct && <StatusWrapper>{GiftOrderStatusTextMap[status]}</StatusWrapper>}
      </OrderDataWrapper>
    </Wrapper>
  );
}
