import type { MainRandomCollectionArticleSection } from '../../../interfaces/MainSection.interface';
import SectionTitle from '../shared/SectionTitle';
import CollectionArticleHeader from './CollectionArticleHeader';
import CollectionArticleProduct from './CollectionArticleProduct';
import SectionContents from '../shared/SectionContents';
import useSectionEvent from '../../../hooks/useSectionEvent';
import { createMainSkeleton } from '../shared/skeleton/CreateMainSkeleton';

interface Props {
  section: MainRandomCollectionArticleSection;
}

export default function RandomCollectionArticle({ section }: Props) {
  const { payload, type } = section;

  const { onSelectImage, onSelectDescription, onSelectProduct, onSelectMore } = useSectionEvent(section);

  const loadingLayer = createMainSkeleton(type);

  if (!payload) {
    return <SectionContents section={section} loadingLayer={loadingLayer} />;
  }

  const { collectionCode, products, title, mainImageDescriptionMobileUrl, imageUrl, description, landingUrl } = payload;
  const headerUrl = landingUrl ? landingUrl : `/collections/${collectionCode}`;

  return (
    <SectionContents section={section} loadingLayer={loadingLayer}>
      <SectionTitle title={title} />
      <CollectionArticleHeader
        imageUrl={mainImageDescriptionMobileUrl || imageUrl}
        description={description}
        landingUrl={headerUrl}
        selectImage={onSelectImage}
        selectDescription={onSelectDescription}
      />
      <CollectionArticleProduct
        products={products}
        landingUrl={landingUrl}
        selectProduct={onSelectProduct}
        selectMore={onSelectMore}
      />
    </SectionContents>
  );
}
