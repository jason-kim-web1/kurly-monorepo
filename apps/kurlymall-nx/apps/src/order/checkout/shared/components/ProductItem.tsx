import { memo } from 'react';

import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { Typography } from '@thefarmersfront/kpds-react';

import COLOR from '../../../../shared/constant/colorset';
import Divider from '../../../common/components/Divider';
import NextImage from '../../../../shared/components/NextImage';
import { multiLineEllipsisStyle } from '../../../common/utils/multiLineEllipsisStyle';
import { CheckoutProductItem, CheckoutType } from '../../../../shared/interfaces';
import { getLiquidityMessageToCheckoutType } from '../utils/getLiquidityMessageToCheckoutType';
import useCheckoutProductItem from '../hooks/useCheckoutProducts';

const Item = styled.li`
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
`;

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  min-width: 56px;
  height: 72px;
  margin-right: ${vars.spacing.$12};
  background-color: ${COLOR.kurlyGray150};
  border-radius: ${vars.radius.$8};
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Name = styled.div`
  overflow: hidden;
`;

const DealProductName = styled(Typography)`
  color: ${vars.color.text.$primary};
  ${multiLineEllipsisStyle(3)};
`;

const ContentProductName = styled(Typography)`
  padding-top: ${vars.spacing.$2};
  color: ${vars.color.text.$tertiary};
  ${multiLineEllipsisStyle(1)};
`;

const Quantity = styled(Typography)`
  color: ${vars.color.text.$secondary};
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  padding-top: ${vars.spacing.$6};
`;

const CurrentTotalPrice = styled(Typography)`
  font-weight: ${vars.fontWeight.$bold};
  color: ${vars.color.main.$secondary};
`;

const OriginalTotalPrice = styled.span`
  margin-left: ${vars.spacing.$4};
  color: ${vars.color.$gray400};
  word-break: break-all;
  text-decoration: line-through;
  font-size: ${vars.fontSize.$13};
  line-height: ${vars.fontSize.$18};
`;

const SubDescription = styled(Typography)`
  color: ${vars.color.point.$point2};
  margin-bottom: ${vars.spacing.$2};
`;

const NonCouponProductLabel = styled(Typography)`
  width: fit-content;
  padding: 3px ${vars.spacing.$6};
  color: ${vars.color.text.$secondary};
  background-color: ${vars.color.background.$background3};
  margin-top: ${vars.spacing.$4};
  border-radius: 4px;
`;

interface Props {
  product: CheckoutProductItem;
  isGiveaway?: boolean;
  checkoutType?: CheckoutType;
}

function ProductItem({ product, isGiveaway, checkoutType }: Props) {
  const subDescription = getLiquidityMessageToCheckoutType(checkoutType);
  const {
    dealProductName,
    contentProductName,
    thumbnailUrl,
    quantity,
    showContentProductName,
    showDiscountedPrice,
    originalTotalPrice,
    discountedTotalPrice,
    isCouponBlacklist,
  } = useCheckoutProductItem({ product, isGiveaway });

  return (
    <Item>
      <ImageWrapper>
        <NextImage src={thumbnailUrl} alt={dealProductName} layout="fill" objectFit="cover" />
      </ImageWrapper>
      <Contents>
        {subDescription && <SubDescription variant={'$mediumRegular'}>{subDescription}</SubDescription>}
        <Name>
          <DealProductName variant={'$xlargeRegular'}>{dealProductName}</DealProductName>
          {showContentProductName && (
            <ContentProductName variant={'$mediumRegular'} data-testid="content-product-name">
              {contentProductName}
            </ContentProductName>
          )}
        </Name>
        <Price>
          {!isGiveaway && (
            <>
              {showDiscountedPrice ? (
                <>
                  <CurrentTotalPrice variant={'$xlargeBold'}>{discountedTotalPrice}</CurrentTotalPrice>
                  <OriginalTotalPrice>{originalTotalPrice}</OriginalTotalPrice>
                </>
              ) : (
                <CurrentTotalPrice variant={'$xlargeBold'}>{originalTotalPrice}</CurrentTotalPrice>
              )}
              <Divider width={`${vars.spacing.$1}`} height={`${vars.spacing.$12}`} margin={`0 ${vars.spacing.$6}`} />
            </>
          )}
          <Quantity variant={'$xlargeRegular'}>{quantity}개</Quantity>
        </Price>
        {isCouponBlacklist && <NonCouponProductLabel variant={'$xsmallSemibold'}>쿠폰 적용 제한</NonCouponProductLabel>}
      </Contents>
    </Item>
  );
}

export default memo(ProductItem);
