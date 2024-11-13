import type { MainRandomCollectionArticleSection } from '../../../interfaces/MainSection.interface';
import CollectionArticleHeader from './CollectionArticleHeader';
import CollectionArticleProduct from './CollectionArticleProduct';
import SectionContents from '../shared/SectionContents';
import useSectionEvent from '../../../hooks/useSectionEvent';
import { createMainSkeletonPC } from '../shared/skeleton/CreateMainSkeleton';

interface Props {
  section: MainRandomCollectionArticleSection;
}

export default function RandomCollectionArticle({ section }: Props) {
  const { payload, type } = section;

  const { onSelectImage, onSelectDescription, onSelectProduct, onSelectMore } = useSectionEvent(section);

  const loadingLayer = createMainSkeletonPC(type);

  if (!payload) {
    return <SectionContents section={section} loadingLayer={loadingLayer} />;
  }

  const { collectionCode, products, title, imageUrl, mainImageDescriptionPcUrl, description, landingUrl } = payload;

  const headerUrl = landingUrl ? landingUrl : `/collections/${collectionCode}`;

  return (
    <SectionContents section={section} loadingLayer={loadingLayer}>
      <CollectionArticleHeader
        title={title}
        imageUrl={mainImageDescriptionPcUrl || imageUrl}
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
