import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { Typography } from '@thefarmersfront/kpds-react';

import Link from 'next/link';

import { eq } from 'lodash';

import { memo, useEffect, useRef } from 'react';

import { ProductData } from '../../../shared/interfaces';
import { ArrowTailRight } from '../../../shared/icons/ArrowTailRight';
import { GalleryViewProductCard } from './GalleryViewCollectionCard';
import { useProductCollectionGroupAmplitudeEvents } from '../providers/ProductCollectionGroupAmplitudePropertyProvider';
import { ImpressionPolicy, useImpressionPolicy } from '../../../shared/context/ImpressionPolicyContext';
import { getSearchParamsString } from '../../../shared/utils/queryStringSiteConverter';
import { useAppSelector } from '../../../shared/store';

interface Props {
  products: ProductData[];
  collectionCode: string;
}

const ListWrapper = styled.ul`
  margin-top: ${vars.spacing.$12};
  display: flex;
  align-items: stretch;
  overflow: auto hidden;
  scroll-snap-type: x mandatory;
  white-space: nowrap;
  padding: 0 ${vars.spacing.$16};

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ListItem = styled.li`
  vertical-align: top;
  scroll-snap-align: start;
  scroll-margin-left: ${vars.spacing.$16};
  scroll-margin-right: 0;
  background-color: transparent;
  transition: background-color 0.2s ease-out;

  :not(:nth-last-of-type(-n + 2)) {
    margin-right: ${vars.spacing.$2};
  }

  // 전체보기
  :last-of-type {
    position: relative;
    padding: 0 ${vars.spacing.$4} 0 ${vars.spacing.$16};
    border-radius: ${vars.radius.$10};
    display: flex;
    align-items: center;

    &:active,
    &:hover {
      background-color: ${vars.color.main.$secondaryContainer};
    }
  }
`;

const AllLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const IconWrapper = styled.div`
  width: ${vars.spacing.$40};
  height: ${vars.spacing.$40};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${vars.color.background.$background2};
`;

const AllLink = styled.a`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const AllText = styled(Typography)`
  margin-top: ${vars.spacing.$8};
  color: ${vars.color.text.$secondary};
`;

const GalleryViewCollectionAllLink = ({ code }: { code: string }) => {
  const site = useAppSelector(({ main }) => main.site);
  const link = `/collections/${code}${getSearchParamsString({ site: eq(site, 'BEAUTY') ? site.toLowerCase() : null })}`;
  const { handleSelectCollection } = useProductCollectionGroupAmplitudeEvents();

  const handleClickAllLink = () => {
    handleSelectCollection({
      selectionType: 'more',
      collectionId: code,
    });
  };

  return (
    <>
      <Link href={link} passHref>
        <AllLink href={link} onClick={handleClickAllLink} />
      </Link>

      <AllLinkWrapper>
        <IconWrapper>
          <ArrowTailRight />
        </IconWrapper>
        <AllText as={'span'} variant={'$largeRegular'}>
          전체보기
        </AllText>
      </AllLinkWrapper>
    </>
  );
};

const ProductListItemImpl = ({
  product,
  collectionCode,
  isSingle,
  isFirst,
  isLast,
  itemPosition,
}: {
  product: ProductData;
  collectionCode: string;
  isSingle: boolean;
  isFirst: boolean;
  isLast: boolean;
  itemPosition: number;
}) => {
  const { handleImpressionItem } = useProductCollectionGroupAmplitudeEvents();

  return (
    <ImpressionPolicy
      key={product.no}
      onInView={() =>
        handleImpressionItem({
          itemPosition,
          contentId: product.no,
          contentName: product.name,
          price: product.discount.price ? product.discount.price : product.salesPrice,
          basePrice: product.salesPrice,
          collectionId: collectionCode,
        })
      }
    >
      <ListItem>
        <GalleryViewProductCard
          isFirst={isFirst}
          isLast={isLast}
          isSingle={isSingle}
          {...product}
          collectionCode={collectionCode}
        />
      </ListItem>
    </ImpressionPolicy>
  );
};

const ProductListItem = memo(ProductListItemImpl);

const GalleryViewCollectionProductList = ({ products, collectionCode }: Props) => {
  const listWrapperRef = useRef<HTMLUListElement>(null);

  const { registerElement, unRegisterElement } = useImpressionPolicy();

  useEffect(() => {
    const listElement = listWrapperRef.current;
    if (!listElement) {
      return;
    }
    registerElement(listElement);
    return () => {
      unRegisterElement(listElement);
    };
  }, [registerElement, unRegisterElement]);

  return (
    <ListWrapper ref={listWrapperRef}>
      {products.map((product, index, { length: totalLength }) => (
        <ProductListItem
          product={product}
          key={product.no}
          collectionCode={collectionCode}
          itemPosition={index + 1}
          isFirst={eq(index, 0)}
          isLast={eq(index + 1, totalLength)}
          isSingle={eq(totalLength, 1)}
        />
      ))}
      <ListItem>
        <GalleryViewCollectionAllLink code={collectionCode} />
      </ListItem>
    </ListWrapper>
  );
};

export { GalleryViewCollectionProductList };
