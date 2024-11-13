import { css } from '@emotion/react';

import rgbDataUrl from '../../../../../shared/utils/image/rgbDataUrl';
import SkeletonLoading from '../../../../../shared/components/Loading/SkeletonLoading';
import NextImage from '../../../../../shared/components/NextImage';
import { NoImage } from '../../../../../shared/images';
import ReviewGuideBanner from '../../shared/ReviewWriteGuideBanner';

import { useReviewProduct } from '../../../hooks';
import { AboutProduct, ContentsProductName, DealProductName, ProductNameWrapper } from './styled-components';

const productImageCSS = css`
  flex-shrink: 0;
  border-radius: 6px;
  object-fit: cover;
`;

const LoadingFallback = () => (
  <AboutProduct>
    <SkeletonLoading width={72} height={72} radius={6} />
    <ProductNameWrapper>
      <SkeletonLoading width={350} height={20} />
      <SkeletonLoading width={320} height={19} />
    </ProductNameWrapper>
  </AboutProduct>
);

interface Props {
  contentsProductNo: number;
  dealProductNo: number;
  isModification?: boolean;
}

export default function ReviewModalProductContent({ contentsProductNo, dealProductNo, isModification = false }: Props) {
  const { data, isLoading, isSuccess } = useReviewProduct(contentsProductNo, dealProductNo);

  if (isLoading) {
    return <LoadingFallback />;
  }

  return isSuccess && !!data ? (
    <>
      {!isModification ? <ReviewGuideBanner dealProductNo={data.dealProductNo} /> : null}
      <AboutProduct>
        <NextImage
          css={productImageCSS}
          src={data.productImageUrl ?? NoImage}
          alt={data.dealProductName}
          width={72}
          height={72}
          placeholder="blur"
          blurDataURL={rgbDataUrl(224, 224, 224)}
        />
        <ProductNameWrapper>
          <DealProductName>{data.dealProductName}</DealProductName>
          {data.dealProductName !== data.contentsProductName ? (
            <ContentsProductName>{data.contentsProductName}</ContentsProductName>
          ) : null}
        </ProductNameWrapper>
      </AboutProduct>
    </>
  ) : null;
}
