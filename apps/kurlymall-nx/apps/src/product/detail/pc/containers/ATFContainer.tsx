import styled from '@emotion/styled';
import { eq } from 'lodash';

import { useEffect } from 'react';

import { useInView } from 'react-intersection-observer';

import { useAppSelector } from '../../../../shared/store';
import { productDeliveryInfo } from '../../shared/utils/productDeliveryInfo';
import type { AcceptedProduct } from '../../types';
import Name from '../components/ATF/Name';
import Price from '../components/ATF/Price';
import ExtraBenefit from '../components/ATF/ExtraBenefit';
import ProductCouponBanner from '../../shared/coupon/ProductCouponBanner';
import ProductInfoList from '../components/ATF/ProductInfoList';
import MemberCouponGuide from '../components/ATF/MemberCouponGuide';
import ProductOption from '../components/ATF/option-section/ProductOption';
import AdultInformation from '../components/description/AdultInformation';
import ProductBuyPrice from '../components/ProductBuy/ProductBuyPrice';
import ProductBuyButtonGroup from '../components/ProductBuy/ProductBuyButtonGroup';
import COLOR from '../../../../shared/constant/colorset';
import { PROMOTION_TYPE } from '../../../../order/cart/constants/PromotionType';
import { isNotEmpty } from '../../../../shared/utils/lodash-extends';
import { ProductImage } from '../../../../shared/components/ProductImage';
import { ProductImageType } from '../../../../shared/components/ProductImage/constants';
import { amplitudeService, ScreenName } from '../../../../shared/amplitude';

const Container = styled.main`
  display: flex;
  justify-content: space-between;
`;

const ProductMainImageWrap = styled.div`
  width: 430px;
`;

const ATFInfoWrapper = styled.section`
  width: 560px;
`;

const ProductOrigin = styled.p`
  color: ${COLOR.kurlyGray800};
  font-size: 24px;
  letter-spacing: -0.5px;
  margin-top: 8px;
`;

const ProductBuyWrapper = styled.div`
  padding-bottom: 40px;
`;

const ProductBuyPriceWrapper = styled.div`
  padding-top: 30px;
`;

interface Props {
  product: AcceptedProduct;
}

export default function ATFContainer({ product }: Props) {
  const couponBanner = useAppSelector(({ productDetail }) => productDetail.couponBanner);
  const { ref: view, inView } = useInView();
  const {
    isOnlyAdult,
    productVerticalLargeUrl,
    name,
    shortDescription,
    sellerName,
    legacyPromotion,
    showablePrices,
    showablePricesInToolTip,
    discountRate,
    isMultiplePrice,
    notSalesText,
    afterSaleServiceInfo,
    salesUnit,
    volume,
    deliveryTypeInfos,
    productOrigin,
    todayBrix,
    soldOutText,
    storageTypes,
    allergy,
    expirationDate,
    extraInfos,
    guide,
    memberCoupon: { newbieLimitDatetime, newbieMinPrice },
    stickers_v2,
    pointBanner,
  } = product;
  const { deliveryName, deliveryGuide, isDelivery } = productDeliveryInfo(deliveryTypeInfos);

  useEffect(() => {
    if (!inView) {
      return;
    }
    amplitudeService.setScreenName(ScreenName.PRODUCT_DETAIL_DESCRIPTION);
  }, [inView]);

  return (
    <Container id="product-atf" ref={view}>
      <ProductMainImageWrap>
        <ProductImage
          src={productVerticalLargeUrl}
          type={ProductImageType.PRODUCT_DETAIL}
          stickerList={stickers_v2}
          alt={name || '메인 상품 이미지'}
        />
      </ProductMainImageWrap>
      <ATFInfoWrapper>
        <Name deliveryTypeName={deliveryName} name={name} shortDescription={shortDescription} />
        <Price
          showablePrices={showablePrices}
          showablePricesInToolTip={showablePricesInToolTip}
          discountRate={discountRate}
          isMultiplePrice={isMultiplePrice}
        />
        {isNotEmpty(productOrigin) ? <ProductOrigin>원산지: {productOrigin}</ProductOrigin> : null}
        {eq(legacyPromotion, PROMOTION_TYPE.NEWBIE) && newbieLimitDatetime && (
          <MemberCouponGuide newbieLimitDatetime={newbieLimitDatetime} newbieMinPrice={newbieMinPrice} />
        )}
        <ExtraBenefit pointBanner={pointBanner} />
        {couponBanner && (
          <ProductCouponBanner
            type={couponBanner.type}
            bannerName={couponBanner.bannerName}
            bannerLink={couponBanner.bannerLink}
            couponAccessKey={couponBanner.accessKey}
            extraInfo={couponBanner.extraInfo}
          />
        )}
        <ProductInfoList
          deliveryName={deliveryName}
          deliveryGuide={deliveryGuide as string}
          isDelivery={isDelivery}
          salesUnit={salesUnit}
          volume={volume}
          todayBrix={todayBrix}
          sellerName={sellerName}
          storageTypes={storageTypes}
          allergy={allergy}
          expirationDate={expirationDate}
          soldOutText={soldOutText}
          extraInfos={extraInfos}
          guide={guide}
          notSalesText={notSalesText}
          afterSaleServiceInfo={afterSaleServiceInfo}
        />
        <ProductBuyWrapper>
          <ProductOption />
          {isOnlyAdult && <AdultInformation />}
          <ProductBuyPriceWrapper>
            <ProductBuyPrice />
          </ProductBuyPriceWrapper>
          <ProductBuyButtonGroup />
        </ProductBuyWrapper>
      </ATFInfoWrapper>
    </Container>
  );
}
