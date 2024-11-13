import { useMemo } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { head, isEmpty } from 'lodash';

import Banner from '../../../pc/components/Banner';
import MenuCollections from '../../../pc/components/MenuCollections';
import COLOR from '../../../../../shared/constant/colorset';
import { amplitudeService } from '../../../../../shared/amplitude';
import { SelectCollectionBanner, SelectCollectionMenu } from '../../../../../shared/amplitude/events';
import { ProductCollectionGroups, ProductCollectionGroupsData } from '../../../types';
import { useCollection } from '../../hook/useCollection';
import { LoadingListTop } from '../../../pc/components/LoadingList';
import { parseQueryString } from '../../../../../shared/utils/parseQueryString';
import { MAIN_SITE } from '../../../../../main/constants';
import { getSanitizedValue, getSanitizedMainSite } from '../../../../../shared/utils/getSanitizedValues';
import type { MainSite } from '../../../../../main/interfaces/MainSection.interface';
import { CollectionsVideo } from '../../components/CollectionsVideo';

const Container = styled.div`
  width: 1050px;
  margin: 0 auto;
`;

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
  groupsStatus: 'error' | 'success' | 'loading';
  groupsData: ProductCollectionGroupsData;
  collectionGroupsCode: string;
  collection: string;
  collectionGroups: ProductCollectionGroups[];
}

export default function CollectionGroupsTopContainer({
  groupsStatus,
  groupsData,
  collectionGroupsCode,
  collection,
  collectionGroups,
}: Props) {
  const router = useRouter();
  const { query } = router;
  const { site } = parseQueryString(query);
  const mainSite = getSanitizedValue<MainSite>({
    value: site,
    defaultValue: MAIN_SITE.MARKET,
    fn: getSanitizedMainSite,
  });
  const { data: collectionData } = useCollection({ collectionName: collection });

  const handlePageChange = (groupCode: string) => {
    void router.replace(
      {
        query: {
          ...query,
          page: 1,
          filters: null,
          ...(groupCode && { collection: groupCode }),
          ...(mainSite === 'BEAUTY' && { site: 'beauty' }),
        },
      },
      undefined,
    );
  };

  const video = useMemo(() => {
    return head(collectionData?.videos ?? []);
  }, [collectionData]);

  if (groupsStatus === 'error') {
    return null;
  }

  if (groupsStatus === 'loading') {
    return <LoadingListTop />;
  }

  const handleBannerAmplitude = (url: string) => {
    amplitudeService.logEvent(
      new SelectCollectionBanner({
        url,
        groupCollectionId: collectionGroupsCode,
        selectCode: collection,
        groups: collectionGroups,
      }),
    );
  };

  const handleMenuAmplitude = (groupCode: string) => {
    amplitudeService.logEvent(
      new SelectCollectionMenu({
        groupCode,
      }),
    );
  };

  return (
    <Container>
      {collectionData && !isEmpty(collectionData.banner) ? (
        <Banner banner={collectionData.banner} site={mainSite} onClickBanner={handleBannerAmplitude} />
      ) : null}
      {video ? (
        <CollectionsVideo key={collection} videoSrc={video.videoUrl} thumbnailSrc={video.videoThumbnailUrl} />
      ) : null}
      {groupsData && <PageTitle>{groupsData.title}</PageTitle>}
      <MenuCollections
        code={collection}
        groups={collectionGroups}
        onAmplitude={handleMenuAmplitude}
        setCollectionCode={handlePageChange}
      />
    </Container>
  );
}
