import styled from '@emotion/styled';

import type { ProductData, ProductMainSelectData } from '../../../../shared/interfaces';
import CollectionArticleProductCard from './CollectionArticleProductCard';
import SectionMore from '../shared/SectionMore';

const Container = styled.div`
  padding: 12px 0 20px;
`;

const ProductList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

interface Props {
  products: ProductData[];
  landingUrl?: string;
  selectProduct(selectProduct: ProductMainSelectData): void;
  selectMore?(): void;
}

export default function CollectionArticleProduct({ products, landingUrl, selectProduct, selectMore }: Props) {
  return (
    <Container>
      <ProductList>
        {products.map(
          (
            {
              no,
              listImageUrl,
              productVerticalMediumUrl,
              name,
              salesPrice,
              discount,
              isMultiplePrice,
              status,
              groupProduct,
              canRestockNotify,
              deliveryTypeNames,
              isBuyNow,
            },
            index,
          ) => (
            <CollectionArticleProductCard
              key={no}
              index={index}
              listImageUrl={productVerticalMediumUrl || listImageUrl}
              name={name}
              salesPrice={salesPrice}
              discount={discount}
              isMultiplePrice={isMultiplePrice}
              no={no}
              status={status}
              isGroupProduct={groupProduct.isGroup}
              canRestockNotify={canRestockNotify}
              deliveryTypeNames={deliveryTypeNames}
              isBuyNow={isBuyNow}
              selectProduct={selectProduct}
            />
          ),
        )}
      </ProductList>
      {landingUrl && <SectionMore landingUrl={landingUrl} onSelectMore={selectMore} />}
    </Container>
  );
}
