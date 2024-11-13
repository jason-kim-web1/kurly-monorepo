import type { PartnersContent, ProductDetailNotice, ProductInfoDictionaryItem, ProductReturnInfo } from '../../types';

import ZoomImageList from '../components/detail-information/zoom-image/ZoomImageList';
import ProductNotice from '../components/detail-information/product-notice/ProductNotice';
import SellerNotice from '../components/detail-information/product-notice/SellerNotice';
import HappyCenter from '../components/detail-information/happy-center/HappyCenter';
import OrderCancellationGuide from '../components/detail-information/OrderCancellationGuide';
import DeliveryNotice from '../components/detail-information/DeliveryNotice';
import PartnersContents from '../../shared/PartnersContents';
import { DeliveryInfoType } from '../../../types';

interface Props {
  detailImages: string[];
  partnersContent: PartnersContent;
  productNotice: ProductDetailNotice[];
  sellerNotice: ProductInfoDictionaryItem[];
  isThirdPart: boolean;
  deliveryTypeInfos: DeliveryInfoType[];
  returnInfo: ProductReturnInfo;
}

export default function DetailInformationContainer({
  detailImages,
  partnersContent,
  productNotice,
  sellerNotice,
  isThirdPart,
  deliveryTypeInfos,
  returnInfo,
}: Props) {
  return (
    <>
      <ZoomImageList detailImages={detailImages} />
      <PartnersContents partnersContent={partnersContent} blockType="PRODUCT_IMAGE" isPC={false} />
      <ProductNotice productNotice={productNotice} />
      <SellerNotice sellerNotice={sellerNotice} isThirdPart={isThirdPart} />
      <HappyCenter isThirdPart={isThirdPart} deliveryTypeInfos={deliveryTypeInfos} returnInfo={returnInfo} />
      <OrderCancellationGuide />
      <DeliveryNotice />
    </>
  );
}
