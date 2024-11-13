import styled from '@emotion/styled';
import { isEmpty } from 'lodash';

import ProductListSkeleton from '../shared/skeleton/ProductListSkeleton';
import ProductListSection from '../shared/ProductListSection';
import { ProductData } from '../../../../shared/interfaces';
import { ProductMainSelectData } from '../../../../shared/interfaces/Product';
import { ProductImageType } from '../../../../shared/components/ProductImage/constants';

const Container = styled.div`
  margin: 20px 0 27px;
`;

interface Props {
  products: ProductData[];
  selectProduct(selectProduct: ProductMainSelectData): void;
  selectMore(): void;
}

export default function MdChoiceProductList({ products, selectProduct, selectMore }: Props) {
  return (
    <Container>
      {isEmpty(products) ? (
        <ProductListSkeleton />
      ) : (
        <ProductListSection
          products={products}
          selectProduct={selectProduct}
          selectMore={selectMore}
          imageType={ProductImageType.MAIN_MD_CHOICE_ITEM}
        />
      )}
    </Container>
  );
}
