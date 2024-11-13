import { useEffect, useState } from 'react';

import { isEmpty } from 'lodash';

import { ProductDetailContentData } from '../../../../src/shared/api';

import ProductNotice from '../../../../src/product/detail/m/components/detail-information/product-notice/ProductNotice';
import ZoomImageList from '../../../../src/product/detail/m/components/detail-information/zoom-image/ZoomImageList';
import HappyCenter from '../../../../src/product/detail/m/components/detail-information/happy-center/HappyCenter';
import OrderCancellationGuide from '../../../../src/product/detail/m/components/detail-information/OrderCancellationGuide';
import DeliveryNotice from '../../../../src/product/detail/m/components/detail-information/DeliveryNotice';
import { getParsedPartnersContent } from '../../../../src/product/service/product.service';
import { isAos } from '../../../../util/window/getDevice';
import appService from '../../../../src/shared/services/app.service';
import useLoadKakao from '../../../../src/shared/hooks/useLoadKakao';
import SellerNotice from '../../../../src/product/detail/m/components/detail-information/product-notice/SellerNotice';
import type { ProductInfoDictionaryItem, ProductReturnInfo } from '../../../../src/product/detail/types';
import PartnersContents from '../../../../src/product/detail/shared/PartnersContents';
import { useConditionalInterval } from '../../../../src/shared/hooks/useConditionalInterval';
import { DeliveryInfoType } from '../../../../src/product/types';

declare global {
  interface Window {
    productNoticeData?: string;
  }
}

interface NoticeData {
  legacyPiImages: string[];
  productNotice: {
    dealProductNo: number;
    dealProductName: string;
    notices: ProductInfoDictionaryItem[];
  }[];
  content: ProductDetailContentData[];
  sellerProfile: ProductInfoDictionaryItem[];
  isThirdPart: boolean;
  deliveryTypeInfos: DeliveryInfoType[];
  returnInfo: ProductReturnInfo;
}

export default function ProductDetailPage() {
  useLoadKakao();

  const [noticeData, setNoticeData] = useState<NoticeData>();

  useEffect(() => {
    if (isAos) {
      const data = appService.loadProductDetailInformation();
      setNoticeData(JSON.parse(data));
      return;
    }
  }, []);

  useConditionalInterval(
    () => {
      const { productNoticeData } = window;
      if (!productNoticeData) {
        return;
      }

      if (!noticeData) {
        setNoticeData(JSON.parse(productNoticeData));
      }
    },
    100,
    !!(isAos || noticeData),
  );

  if (!noticeData) {
    return null;
  }

  const { productNotice, legacyPiImages, content, sellerProfile, isThirdPart, deliveryTypeInfos, returnInfo } =
    noticeData;

  const partnersContents = getParsedPartnersContent(content);

  return (
    <>
      {!isEmpty(legacyPiImages) ? <ZoomImageList detailImages={legacyPiImages} /> : null}
      {!isEmpty(partnersContents) ? (
        <PartnersContents partnersContent={partnersContents} blockType="PRODUCT_IMAGE" isPC={false} />
      ) : null}
      <ProductNotice productNotice={productNotice} />
      <SellerNotice sellerNotice={sellerProfile} isThirdPart={isThirdPart} />
      <HappyCenter isThirdPart={isThirdPart} deliveryTypeInfos={deliveryTypeInfos} returnInfo={returnInfo} />
      <OrderCancellationGuide />
      <DeliveryNotice />
    </>
  );
}
