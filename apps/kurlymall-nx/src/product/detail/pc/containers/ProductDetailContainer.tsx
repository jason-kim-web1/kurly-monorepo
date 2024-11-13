import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled';

import ATFContainer from './ATFContainer';
import Navigator from '../components/navigator/Navigator';
import DescriptionContainer from './DescriptionContainer';
import Footer from '../../../../footer/components/Footer';
import { ProductProps } from '../../types';
import useAcceptedProduct from '../../hooks/useAcceptedProduct';
import ProductDetailWrapper from '../components/ProductDetailWrapper';
import Loading from '../../../../shared/components/Loading/Loading';
import { useAppSelector } from '../../../../shared/store';
import { fusionSignalsService } from '../../../../shared/fusion-signals/FusionSignalsService';

const FloatingNavigator = dynamic(() => import('../../../../navigator/components/FloatingNavigator'), { ssr: false });

const ContentWrapper = styled.div`
  position: relative;
  width: 1050px;
  margin: 0 auto;
  padding-top: 30px;
`;

interface Props {
  product: ProductProps;
}

export default function ProductDetailContainer({ product }: Props) {
  const { acceptedProduct } = useAcceptedProduct({ product });
  const { reviewCount, isInquiryWritable, isReviewWritable } = acceptedProduct;
  const loading = useAppSelector(({ productDetail }) => productDetail.loading);
  const [displayFloatingComponent, setDisplayFloatingComponent] = useState(false);

  const handleInView = (show: boolean) => {
    setDisplayFloatingComponent(show);
  };

  useEffect(() => {
    fusionSignalsService.handleProductDetailEntryEvent();
  }, []);

  return (
    <ProductDetailWrapper displayFloatingComponent={displayFloatingComponent}>
      {loading && <Loading />}
      <FloatingNavigator />
      <ContentWrapper>
        <ATFContainer product={acceptedProduct} />
        <Navigator
          reviewCount={reviewCount}
          isInquiryWritable={isInquiryWritable}
          isReviewWritable={isReviewWritable}
        />
        <DescriptionContainer product={acceptedProduct} handleInView={handleInView} />
      </ContentWrapper>
      <Footer />
    </ProductDetailWrapper>
  );
}
