import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { StorageType } from '../../../../src/shared/enums';
import { ProductInfoDictionaryItem } from '../../../../src/product/detail/types';
import { ProductDetailContentData } from '../../../../src/shared/api';

import { productDeliveryInfo } from '../../../../src/product/detail/shared/utils/productDeliveryInfo';

import ProductInfoList from '../../../../src/product/detail/m/components/ATF/ProductInfoList/ProductInfoList';
import ZoomImageList from '../../../../src/product/detail/m/components/detail-information/zoom-image/ZoomImageList';
import DetailDescription from '../../../../src/product/detail/m/components/description/DetailDescription';
import WhyKurly from '../../../../src/product/detail/m/components/description/WhyKurly';
import EventBanner from '../../../../src/product/detail/m/components/description/EventBanner';
import {
  getParsedPartnersContent,
  getPurifiedProductDetailContents,
} from '../../../../src/product/service/product.service';
import appService from '../../../../src/shared/services/app.service';
import { isAos } from '../../../../util/window/getDevice';
import GiftDeliveryNotice from '../../../../src/product/detail/shared/GiftDeliveryNotice';
import {
  getShallowObjectToStringWithNewLine,
  joinByNewLine,
} from '../../../../src/shared/utils/valueToStringWithNewLine';
import { useConditionalInterval } from '../../../../src/shared/hooks/useConditionalInterval';
import type { DeliveryInfoName, DeliveryInfoType } from '../../../../src/product/types';

export interface ProductInfoData {
  afterSaleServiceInfo: {
    contact_number: string;
    information: string;
  };
  soldOutText: string;
  todayBrix: string | null;
  guides: string[];
  notSalesText: string;
  salesUnit: string | null;
  volume: string | null;
  storageTypes: StorageType[];
  deliveryTypeInfos: DeliveryInfoType[];
  deliveryTypeNames: DeliveryInfoName[];
  productOrigin: string | null;
  allergy: string | null;
  expirationDate: string | null;
  extraInfos: {
    title: string;
    description: string;
  }[];
  isOnlyAdult: boolean;
  contentHtmlData: string;
  legacyPiImages: string[];
  legacyEventBanner: string | null;
  content: ProductDetailContentData[];
  isGiftable: boolean;
}

declare global {
  interface Window {
    productInfoData?: string;
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default function ProductDescriptionPage() {
  const [productInfo, setProductInfo] = useState<ProductInfoData>();

  useEffect(() => {
    if (isAos) {
      const data = appService.loadProductDetailDescription();
      setProductInfo(JSON.parse(data));
      return;
    }
  }, []);

  useConditionalInterval(
    () => {
      const { productInfoData } = window;
      if (!productInfoData) {
        return;
      }

      if (!productInfo) {
        setProductInfo(JSON.parse(productInfoData));
      }
    },
    100,
    !!(isAos || productInfo),
  );

  if (!productInfo) {
    return <Container />;
  }

  const {
    afterSaleServiceInfo,
    soldOutText,
    todayBrix,
    guides,
    notSalesText,
    salesUnit,
    volume,
    storageTypes,
    deliveryTypeInfos,
    allergy,
    expirationDate,
    extraInfos,
    isOnlyAdult,
    contentHtmlData,
    legacyPiImages,
    legacyEventBanner,
    content,
    isGiftable,
  } = productInfo;

  const { isDelivery } = productDeliveryInfo(deliveryTypeInfos);

  return (
    <Container>
      <ProductInfoList
        isDelivery={isDelivery}
        salesUnit={salesUnit}
        volume={volume}
        todayBrix={todayBrix}
        productOrigin={null}
        storageTypes={storageTypes}
        allergy={allergy}
        expirationDate={expirationDate}
        soldOutText={soldOutText}
        extraInfos={extraInfos as ProductInfoDictionaryItem[]}
        guide={joinByNewLine(guides)}
        notSalesText={notSalesText}
        afterSaleServiceInfo={getShallowObjectToStringWithNewLine(afterSaleServiceInfo)}
        isOnlyAdult={isOnlyAdult}
      />
      {isGiftable && <GiftDeliveryNotice />}
      {legacyEventBanner && <EventBanner eventBanner={legacyEventBanner} />}
      <DetailDescription
        legacyContent={getPurifiedProductDetailContents(decodeURIComponent(contentHtmlData))}
        partnersContent={getParsedPartnersContent(content)}
      />
      <ZoomImageList detailImages={legacyPiImages} />
      <WhyKurly />
    </Container>
  );
}
