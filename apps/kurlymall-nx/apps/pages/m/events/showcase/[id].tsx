import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { eq, get } from 'lodash';

import type { ShowcasePageProps } from '../../../../src/events/showcase/types/reponse';
import { ContentContainer } from '../../../../src/events/showcase/components/productContent/ContentContainer';
import { ProductListSlide } from '../../../../src/events/showcase/components/ProductListSlide';
import { KURLY_URL } from '../../../../src/shared/configs/config';
import { amplitudeService } from '../../../../src/shared/amplitude';
import { ViewEventDetail } from '../../../../src/shared/amplitude/events/event/ViewEventDetail';
import { isWebview } from '../../../../util/window/getDevice';
import deepLinkUrl from '../../../../src/shared/constant/deepLink';
import { ShowcaseContainer } from '../../../../src/events/showcase/components/ShowcaseContainer';
import { useShowcaseProductList } from '../../../../src/events/showcase/hooks/useShowcaseProductList';
import { isNotEmpty } from '../../../../src/shared/utils/lodash-extends';

export default function ShowCasePage(props: ShowcasePageProps) {
  const { accessToken, data, meta } = props;
  const { asPath, push } = useRouter();
  const collectionSetCode = get(data, 'collectionSetCode', '0');
  const showcaseProductList = get(data, 'productList', []);

  const { integratedProductList, collectionProductList } = useShowcaseProductList({
    accessToken,
    collectionSetCode,
    showcaseProductList,
    enabled: !!accessToken && isNotEmpty(showcaseProductList) && !eq(collectionSetCode, '0'),
  });

  useEffect(() => {
    amplitudeService.logEvent(new ViewEventDetail({ url: `${KURLY_URL}${asPath}` }));
  }, [asPath]);

  useEffect(() => {
    if (!!data) {
      return;
    }

    if (isWebview()) {
      location.href = `${deepLinkUrl.HOME}`;
      return;
    }

    void push('/main');
  }, [data, push]);

  if (!data) {
    return null;
  }

  const { INTRO_A, INTRO_B, productSlide } = data;
  const { type } = meta;

  return (
    <ShowcaseContainer introAData={INTRO_A} introBData={INTRO_B} meta={meta}>
      <ContentContainer productList={integratedProductList} type={type} />
      <ProductListSlide productList={collectionProductList} productSlide={productSlide} type={type} />
    </ShowcaseContainer>
  );
}

export { getServerSideProps } from '../../../../src/events/showcase/utils/getServerSideProps';
