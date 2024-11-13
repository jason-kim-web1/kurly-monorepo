import styled from '@emotion/styled';

import MainProductCard from '../shared/MainProductCard';
import COLOR from '../../../../shared/constant/colorset';
import { SpecialDealProduct } from '../../../interfaces/MainSection.interface';
import { ProductStatus } from '../../../../shared/interfaces';
import { ProductMainSelectData } from '../../../../shared/interfaces/Product';
import { ProductImageType } from '../../../../shared/components/ProductImage/constants';

const ProductCard = styled(MainProductCard)<{ dealEnded: boolean }>`
  padding: 0;
  .image-container {
    button:disabled {
      display: none;
    }
  }
  .product-info {
    padding: 9px 0 0 0;

    .product-description {
      margin-bottom: 8px;
      font-size: 14px;
      color: ${COLOR.kurlyGray450};
      line-height: 1.38;
      word-break: break-word;
    }

    .product-name {
      margin-bottom: 6px;
      font-size: 16px;
      line-height: 1.45;
      color: ${COLOR.kurlyGray800};
    }

    .product-price {
      flex-wrap: nowrap;
      flex-direction: row;
      align-items: center;

      &.discount-price {
        > div:nth-of-type(1) {
          order: 2;
          margin-top: -3px;
        }
        > div:nth-of-type(2) {
          padding-right: 1px;
          order: 1;
        }
      }

      .discount-rate {
        font-size: 20px;
        line-height: 30px;
      }

      .sales-price {
        padding-right: 6px;
        font-size: 20px;
        line-height: 30px;
      }

      .dimmed-price {
        font-size: 14px;
        line-height: 20px;
        text-decoration: line-through;
      }
    }

    .content-row {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    .review-count {
      padding-top: 8px;
      font-size: 14px;
      line-height: 20px;

      .review-icon {
        width: 17px;
        height: 17px;
        margin: 1px 2px 0 0;
      }
    }
  }
  .product-function {
    ${({ dealEnded }) => dealEnded && 'display: none'};
  }
  .sold-out-layer {
    strong {
      font-weight: 700;
      font-size: 28px;
      line-height: 41px;
    }
    span {
      margin: 0;
      padding-top: 6px;
      font-weight: 500;
      font-size: 16px;
      line-height: 23px;
    }
  }
  &.deal-size-1 {
    width: 694px;
    .image-container {
      height: 347px;
    }
    .quantity {
      height: 30px;
      padding: 0 9px 0 8px;
      font-weight: 700;
      font-size: 12px;
      line-height: 30px;
    }
  }
  &.deal-size-2 {
    width: 338px;
    .image-container {
      height: 434px;
    }
    .product-price {
      padding-right: 6px;
    }
    .content-row {
      gap: 8px;
    }
    .review-count {
      padding-top: 7px;
    }
  }
  &.deal-size-3 {
    width: 249px;
    .image-container {
      height: 320px;
    }
    .product-info {
      .product-price {
        display: inline;

        .discount-rate {
          font-size: 16px;
          line-height: 24px;
        }

        .sales-price {
          font-size: 16px;
          line-height: 24px;
        }

        .dimmed-price {
          padding-top: 4px;
        }
      }

      .content-row {
        align-items: flex-end;
      }

      .review-count {
        padding-top: 9px;
        font-size: 12px;
        line-height: 17px;

        .review-icon {
          width: 15px;
          height: 15px;
          margin: 1px 2px 0 0;
        }
      }
    }

    .sold-out-layer {
      strong {
        height: 36px;
        font-size: 24px;
      }
      span {
        font-size: 13px;
      }
    }
  }
`;

interface Props {
  index: number;
  product: SpecialDealProduct;
  imageType: ProductImageType;
  imageUrl: string;
  dealEnded: boolean;
  size: number;
  soldOutTitle: string;
  soldOutContent: string;
  selectProduct(selectProduct: ProductMainSelectData): void;
  onChangeSoldOutStatus?(): void;
}

export default function SpecialDealProductCard({
  index,
  product,
  imageType,
  imageUrl,
  dealEnded,
  size,
  soldOutTitle,
  soldOutContent,
  selectProduct,
  onChangeSoldOutStatus,
}: Props) {
  const messageTitle = dealEnded ? '판매 시간이 종료되었습니다.' : soldOutTitle;
  const messageContent = dealEnded ? '' : soldOutContent;
  const status: ProductStatus = dealEnded
    ? {
        code: 'SOLD_OUT',
        message: {
          title: messageTitle,
          content: messageContent,
        },
      }
    : product.status;

  return (
    <ProductCard
      className={`deal-size-${size}`}
      index={index}
      selectProduct={selectProduct}
      product={{
        ...product,
        status,
        imageUrl,
        description: product.shortDescription,
      }}
      dealEnded={dealEnded}
      imageType={imageType}
      onChangeSoldOutStatus={onChangeSoldOutStatus}
    />
  );
}
