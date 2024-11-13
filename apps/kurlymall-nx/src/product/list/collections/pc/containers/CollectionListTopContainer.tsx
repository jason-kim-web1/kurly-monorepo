import styled from '@emotion/styled';

import { useMemo } from 'react';

import { head } from 'lodash';

import type { PageType } from '../../../types';
import Banner from '../../../pc/components/Banner';
import { useCollection } from '../../hook/useCollection';
import COLOR from '../../../../../shared/constant/colorset';
import useProductList from '../../../hook/useProductList';
import { useCollectionListPageQueryParams } from '../../hook/useCollectionsPageQueryParams';
import { CollectionsVideo } from '../../components/CollectionsVideo';

const PageTitle = styled.h3`
  margin-top: 50px;
  font-weight: 500;
  font-size: 28px;
  color: ${COLOR.kurlyGray800};
  line-height: 35px;
  letter-spacing: -1px;
  text-align: center;
`;

interface Props {
  collectionName: string;
  section: Exclude<PageType, 'search'>;
  defaultSortType: string;
}

export default function CollectionListTopContainer({ collectionName, section, defaultSortType }: Props) {
  const { data: collectionData, status } = useCollection({ collectionName });

  const { data: productsData } = useProductList({
    section,
    code: collectionName,
    defaultSortType,
  });

  const { site } = useCollectionListPageQueryParams();

  const video = useMemo(() => {
    return head(collectionData?.videos ?? []);
  }, [collectionData]);

  if (!collectionData || status === 'error') {
    return null;
  }

  return (
    <>
      <Banner banner={collectionData.banner} site={site} productTotal={productsData?.meta.pagination.total} />
      {video ? (
        <CollectionsVideo key={collectionName} videoSrc={video.videoUrl} thumbnailSrc={video.videoThumbnailUrl} />
      ) : null}
      <PageTitle>{collectionData.title}</PageTitle>
    </>
  );
}
