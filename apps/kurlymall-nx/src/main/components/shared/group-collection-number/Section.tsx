import { useCallback, useEffect, useState } from 'react';
import { chain, head, isEmpty, isUndefined } from 'lodash';
import styled from '@emotion/styled';

import type { MainGroupCollectionNumberSection } from '../../../interfaces/MainSection.interface';
import { useAppSelector } from '../../../../shared/store';
import useSectionEvent from '../../../hooks/useSectionEvent';
import { useGroupCollectionNumberProduct } from '../../../hooks/useGroupCollectionNumberProduct';
import { ChipMenuCollections } from '../../m/group-collection-number/ChipMenuCollections';
import { createMainSkeletonPC } from '../../pc/shared/skeleton/CreateMainSkeleton';
import { createMainSkeleton as createMainSkeletonMobile } from '../../m/shared/skeleton/CreateMainSkeleton';
import { isPC } from '../../../../../util/window/getDevice';
import SectionContentsPC from '../../pc/shared/SectionContents';
import SectionContentsMobile from '../../m/shared/SectionContents';
import { CollectionList } from '../../pc/group-collection-number/CollectionList';
import { ProductList as ProductListPC } from '../../pc/group-collection-number/ProductList';
import { ProductList as ProductListMobile } from '../../m/group-collection-number/ProductList';
import { amplitudeService } from '../../../../shared/amplitude';
import { SelectSectionCollectionSubtab } from '../../../../shared/amplitude/events/main/SelectSectionCollectionSubtab';
import { SectionTitle } from '../NumberSectionTitle';
import { EmptyProduct } from './EmptyProduct';
import { CollectionListSkeleton } from './skeleton/CollectionListSkeleton';
import { ProductListSkeleton } from './skeleton/ProductListSkeleton';
import { ButtonSkeleton } from './skeleton/ButtonSkeleton';
import { createCollectionGroupsUrl } from '../../../util/mainSiteUtil';

const Container = styled(isPC ? SectionContentsPC : SectionContentsMobile)`
  ${isPC ?? 'padding-bottom: 8px;'}
`;

interface Props {
  section: MainGroupCollectionNumberSection;
  measure?(): void;
}

export default function Section({ section, measure }: Props) {
  const site = useAppSelector(({ main }) => main.site);
  const [selectedCollection, setSelectedCollection] = useState<{ code: string; name: string }>({ code: '', name: '' });
  const [sectionId, setSectionId] = useState<number>(0);

  const { payload, id, type } = section;

  const { onSelectProduct, onSelectMore } = useSectionEvent(section);
  const { data: products, isFetching } = useGroupCollectionNumberProduct(
    site,
    sectionId,
    selectedCollection.code,
    sectionId > 0 && !!selectedCollection.code,
  );
  const loadingLayer = isPC ? createMainSkeletonPC(type) : createMainSkeletonMobile(type);
  const isValidCollections = !isUndefined(payload?.collections) && !isEmpty(payload?.collections);

  useEffect(() => {
    if (measure) {
      measure();
    }
  }, [isFetching, measure]);

  const onClickCollection = useCallback(
    (code: string, name: string) => () => {
      setSelectedCollection({ code, name });

      amplitudeService.logEvent(
        new SelectSectionCollectionSubtab({
          collectionId: selectedCollection.code,
          sectionId: id,
          title: payload?.title,
        }),
      );
    },
    [id, payload, selectedCollection.code],
  );

  useEffect(() => {
    if (!payload) {
      return;
    }

    if (!isValidCollections) {
      return;
    }

    const headCollection = head(payload?.collections);
    if (!headCollection) {
      return;
    }

    setSectionId(id);
    setSelectedCollection({ code: headCollection.code, name: headCollection.name });
  }, [isValidCollections, payload, id]);

  if (!payload) {
    return <Container section={section} loadingLayer={loadingLayer} />;
  }

  if (!isValidCollections) {
    return null;
  }

  const { collectionGroupCode, collections, title, subtitle, landingUrl: initialLandingUrl } = payload;

  const chunkProductList = chain(products).chunk(3).value();
  const landingUrl = createCollectionGroupsUrl(site, collectionGroupCode, selectedCollection.code) || initialLandingUrl;

  const renderCollectionList = () => {
    if (!selectedCollection) {
      return <CollectionListSkeleton />;
    }

    return isPC ? (
      <CollectionList
        collections={collections}
        selectedCollection={selectedCollection}
        onClickCollection={onClickCollection}
      />
    ) : (
      <ChipMenuCollections
        collections={collections}
        selectedCollection={selectedCollection}
        onClickCollection={onClickCollection}
      />
    );
  };

  const renderProductList = () => {
    if (isFetching) {
      return (
        <>
          <ProductListSkeleton />
          <ButtonSkeleton />
        </>
      );
    }

    if (isEmpty(products)) {
      return <EmptyProduct />;
    }

    return isPC ? (
      <ProductListPC
        chunkProductList={chunkProductList}
        onSelectProduct={onSelectProduct}
        onSelectMore={onSelectMore}
        selectedCollection={selectedCollection}
        landingUrl={landingUrl}
      />
    ) : (
      <ProductListMobile
        chunkProductList={chunkProductList}
        onSelectProduct={onSelectProduct}
        onSelectMore={onSelectMore}
        selectedCollection={selectedCollection}
        landingUrl={landingUrl}
      />
    );
  };

  return (
    <Container section={section} loadingLayer={loadingLayer}>
      <SectionTitle title={title} subtitle={subtitle} type={type as 'GROUP_COLLECTION_PRODUCT_NUMBER'} />
      {renderCollectionList()}
      {renderProductList()}
    </Container>
  );
}
