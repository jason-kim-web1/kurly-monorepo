import styled from '@emotion/styled';
import { forwardRef, memo, Ref } from 'react';

import NoImageIcon from '../../icons/NoImage';

type ProductImageType = 'small' | 'basic' | 'giftReceiver' | 'giftReceiverResult';

interface Props {
  imageUrl: string;
  type?: ProductImageType;
  className?: string;
}

interface ProductImageSize {
  width: number;
  height: number;
}

const PRODUCT_IMAGE_SIZE: Record<ProductImageType, ProductImageSize> = {
  // 주문서(m)
  small: {
    width: 50,
    height: 65,
  },
  // 주문 내역, 선물 내역, 장바구니(pc, m), 주문서(pc)
  basic: {
    width: 60,
    height: 78,
  },
  // 선물 수신자
  giftReceiver: {
    width: 200,
    height: 200,
  },
  // 선물 수락
  giftReceiverResult: {
    width: 275,
    height: 275,
  },
};

const Thumbnail = styled.span`
  overflow: hidden;
  display: block;
  width: 100%;
  height: 100%;
  background-color: #eee;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
`;

function ProductImage({ type = 'basic', imageUrl, className }: Props, ref: Ref<HTMLInputElement>) {
  const { width, height } = PRODUCT_IMAGE_SIZE[type];

  return (
    <NoImageIcon width={width} height={height} className={className}>
      <Thumbnail ref={ref} data-testid="product-image" style={{ backgroundImage: `url(${imageUrl})` }} />
    </NoImageIcon>
  );
}

export default memo(forwardRef(ProductImage));
