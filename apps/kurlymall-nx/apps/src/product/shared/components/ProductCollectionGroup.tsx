import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { eq, isEmpty } from 'lodash';

import { memo, useEffect, useState } from 'react';

import { useCollectionGroups } from '../../list/collections/hook/useCollectionGroups';
import { KPDSError, KPDSProductsEmpty } from '../../../shared/components/KPDSLoadingErrorPolicy';
import { ProductViewCollection } from './ProductViewCollection';
import { useDynamicViewportSize, VIEWPORT_HEIGHT_UNIT } from '../../../shared/hooks/useDynamicViewportSize';
import { GNB_HEIGHT, HEADER_HEIGHT, USER_MENU_HEIGHT } from '../../../shared/constant/mobileHeaderHeight';
import { ProductViewCollectionSkeleton } from './ProductViewCollectionSkeleton';
import { GalleryViewCollectionSkeleton } from './GalleryViewCollectionSkeleton';
import { GalleryViewCollection } from './GalleryViewCollection';
import Repeat from '../../../shared/components/Repeat';
import { ImpressionPolicy } from '../../../shared/context/ImpressionPolicyContext';
import { useProductCollectionGroupAmplitudeEvents } from '../providers/ProductCollectionGroupAmplitudePropertyProvider';
import { isNotEmpty } from '../../../shared/utils/lodash-extends';
import { ProductCollectionGroupType } from '../../types/product-collection-groups';

interface Props {
  code: string;
  /** 프로덕트 컬렉션 그룹 디자인 타입 */
  productCollectionGroupType: ProductCollectionGroupType;
  /** 스크롤 복구 여부 */
  onListRendered?: () => void;
}

const List = styled.ul``;

const ListItem = styled.li<{ productCollectionGroupType: ProductCollectionGroupType }>`
  margin-top: ${({ productCollectionGroupType }) =>
    eq(productCollectionGroupType, 'collection_group_gallery') ? vars.spacing.$24 : vars.spacing.$32};

  &:first-of-type {
    margin-top: ${vars.spacing.$24};
  }

  &:last-of-type {
    margin-bottom: ${vars.spacing.$24};
  }
`;

const Wrapper = styled.div`
  position: relative;
  min-height: calc(
    var(${VIEWPORT_HEIGHT_UNIT}, 1vh) * 100 - ${USER_MENU_HEIGHT}px - ${HEADER_HEIGHT}px - ${GNB_HEIGHT}px
  );
`;

const SKELETON_HEIGHT: Record<ProductCollectionGroupType, number> = {
  collection_group_product: 286,
  collection_group_gallery: 242,
};

const ProductCollectionListItemImpl = ({
  collectionCode,
  title,
  subtitle,
  position,
  productCollectionGroupType,
}: {
  collectionCode: string;
  title: string;
  subtitle: string;
  position: number;
  productCollectionGroupType: ProductCollectionGroupType;
}) => {
  const { handleImpressionGroup } = useProductCollectionGroupAmplitudeEvents();

  return (
    <ImpressionPolicy
      key={collectionCode}
      onInView={() =>
        handleImpressionGroup({
          sectionId: collectionCode,
          sectionTitle: title,
          sectionPosition: position,
          collectionId: collectionCode,
        })
      }
    >
      <ListItem productCollectionGroupType={productCollectionGroupType}>
        {eq(productCollectionGroupType, 'collection_group_product') ? (
          <ProductViewCollection code={collectionCode} title={title} subtitle={subtitle} />
        ) : (
          <GalleryViewCollection code={collectionCode} title={title} subtitle={subtitle} />
        )}
      </ListItem>
    </ImpressionPolicy>
  );
};

const ProductCollectionListItem = memo(ProductCollectionListItemImpl);

const ProductCollectionGroup = ({ code, onListRendered, productCollectionGroupType }: Props) => {
  const [skeletonCounts, setSkeletonCounts] = useState(0);
  const { vh } = useDynamicViewportSize();
  const { data, status, refetch } = useCollectionGroups({ collectionGroupsCode: code });
  const { addCollectionProperty } = useProductCollectionGroupAmplitudeEvents();

  const isSuccessWithCollections = eq(status, 'success') && isNotEmpty(data?.collections);

  useEffect(() => {
    const contentHeight = 100 * vh - USER_MENU_HEIGHT - HEADER_HEIGHT - GNB_HEIGHT;
    setSkeletonCounts(contentHeight / SKELETON_HEIGHT[productCollectionGroupType] + 1);
  }, [vh, productCollectionGroupType]);

  useEffect(() => {
    if (isEmpty(data?.collections)) return;

    data!.collections.forEach(({ code: collectionCode, title }, index) => {
      addCollectionProperty({
        sectionId: collectionCode,
        sectionTitle: title,
        sectionPosition: index + 1,
        collectionId: collectionCode,
      });
    });
  }, [addCollectionProperty, data]);

  useEffect(() => {
    if (!isSuccessWithCollections) return;
    onListRendered?.();
  }, [isSuccessWithCollections, onListRendered]);

  return (
    <Wrapper>
      {eq(status, 'error') ? <KPDSError onClickRefetch={refetch} /> : null}

      {eq(status, 'loading') ? (
        <List>
          <Repeat count={skeletonCounts}>
            <ListItem productCollectionGroupType={productCollectionGroupType}>
              {eq(productCollectionGroupType, 'collection_group_product') ? (
                <ProductViewCollectionSkeleton />
              ) : (
                <GalleryViewCollectionSkeleton />
              )}
            </ListItem>
          </Repeat>
        </List>
      ) : null}

      {eq(status, 'success') ? (
        isEmpty(data?.collections) ? (
          <KPDSProductsEmpty />
        ) : (
          <List>
            {data?.collections.map(({ code: collectionCode, title, subtitle }, index) => (
              <ProductCollectionListItem
                key={`${collectionCode}-${index}`}
                collectionCode={collectionCode}
                title={title}
                subtitle={subtitle}
                position={index + 1}
                productCollectionGroupType={productCollectionGroupType}
              />
            ))}
          </List>
        )
      ) : null}
    </Wrapper>
  );
};

export { ProductCollectionGroup };
