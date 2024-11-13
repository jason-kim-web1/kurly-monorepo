import { MainGroupCollectionCircleSection } from '../../../interfaces/MainSection.interface';
import { useAppSelector } from '../../../../shared/store';
import CollectionListCircle from './CollectionListCircle';
import SectionTitle from '../shared/SectionTitle';
import SectionContents from '../shared/SectionContents';
import useSectionEvent from '../../../hooks/useSectionEvent';
import { createMainSkeleton } from '../shared/skeleton/CreateMainSkeleton';

interface Props {
  section: MainGroupCollectionCircleSection;
}

export default function GroupCollectionCircle({ section }: Props) {
  const site = useAppSelector(({ main }) => main.site);
  const { payload, type } = section;

  const { onSelectTitle, onSelectProduct } = useSectionEvent(section);

  const loadingLayer = createMainSkeleton(type);

  if (!payload) {
    return <SectionContents section={section} loadingLayer={loadingLayer} />;
  }

  const { collectionCode, collections, title, hasMore, landingUrl: url } = payload;
  const landingUrl = hasMore && collectionCode ? url : '';

  return (
    <SectionContents section={section} loadingLayer={loadingLayer}>
      <SectionTitle title={title} landingUrl={landingUrl} selectTitle={onSelectTitle} />
      <CollectionListCircle
        site={site}
        collectionCode={collectionCode}
        collections={collections}
        selectProduct={onSelectProduct}
      />
    </SectionContents>
  );
}
