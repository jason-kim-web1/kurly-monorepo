import styled from '@emotion/styled';
import type { InferGetServerSidePropsType } from 'next';

import { productDeliveryInfo } from '../../../../../src/product/detail/shared/utils/productDeliveryInfo';

import ProductInfoList from '../../../../../src/product/detail/m/components/ATF/ProductInfoList/ProductInfoList';
import ZoomImageList from '../../../../../src/product/detail/m/components/detail-information/zoom-image/ZoomImageList';
import DetailDescription from '../../../../../src/product/detail/m/components/description/DetailDescription';
import WhyKurly from '../../../../../src/product/detail/m/components/description/WhyKurly';
import EventBanner from '../../../../../src/product/detail/m/components/description/EventBanner';
import GiftDeliveryNotice from '../../../../../src/product/detail/shared/GiftDeliveryNotice';

import { getWebviewProductDetailServerSideProps } from '../../../../../src/product/detail/shared/utils/getWebviewProductDetailServerSideProps';
import { GiveawayContentsBox } from '../../../../../src/product/detail/m/components/description/GiveawayContentsBox';
import {
  hasGiveawayContentsBox,
  validateGiveawayContentsBox,
} from '../../../../../src/product/detail/shared/utils/validateGiveawayContentsBox';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default function ProductDescriptionPage({ product }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!product) {
    return <Container />;
  }

  const {
    afterSaleServiceInfo,
    soldOutText,
    todayBrix,
    guide,
    notSalesText,
    salesUnit,
    volume,
    storageTypes,
    deliveryTypeInfos,
    allergy,
    expirationDate,
    extraInfos,
    isOnlyAdult,
    isGiftable,
    productDetail: { partnersContent, legacyPiImages, legacyEventBanner, giveawayContentsBox, legacyContent },
  } = product;

  const { isDelivery } = productDeliveryInfo(deliveryTypeInfos);

  const renderGiveawayContentsBox = () => {
    if (!hasGiveawayContentsBox(giveawayContentsBox)) {
      return legacyEventBanner ? <EventBanner eventBanner={legacyEventBanner} /> : null;
    }

    if (validateGiveawayContentsBox(giveawayContentsBox)) {
      return <GiveawayContentsBox giveawayContentsBox={giveawayContentsBox} />;
    }

    return null;
  };

  return (
    <Container>
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
      {isGiftable ? <GiftDeliveryNotice /> : null}
      {renderGiveawayContentsBox()}
      <DetailDescription legacyContent={legacyContent || ''} partnersContent={partnersContent} />
      <ZoomImageList detailImages={legacyPiImages} />
      <WhyKurly />
    </Container>
  );
}

export const getServerSideProps = getWebviewProductDetailServerSideProps;
