import styled from '@emotion/styled';

import { useAppSelector } from '../../../../shared/store';
import { AcceptedProduct } from '../../types';
import Loading from '../../../../shared/components/Loading/Loading';
import Name from '../components/ATF/Name';
import SectionWrapper from '../components/SectionWrapper';
import Price from '../components/ATF/Price';
import UserBenefits from '../components/ATF/UserBenefits';
import ProductSalesPolicy from '../components/ATF/ProductSalesPolicy';
import ProductInfoList from '../components/ATF/ProductInfoList/ProductInfoList';
import OptionSections from '../components/ATF/option-section/OptionSection';
import ProductCouponBanner from '../../shared/coupon/ProductCouponBanner';
import { productDeliveryInfo } from '../../shared/utils/productDeliveryInfo';
import { isNotEmpty } from '../../../../shared/utils/lodash-extends';
import COLOR from '../../../../shared/constant/colorset';
import { ProductImage } from '../../../../shared/components/ProductImage';
import { ProductImageType } from '../../../../shared/components/ProductImage/constants';
import { RecommendSection } from '../../components/RecommendSection';

const MainImageWrap = styled.div`
  width: 100%;
`;

const ATFInfoWrapper = styled.div`
  padding: 24px 16px 20px;
  .coupon-banner-button {
    width: 100%;
    height: 46px;
    border-radius: 6px;
    font-size: 15px;
    letter-spacing: -0.3px;
    line-height: 20px;
  }
`;

const ProductOriginWrapper = styled.p`
  color: ${COLOR.kurlyGray800};
  font-size: 18px;
  line-height: 23px;
  margin-top: 8px;
`;

interface Props {
  product: AcceptedProduct;
}

export default function ATFContainer({ product }: Props) {
  const { loading, couponBanner } = useAppSelector(({ productDetail }) => productDetail);
  const {
    no,
    productVerticalLargeUrl,
    name,
    shortDescription,
    sellerName,
    legacyPromotion,
    memberCoupon,
    discountRate,
    showablePrices,
    showablePricesInToolTip,
    isMultiplePrice,
    afterSaleServiceInfo,
    soldOutText,
    todayBrix,
    guide,
    notSalesText,
    salesUnit,
    volume,
    storageTypes,
    deliveryTypeInfos,
    productOrigin,
    allergy,
    expirationDate,
    extraInfos,
    contentType,
    groupProduct,
    isGroupProduct,
    isOnlyAdult,
    stickers_v2,
    pointBanner,
  } = product;
  const { deliveryName, deliveryGuide, isDelivery } = productDeliveryInfo(deliveryTypeInfos);

  return (
    <>
      <SectionWrapper>
        {loading && <Loading />}
        <MainImageWrap>
          <ProductImage
            src={productVerticalLargeUrl}
            type={ProductImageType.PRODUCT_DETAIL}
            stickerList={stickers_v2}
            alt={name || '상품 메인 이미지'}
          />
        </MainImageWrap>
        <ATFInfoWrapper>
          <Name contentsProductNo={no} deliveryName={deliveryName} name={name} shortDescription={shortDescription} />
          <Price
            discountRate={discountRate}
            showablePrices={showablePrices}
            showablePricesInToolTip={showablePricesInToolTip}
            isMultiplePrice={isMultiplePrice}
            legacyPromotion={legacyPromotion}
            memberCoupon={memberCoupon}
          />
          {isNotEmpty(productOrigin) ? <ProductOriginWrapper>원산지: {productOrigin}</ProductOriginWrapper> : null}
          <UserBenefits pointBanner={pointBanner} />
          {couponBanner && (
            <ProductCouponBanner
              type={couponBanner.type}
              bannerName={couponBanner.bannerName}
              bannerLink={couponBanner.bannerLink}
              couponAccessKey={couponBanner.accessKey}
              extraInfo={couponBanner.extraInfo}
            />
          )}
        </ATFInfoWrapper>
        <ProductSalesPolicy
          deliveryName={deliveryName}
          deliveryGuide={deliveryGuide as string}
          sellerName={sellerName}
        />
      </SectionWrapper>
      {isGroupProduct && <OptionSections productNo={no} groupProduct={groupProduct} contentType={contentType} />}
      <RecommendSection productNo={no} />
      <ProductInfoList
        salesUnit={salesUnit}
        volume={volume}
        todayBrix={todayBrix}
        productOrigin={null}
        storageTypes={storageTypes}
        isDelivery={isDelivery}
        allergy={allergy}
        expirationDate={expirationDate}
        extraInfos={extraInfos}
        guide={guide}
        soldOutText={soldOutText}
        notSalesText={notSalesText}
        afterSaleServiceInfo={afterSaleServiceInfo}
        isOnlyAdult={isOnlyAdult}
      />
    </>
  );
}
