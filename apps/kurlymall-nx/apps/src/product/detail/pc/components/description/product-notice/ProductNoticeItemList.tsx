import styled from '@emotion/styled';

import COLOR from '../../../../../../shared/constant/colorset';
import { ProductDetailNotice } from '../../../../types';

const Container = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 26px 16px 0;
`;

const ProductNoticeItem = styled.li<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  align-items: center;
  min-width: 70px;
  max-width: 214px;
  padding: 8px 12px 8px 14px;
  border: 1px solid ${(props) => (props.selected ? `${COLOR.kurlyGray800}` : `${COLOR.kurlyGray200}`)};
  border-radius: 4px;
  font-weight: ${(props) => (props.selected ? 500 : 400)};
  font-size: 13px;
  color: ${(props) => (props.selected ? `${COLOR.kurlyGray800}` : `${COLOR.kurlyGray700}`)};
  line-height: 18px;
  text-align: center;
  letter-spacing: -0.5px;
`;

const Text = styled.span`
  overflow: hidden;
  max-height: 38px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

interface Props {
  tabIndex: number;
  productNotice: ProductDetailNotice[];
  onClickProductNoticeItem(index: number, dealProductNo: number, dealProductName: string): void;
}

export default function ProductNoticeItemList({ tabIndex, productNotice, onClickProductNoticeItem }: Props) {
  return (
    <Container>
      {productNotice.map(({ dealProductNo, dealProductName }, dealProductIndex) => (
        <ProductNoticeItem
          key={dealProductNo}
          selected={dealProductIndex === tabIndex}
          onClick={() => onClickProductNoticeItem(dealProductIndex, dealProductNo, dealProductName)}
        >
          <Text>{dealProductName}</Text>
        </ProductNoticeItem>
      ))}
    </Container>
  );
}
