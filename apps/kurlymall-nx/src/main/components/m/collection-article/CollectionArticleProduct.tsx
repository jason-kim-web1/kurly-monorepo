import styled from '@emotion/styled';

import type { ProductData, ProductMainSelectData } from '../../../../shared/interfaces';
import COLOR from '../../../../shared/constant/colorset';
import CollectionArticleProductCard from './CollectionArticleProductCard';
import SectionMore from '../../m/shared/SectionMore';

const Container = styled.div`
  padding: 17px 16px 0;
`;

const ProductList = styled.ul`
  padding-top: 4px;
  border-top: 1px solid ${COLOR.mainArticleDivider};
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
        {products.map((item, index) => (
          <CollectionArticleProductCard
            key={item.no}
            index={index}
            listImageUrl={item.productVerticalMediumUrl || item.listImageUrl}
            name={item.name}
            salesPrice={item.salesPrice}
            discount={item.discount}
            isMultiplePrice={item.isMultiplePrice}
            no={item.no}
            status={item.status}
            isGroupProduct={item.groupProduct.isGroup}
            canRestockNotify={item.canRestockNotify}
            deliveryTypeNames={item.deliveryTypeNames}
            isBuyNow={item.isBuyNow}
            selectProduct={selectProduct}
          />
        ))}
      </ProductList>
      {landingUrl && <SectionMore landingUrl={landingUrl} onSelectMore={selectMore} />}
    </Container>
  );
}
