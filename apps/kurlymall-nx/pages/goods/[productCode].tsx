import { useRouter } from 'next/router';
import { get } from 'lodash';

import useProductDetailPage from '../../src/product/detail/hooks/useProductDetailPage';

import PageMetaData from '../../src/shared/components/PageMeta/PageMetaData';

import MainSiteProvider from '../../src/main/components/shared/MainSiteProvider';
import ProductDetailContainer from '../../src/product/detail/pc/containers/ProductDetailContainer';
import { useScreenName } from '../../src/shared/hooks';
import { ScreenName } from '../../src/shared/amplitude';
import Header from '../../src/header/components/Header';
import { DEFAULT_KEYWORDS } from '../../src/shared/constant/page-meta';
import {
  getProductDetailServerSideProductProps,
  ProductDetailServerSidePropsResult,
} from '../../src/product/detail/shared/utils/getProductDetailServerSideProps';
import { getJoinCodeQueryParam } from '../../src/product/detail/shared/utils/url';
import { useNotifyJoinOrder } from '../../src/product/detail/hooks/useNotifyJoinOrder';

export default function ProductPage({ product, adultVerificationFailed, error }: ProductDetailServerSidePropsResult) {
  const {
    query: { joinCode },
  } = useRouter();
  const joinOrderCode = getJoinCodeQueryParam(joinCode);
  useScreenName(ScreenName.PRODUCT_DETAIL_DESCRIPTION);
  useProductDetailPage({
    product,
    adultVerificationFailed,
    error,
  });
  useNotifyJoinOrder({
    productNo: get(product, 'no'),
    isJoinOrder: get(product, 'isJoinOrder'),
    joinOrderCode,
  });

  if (!product || adultVerificationFailed) {
    return null;
  }

  const { no, name, shortDescription, productHorizontalLargeUrl } = product;

  return (
    <>
      <PageMetaData
        title={name}
        description={shortDescription}
        image={productHorizontalLargeUrl}
        url={`/goods/${no}`}
        keyword={DEFAULT_KEYWORDS}
      />
      <div id="top">
        <MainSiteProvider>
          <Header />
        </MainSiteProvider>
        <ProductDetailContainer product={product} />
      </div>
    </>
  );
}

export const getServerSideProps = getProductDetailServerSideProductProps;
