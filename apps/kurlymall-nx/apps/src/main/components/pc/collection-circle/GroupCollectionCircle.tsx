import styled from '@emotion/styled';

import type { MainGroupCollectionCircleSection } from '../../../interfaces/MainSection.interface';
import { useAppSelector } from '../../../../shared/store';
import CollectionListCircle from './CollectionListCircle';
import SectionHeader from '../shared/SectionHeader';
import SectionContents from '../shared/SectionContents';
import useSectionEvent from '../../../hooks/useSectionEvent';
import COLOR from '../../../../shared/constant/colorset';
import { createMainSkeletonPC } from '../shared/skeleton/CreateMainSkeleton';

const Wrap = styled.div<{ isHeight: boolean }>`
  height: ${({ isHeight }) => (isHeight ? '409px' : 0)};
  background-color: ${COLOR.bg};
`;

interface Props {
  section: MainGroupCollectionCircleSection;
}

export default function GroupCollectionCircle({ section }: Props) {
  const site = useAppSelector(({ main }) => main.site);
  const { payload, isError, type } = section;

  const { onSelectTitle, onSelectProduct, onSelectMore } = useSectionEvent(section);

  const loadingLayer = createMainSkeletonPC(type);

  if (!payload) {
    return (
      <Wrap isHeight={!isError}>
        <SectionContents section={section} loadingLayer={loadingLayer} />
      </Wrap>
    );
  }

  const { collectionCode, collections, title, hasMore, landingUrl: url } = payload;
  const landingUrl = hasMore && collectionCode ? url : '';

  return (
    <Wrap isHeight={true}>
      <SectionContents section={section} loadingLayer={loadingLayer}>
        <SectionHeader title={title} landingUrl={landingUrl} selectTitle={onSelectTitle} />
        <CollectionListCircle
          site={site}
          collectionCode={collectionCode}
          collections={collections}
          selectProduct={onSelectProduct}
          selectMore={onSelectMore}
        />
      </SectionContents>
    </Wrap>
  );
}
