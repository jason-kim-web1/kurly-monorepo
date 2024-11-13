import { useEffect } from 'react';

import { useRouter } from 'next/router';

import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';

import { ProductDetailContentType, ProductProps } from '../../types';
import useAcceptedProduct from '../../hooks/useAcceptedProduct';

import ATFContainer from './ATFContainer';
import DescriptionContainer from './DescriptionContainer';
import DetailInformationContainer from './DetailInformationContainer';
import ProductReviewContainer from '../../../board/review/m/ProductReviewContainer';
import InquiryContainer from './InquiryContainer';
import useLoadKakao from '../../../../shared/hooks/useLoadKakao';
import { redirectTo } from '../../../../shared/reducers/page';
import { fusionSignalsService } from '../../../../shared/fusion-signals/FusionSignalsService';

const Container = styled.div`
  padding-top: 42px;

  @supports (padding-bottom: constant(safe-area-inset-bottom)) {
    padding-bottom: calc(constant(safe-area-inset-bottom) + 68px);
  }
  @supports (padding-bottom: env(safe-area-inset-bottom)) {
    padding-bottom: calc(env(safe-area-inset-bottom) + 68px);
  }
`;

interface Props {
  product: ProductProps;
  selectedContent: ProductDetailContentType;
}

export default function ProductDetailContainer({ product, selectedContent }: Props) {
  useLoadKakao();

  const router = useRouter();
  const dispatch = useDispatch();

  const { acceptedProduct } = useAcceptedProduct({ product });

  const {
    no,
    name,
    productNotice,
    sellerNotice,
    isGiftable,
    isThirdPart,
    deliveryTypeInfos,
    returnInfo,
    productDetail: { partnersContent, legacyPiImages, legacyContent, legacyEventBanner, giveawayContentsBox },
  } = acceptedProduct;

  useEffect(() => {
    if (!selectedContent) {
      dispatch(
        redirectTo({
          url: router.pathname,
          query: { ...router.query, tab: ProductDetailContentType.DESCRIPTION },
          replace: true,
        }),
      );
      return;
    }
  }, [router, selectedContent, dispatch]);

  useEffect(() => {
    fusionSignalsService.handleProductDetailEntryEvent();
  }, []);

  return (
    <Container>
      {selectedContent === ProductDetailContentType.DESCRIPTION && (
        <>
          <ATFContainer product={acceptedProduct} />
          <DescriptionContainer
            legacyEventBanner={legacyEventBanner}
            legacyContent={legacyContent || ''}
            partnersContent={partnersContent}
            detailImages={legacyPiImages}
            isGiftable={isGiftable}
            giveawayContentsBox={giveawayContentsBox}
          />
        </>
      )}
      {selectedContent === ProductDetailContentType.DETAIL && (
        <DetailInformationContainer
          detailImages={legacyPiImages}
          partnersContent={partnersContent}
          productNotice={productNotice}
          sellerNotice={sellerNotice}
          isThirdPart={isThirdPart}
          deliveryTypeInfos={deliveryTypeInfos}
          returnInfo={returnInfo}
        />
      )}
      {selectedContent === ProductDetailContentType.REVIEW && <ProductReviewContainer contentsProductNo={no} />}
      {selectedContent === ProductDetailContentType.INQUIRY && <InquiryContainer productNo={no} productName={name} />}
    </Container>
  );
}
