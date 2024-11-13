import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

import { ProductData } from '../../../../shared/interfaces';
import ProductListLoading from './ProductListLoading';
import MainProductCard from '../shared/MainProductCard';
import { ProductMainSelectData } from '../../../../shared/interfaces/Product';
import { ProductImageType } from '../../../../shared/components/ProductImage/constants';
import COLOR from '../../../../shared/constant/colorset';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 16px;
  margin: 16px -4px 0 -4px;
`;

const NoResultContainer = styled.div`
  height: 540px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoResultMessage = styled.p`
  font-size: 16px;
  color: ${COLOR.benefitTextGray};
`;

const Card = styled(MainProductCard)`
  width: 33.333%;
  padding: 0 4px 8px;
  .image-container {
    padding-top: 133.3%;
  }
  .product-function {
    height: 30px;
    font-size: 12px;

    > svg {
      margin: 1px 4px 0 0;
    }
  }
  .product-info {
    padding: 8px 8px 0 0;
    min-height: 83px;
    .product-name {
      font-size: 12px;
      line-height: 1.33;
    }
    .product-price {
      .discount-rate,
      .sales-price {
        font-size: 12px;
      }
      .discount-rate {
        margin-right: 4px;
      }
      .dimmed-price {
        font-size: 10px;
        padding-bottom: 1px;
      }
    }
  }
`;

interface Props {
  products: ProductData[];
  loading: boolean;
  imageType?: ProductImageType;
  handleSelectProduct(selectProduct: ProductMainSelectData): void;
}

export default function ProductList({
  products,
  loading,
  imageType = ProductImageType.MAIN_MD_CHOICE_ITEM,
  handleSelectProduct,
}: Props) {
  if (loading) {
    return (
      <Container>
        <ProductListLoading />
      </Container>
    );
  }

  if (isEmpty(products)) {
    return (
      <NoResultContainer>
        <NoResultMessage>상품 목록을 불러올 수 없습니다.</NoResultMessage>
      </NoResultContainer>
    );
  }

  return (
    <Container>
      {products.map((product, index) => (
        <Card
          key={product.no}
          index={index}
          selectProduct={handleSelectProduct}
          isReviewCount={false}
          product={product}
          imageType={imageType}
        />
      ))}
    </Container>
  );
}
