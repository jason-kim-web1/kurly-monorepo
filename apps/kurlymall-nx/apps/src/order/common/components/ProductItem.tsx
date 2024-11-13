import { SyntheticEvent, useCallback } from 'react';
import styled from '@emotion/styled';
import { Box, Typography } from '@thefarmersfront/kpds-react';
import { vars } from '@thefarmersfront/kpds-css';
import Link from 'next/link';

import { DealProduct } from '../interface/DealProduct';
import { DeliveryPolicy } from '../interface/DeliveryGroup';
import { addComma } from '../../../shared/services';
import Divider from './Divider';
import { multiLineEllipsisStyle } from '../utils/multiLineEllipsisStyle';
import { NoProductImageLogo } from '../../../shared/images';
import { useWebview } from '../../../shared/hooks';
import deepLinkUrl from '../../../shared/constant/deepLink';
import { PRODUCT_PATH, getPageUrl } from '../../../shared/constant';
import COLOR from '../../../shared/constant/colorset';
import { getReplaceUrl } from '../../../../util/window/getDevice';
import { PropsWithChildrenOnly } from '../../../shared/interfaces';

const Row = styled.div<{ disabled?: boolean }>`
  display: flex;
  flex-direction: row;
  pointer-events: ${({ disabled }) => disabled && 'none'};
  justify-content: flex-start;
  align-items: center;
`;

const PriceWrapper = styled(Row)`
  margin-top: ${vars.spacing.$4};
`;

const ProductImage = styled.img`
  min-width: 56px;
  width: 56px;
  height: 72px;
  margin-right: ${vars.spacing.$12};
  background-color: ${COLOR.kurlyGray150};
  border-radius: ${vars.radius.$8};
`;

const DeliveryWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${vars.spacing.$2};
`;

const Dot = styled.span`
  &::before {
    margin: 2px 4px;
    content: '';
    display: inline-block;
    background-color: ${vars.color.text.$quaternary};
    border-radius: 50%;
    width: 3px;
    height: 3px;
  }
`;

const ColorTypography = styled(Typography)<{ fontColor: string }>`
  color: ${({ fontColor }) => fontColor};
  ${multiLineEllipsisStyle(1)};
`;

const DealProductName = styled(Typography)<{ isOrderDetailPage: boolean }>`
  color: ${vars.color.text.$primary};
  ${({ isOrderDetailPage }) => multiLineEllipsisStyle(isOrderDetailPage ? 3 : 1)};
`;

const ContentProductName = styled(Typography)`
  color: ${vars.color.text.$tertiary};
  ${multiLineEllipsisStyle(1)};
  margin-top: ${vars.spacing.$2};
`;

const OriginPrice = styled.p`
  color: ${vars.color.text.$disabled};
  font-size: ${vars.fontSize.$13};
  line-height: ${vars.lineHeight.$18};
  text-decoration-line: line-through;
  margin-left: ${vars.spacing.$4};
`;

interface Props {
  data: {
    deliveryPolicy: DeliveryPolicy;
    dealProduct: DealProduct;
    partnerName: string;
    isOrderDetailPage?: boolean;
  };
}

const ProductThumbnail = ({ imageUrl, dealProductName }: { imageUrl: string; dealProductName: string }) => {
  const src = imageUrl || NoProductImageLogo;

  const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = NoProductImageLogo;
  };

  return <ProductImage src={src} onError={handleError} alt={dealProductName} />;
};

/** 주문목록, 주문상세에서 사용하는 상품 목록 요소 컴포넌트 */

const ProductItem = ({ data: { deliveryPolicy, dealProduct, partnerName, isOrderDetailPage = false } }: Props) => {
  const webview = useWebview();
  const {
    imageUrl,
    dealProductName,
    contentsProductNo,
    contentsProductName,
    displayPrice,
    displayDiscountPrice,
    quantity,
    isGiveawayProduct,
  } = dealProduct;

  const productUrl = webview
    ? `${deepLinkUrl.PRODUCT}${contentsProductNo}`
    : `${getPageUrl(PRODUCT_PATH.detail)}/${contentsProductNo}`;

  const showContentsProductName = dealProductName !== contentsProductName;
  const showOriginalPrice = displayDiscountPrice !== 0;
  const showPartnerName = deliveryPolicy !== '샛별배송' && deliveryPolicy !== '하루배송';

  const originalPrice = addComma(quantity * displayPrice);
  const discountedPrice = addComma(quantity * (displayPrice - displayDiscountPrice));

  const LinkToProductDetail = useCallback(
    ({ children }: PropsWithChildrenOnly) => {
      return (
        <Link href={productUrl} passHref as={getReplaceUrl(productUrl)} prefetch={false}>
          <a href={productUrl}>{children}</a>
        </Link>
      );
    },
    [productUrl],
  );

  return (
    <Row disabled={isGiveawayProduct}>
      <LinkToProductDetail>
        <ProductThumbnail imageUrl={imageUrl} dealProductName={dealProductName} />
      </LinkToProductDetail>
      <Box>
        <DeliveryWrapper>
          <ColorTypography variant="$mediumRegular" fontColor={vars.color.text.$tertiary}>
            {deliveryPolicy}
            {showPartnerName && (
              <span>
                <Dot />
                {partnerName}
              </span>
            )}
          </ColorTypography>
        </DeliveryWrapper>
        <LinkToProductDetail>
          <DealProductName variant="$xlargeRegular" isOrderDetailPage={isOrderDetailPage}>
            {dealProductName}
          </DealProductName>
          {showContentsProductName && (
            <ContentProductName variant="$largeRegular">{contentsProductName}</ContentProductName>
          )}
        </LinkToProductDetail>
        <PriceWrapper>
          <ColorTypography variant="$xlargeBold" fontColor={vars.color.text.$primary}>
            {discountedPrice}원
          </ColorTypography>
          {showOriginalPrice && <OriginPrice>{originalPrice}원</OriginPrice>}
          <Divider width="1px" height="10px" margin={`0 ${vars.spacing.$6}`} />
          <ColorTypography
            variant="$xlargeRegular"
            fontColor={vars.color.text.$secondary}
          >{`${quantity}개`}</ColorTypography>
        </PriceWrapper>
      </Box>
    </Row>
  );
};

export default ProductItem;
