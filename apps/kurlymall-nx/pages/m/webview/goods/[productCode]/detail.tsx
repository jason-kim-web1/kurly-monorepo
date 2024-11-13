import type { InferGetServerSidePropsType } from 'next';
import { isEmpty } from 'lodash';

import ProductNotice from '../../../../../src/product/detail/m/components/detail-information/product-notice/ProductNotice';
import ZoomImageList from '../../../../../src/product/detail/m/components/detail-information/zoom-image/ZoomImageList';
import HappyCenter from '../../../../../src/product/detail/m/components/detail-information/happy-center/HappyCenter';
import OrderCancellationGuide from '../../../../../src/product/detail/m/components/detail-information/OrderCancellationGuide';
import DeliveryNotice from '../../../../../src/product/detail/m/components/detail-information/DeliveryNotice';
import useLoadKakao from '../../../../../src/shared/hooks/useLoadKakao';
import SellerNotice from '../../../../../src/product/detail/m/components/detail-information/product-notice/SellerNotice';
import PartnersContents from '../../../../../src/product/detail/shared/PartnersContents';
import { getWebviewProductDetailServerSideProps } from '../../../../../src/product/detail/shared/utils/getWebviewProductDetailServerSideProps';

export default function ProductDetailPage({ product }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useLoadKakao();

  if (!product) {
    return null;
  }

  const {
    productNotice,
    sellerNotice,
    isThirdPart,
    deliveryTypeInfos,
    returnInfo,
    productDetail: { partnersContent, legacyPiImages },
  } = product;

  return (
    <>
      {!isEmpty(legacyPiImages) ? <ZoomImageList detailImages={legacyPiImages} /> : null}
      {!isEmpty(partnersContent) ? (
        <PartnersContents partnersContent={partnersContent} blockType="PRODUCT_IMAGE" isPC={false} />
      ) : null}
      <ProductNotice productNotice={productNotice} />
      <SellerNotice sellerNotice={sellerNotice} isThirdPart={isThirdPart} />
      <HappyCenter isThirdPart={isThirdPart} deliveryTypeInfos={deliveryTypeInfos} returnInfo={returnInfo} />
      <OrderCancellationGuide />
      <DeliveryNotice />
    </>
  );
}

export const getServerSideProps = getWebviewProductDetailServerSideProps;
