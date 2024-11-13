import styled from '@emotion/styled';

import { zIndex } from '../../../../../../shared/styles/index';
import COLOR from '../../../../../../shared/constant/colorset';
import { ProductDetailNotice } from '../../../../types';
import { useWebview } from '../../../../../../shared/hooks';

const Container = styled.ul<{ isBanner: boolean; isWebview: boolean }>`
  position: sticky;
  z-index: ${zIndex.productInfoMenu};
  left: 0;
  top: ${({ isBanner, isWebview }) => (isWebview ? 0 : isBanner ? '126px' : '88px')};
  display: flex;
  gap: 8px;
  overflow-x: auto;
  width: 100%;
  padding: 11px 16px;
  background-color: ${COLOR.kurlyWhite};
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const ProductNoticeItem = styled.li<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  align-items: center;
  min-width: 70px;
  max-width: 214px;
  padding: 9px 15px 11px;
  border: 1px solid ${(props) => (props.selected ? `${COLOR.kurlyGray800}` : `${COLOR.kurlyGray200}`)};
  border-radius: 6px;
  font-size: 14px;
  color: ${(props) => (props.selected ? `${COLOR.kurlyGray800}` : `${COLOR.kurlyGray700}`)};
  line-height: 19px;
  text-align: center;
`;

const Text = styled.span<{ selected: boolean }>`
  overflow: hidden;
  max-height: 38px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  font-weight: ${({ selected }) => (selected ? 600 : 400)};
`;

interface Props {
  isBanner: boolean;
  tabIndex: number;
  productNotice: ProductDetailNotice[];
  onClickProductNoticeItem(index: number, dealProductNo: number, dealProductName: string): void;
}

export default function ProductNoticeItemList({ isBanner, tabIndex, productNotice, onClickProductNoticeItem }: Props) {
  const webview = useWebview();

  return (
    <Container isBanner={isBanner} isWebview={webview}>
      {productNotice.map(({ dealProductNo, dealProductName }, dealProductIndex) => (
        <ProductNoticeItem
          key={dealProductNo}
          selected={dealProductIndex === tabIndex}
          onClick={() => onClickProductNoticeItem(dealProductIndex, dealProductNo, dealProductName)}
        >
          <Text selected={dealProductIndex === tabIndex}>{dealProductName}</Text>
        </ProductNoticeItem>
      ))}
    </Container>
  );
}
