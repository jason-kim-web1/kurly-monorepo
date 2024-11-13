import styled from '@emotion/styled';

import type { ProductData, ProductMainSelectData } from '../../../../shared/interfaces';
import { ProductCard } from '../../shared/group-collection-number/ProductCard';
import ShowMoreButton from './ShowMoreButton';

const Container = styled.div`
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 58px;
`;

const CollectionProductSectionWrapper = styled.div`
  display: flex;
  gap: 32px;
`;

const CollectionProductSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  min-width: 292px;
`;

interface Props {
  chunkProductList: ProductData[][];
  onSelectProduct: (selectProduct: ProductMainSelectData) => void;
  onSelectMore: () => void;
  selectedCollection?: { code: string; name: string };
  landingUrl?: string;
}

const ProductList = ({ chunkProductList, onSelectProduct, onSelectMore, selectedCollection, landingUrl }: Props) => {
  return (
    <Container>
      <CollectionProductSectionWrapper>
        {chunkProductList.map((productList, outIndex) => (
          <CollectionProductSection key={outIndex}>
            {productList.map((product, index) => (
              <ProductCard
                {...product}
                className="product-card"
                key={product.no}
                index={outIndex * 3 + index}
                handleSelectProduct={onSelectProduct}
              />
            ))}
          </CollectionProductSection>
        ))}
      </CollectionProductSectionWrapper>
      {landingUrl && selectedCollection ? (
        <ShowMoreButton href={landingUrl} name={selectedCollection?.name} selectMore={onSelectMore} />
      ) : null}
    </Container>
  );
};

export { ProductList };
