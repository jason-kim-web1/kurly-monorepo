import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { Typography } from '@thefarmersfront/kpds-react';

import Link from 'next/link';

import { memo, useEffect, useRef } from 'react';

import { eq } from 'lodash';

import { ProductData } from '../../../shared/interfaces';
import { ProductViewCollectionCard } from './ProductViewCollectionCard';
import { ArrowTailRight } from '../../../shared/icons/ArrowTailRight';
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
    margin-right: ${vars.spacing.$8};
  }

  // 전체보기
  :last-of-type {
    position: relative;
    padding: 26px 4px 0 16px;
    border-radius: ${vars.radius.$10};

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

const ProductViewCollectionAllLink = ({ code }: { code: string }) => {
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
  itemPosition,
}: {
  product: ProductData;
  collectionCode: string;
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
        <ProductViewCollectionCard collectionCode={collectionCode} {...product} />
      </ListItem>
    </ImpressionPolicy>
  );
};

const ProductListItem = memo(ProductListItemImpl);

const ProductViewCollectionProductList = ({ products, collectionCode }: Props) => {
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
      {products.map((product, index) => (
        <ProductListItem key={product.no} product={product} collectionCode={collectionCode} itemPosition={index + 1} />
      ))}
      <ListItem>
        <ProductViewCollectionAllLink code={collectionCode} />
      </ListItem>
    </ListWrapper>
  );
};

export { ProductViewCollectionProductList };
