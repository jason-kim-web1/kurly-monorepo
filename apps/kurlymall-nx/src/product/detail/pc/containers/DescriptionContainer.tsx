import styled from '@emotion/styled';

import { useInView } from 'react-intersection-observer';

import { useEffect } from 'react';

import { AcceptedProduct } from '../../types';

import InformationContents from '../components/description/InformationContents';

import ProductNotice from '../components/description/product-notice/ProductNotice';
import SellerNotice from '../components/description/product-notice/SellerNotice';
import WhyKurly from '../components/description/WhyKurly';
import HappyCenter from '../components/description/HappyCenter';
import Faq from '../components/description/faq/Faq';
import DeliveryNotice from '../components/description/DeliveryNotice';
import ProductReviewContainer from '../../../board/review/pc/ProductReviewContainer';
import ProductInquiryBoardContainer from '../../../board/inquiry/pc/ProductInquiryBoardContainer';
import EventBanner from '../components/description/EventBanner';
import ProductDetailImage from '../components/description/ProductDetailImage';
import GiftDeliveryNotice from '../../shared/GiftDeliveryNotice';
import PartnersContents from '../../shared/PartnersContents';
import { hasGiveawayContentsBox, validateGiveawayContentsBox } from '../../shared/utils/validateGiveawayContentsBox';
import { GiveawayContentsBox } from '../components/description/GiveawayContentsBox';

const Container = styled.div``;

const ContentsWrapper = styled.div`
  position: relative;
  width: 1010px;
  padding-bottom: 100px;

  :first-of-type {
    padding-top: 40px;
  }
`;

interface Props {
  product: AcceptedProduct;
  handleInView(show: boolean): void;
}

export default function DescriptionContainer({ product, handleInView }: Props) {
  const { ref, inView } = useInView({ threshold: 0.01 });

  const {
    no,
    name,
    mainImageUrl,
    productNotice,
    sellerNotice,
    isGiftable,
    isThirdPart,
    productDetail: { partnersContent, legacyContent, legacyPiImages, legacyEventBanner, giveawayContentsBox },
    isInquiryWritable,
    isReviewWritable,
  } = product;

  const renderGiveawayContentsBox = () => {
    if (!hasGiveawayContentsBox(giveawayContentsBox)) {
      return legacyEventBanner ? <EventBanner eventBanner={legacyEventBanner} /> : null;
    }

    if (validateGiveawayContentsBox(giveawayContentsBox)) {
      return <GiveawayContentsBox giveawayContentsBox={giveawayContentsBox} />;
    }

    return null;
  };

  useEffect(() => {
    handleInView(inView);
  }, [handleInView, inView]);

  return (
    <Container ref={ref}>
      <ContentsWrapper id="description">
        {isGiftable && <GiftDeliveryNotice />}
        {renderGiveawayContentsBox()}
        <InformationContents legacyContent={legacyContent ?? ''} />
        <PartnersContents partnersContent={partnersContent} blockType="BODY" />
      </ContentsWrapper>
      <ContentsWrapper id="detail">
        <PartnersContents partnersContent={partnersContent} blockType="PRODUCT_IMAGE" />
        <ProductDetailImage detailImages={legacyPiImages} />
        <ProductNotice productNotice={productNotice} />
        <SellerNotice sellerNotice={sellerNotice} isThirdPart={isThirdPart} />
        <WhyKurly />
        <HappyCenter />
        <Faq />
        <DeliveryNotice />
      </ContentsWrapper>
      {isReviewWritable && (
        <ContentsWrapper id="review">
          <ProductReviewContainer contentsProductNo={no} />
        </ContentsWrapper>
      )}
      {isInquiryWritable && (
        <ContentsWrapper id="inquiry">
          <ProductInquiryBoardContainer no={no} name={name} mainImageUrl={mainImageUrl} />
        </ContentsWrapper>
      )}
    </Container>
  );
}
