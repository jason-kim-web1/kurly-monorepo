import { useRouter } from 'next/router';
import { head, isArray, isUndefined, values, eq } from 'lodash';

import useProductDetailPage from '../../../../src/product/detail/hooks/useProductDetailPage';

import PageMetaData from '../../../../src/shared/components/PageMeta/PageMetaData';
import ProductDetailContainer from '../../../../src/product/detail/m/containers/ProductDetailContainer';
import ProductDetailHeaderContainer from '../../../../src/product/detail/m/containers/ProductDetailHeaderContainer';
import { ProductDetailContentType } from '../../../../src/product/detail/types';

import BuyFooterContainer from '../../../../src/product/detail/m/containers/BuyFooterContainer';
import Navigator from '../../../../src/product/detail/m/components/navigator/Navigator';
import { useScreenName } from '../../../../src/shared/hooks';
import { ScreenName } from '../../../../src/shared/amplitude';
import { DEFAULT_KEYWORDS } from '../../../../src/shared/constant/page-meta';
import MainSiteProvider from '../../../../src/main/components/shared/MainSiteProvider';
import {
  getProductDetailServerSideProductProps,
  ProductDetailServerSidePropsResult,
} from '../../../../src/product/detail/shared/utils/getProductDetailServerSideProps';
import { JoinOrderDialog } from '../../../../src/product/detail/m/components/JoinOrderDialog';
import { getJoinCodeQueryParam } from '../../../../src/product/detail/shared/utils/url';
import { useProductReferer } from '../../../../src/product/detail/hooks/useProductReferer';

const checkValidTabContent = (tabContent: string) =>
  values(ProductDetailContentType).some((value) => eq(tabContent, value));

const getSanitizedTabValue = (tab: string | string[] | undefined): ProductDetailContentType => {
  if (isUndefined(tab)) {
    return ProductDetailContentType.DESCRIPTION;
  }
  if (isArray(tab)) {
    const firstValue = head(tab);
    return getSanitizedTabValue(firstValue);
  }
  if (checkValidTabContent(tab)) {
    return tab as ProductDetailContentType;
  }
  return ProductDetailContentType.DESCRIPTION;
};

export default function ProductPage({ product, adultVerificationFailed, error }: ProductDetailServerSidePropsResult) {
  useScreenName(ScreenName.PRODUCT_DETAIL_DESCRIPTION);
  useProductDetailPage({
    product,
    adultVerificationFailed,
    error,
  });
  const { refererProductNo, refererProductName } = useProductReferer();
  const {
    query: { tab, joinCode },
  } = useRouter();
  const tabContent = getSanitizedTabValue(tab);

  if (!product || adultVerificationFailed) {
    return null;
  }

  const {
    no,
    name,
    shortDescription,
    productHorizontalLargeUrl,
    reviewCount,
    isReviewWritable,
    isInquiryWritable,
    isJoinOrder,
  } = product;
  const joinOrderCode = getJoinCodeQueryParam(joinCode);

  return (
    <>
      <PageMetaData
        title={name}
        description={shortDescription}
        image={productHorizontalLargeUrl}
        url={`/goods/${no}`}
        keyword={DEFAULT_KEYWORDS}
      />
      <MainSiteProvider>
        <ProductDetailHeaderContainer>
          <Navigator
            reviewCount={reviewCount}
            selectedContent={tabContent}
            isReviewWritable={isReviewWritable}
            isInquiryWritable={isInquiryWritable}
          />
        </ProductDetailHeaderContainer>
      </MainSiteProvider>
      <ProductDetailContainer product={product} selectedContent={tabContent} />
      <BuyFooterContainer refererProductNo={refererProductNo} refererProductName={refererProductName} />
      {isJoinOrder ? <JoinOrderDialog productNo={no} joinOrderCode={joinOrderCode} /> : null}
    </>
  );
}

export const getServerSideProps = getProductDetailServerSideProductProps;
