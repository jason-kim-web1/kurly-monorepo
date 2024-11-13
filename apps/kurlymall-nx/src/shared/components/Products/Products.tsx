import { memo } from 'react';

import { css } from '@emotion/react';

import { Product } from '../../interfaces';

const productContainer = css({
  padding: '16px 0',
  marginLeft: 16,
  flexGrow: 1,
});

const styles = {
  container: {
    padding: '0 16px',
  },
  wrap: {
    display: 'flex',
    '&:not(:first-of-type)': {
      [`.css-${productContainer.name}`]: {
        borderTop: '1px solid #f4f4f4',
      },
    },
  },
  imgContainer: {
    padding: '16px 0',
  },
  img: (src: string) => ({
    width: 50,
    height: 65,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundImage: `url(${src})`,
  }),
  productContainer,
  priceContainer: {
    marginTop: 6,
  },
  name: {
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical' as const,
    lineHeight: 'normal',
  },
  packageName: {
    fontSize: '12px',
    lineHeight: '20px',
    color: '#999',
  },
  price: (discounted: boolean) => ({
    fontWeight: 'bold' as const,
    ...(discounted && {
      fontSize: '14px',
      color: '#999999',
      textDecoration: 'line-through',
      paddingLeft: '5px',
      fontWeight: 'normal' as const,
    }),
  }),
  discountedPrice: {
    fontWeight: 'bold' as const,
  },
  divider: {
    width: 1,
    height: 12,
    margin: '0 8px',
    top: 1,
    display: 'inline-block',
    position: 'relative' as const,
    backgroundColor: '#ddd',
  },
  quantity: {
    fontWeight: 'bold' as const,
    color: '#666',
  },
};

interface Props {
  products?: Product[];
}

function Products({ products }: Props) {
  return (
    <ul css={styles.container}>
      {products?.map(({ dealProductName, contentProductName, price, discountedPrice, quantity, thumbnailUrl }) => {
        const discounted = discountedPrice < price;

        return (
          <li css={styles.wrap} key={dealProductName}>
            <div css={styles.imgContainer}>
              <div css={styles.img(thumbnailUrl)} />
            </div>
            <div css={styles.productContainer}>
              <p css={styles.name}>{dealProductName}</p>
              {contentProductName && <p css={styles.packageName}>{contentProductName}</p>}
              <p css={styles.priceContainer}>
                {discounted && (
                  <span css={styles.discountedPrice}>{(quantity * discountedPrice).toLocaleString('ko-KR')}원</span>
                )}
                <span css={styles.price(!!discounted)}>{(quantity * price).toLocaleString('ko-KR')}원</span>
                <span css={styles.divider} />
                <span css={styles.quantity}>{quantity}개</span>
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default memo(Products);
