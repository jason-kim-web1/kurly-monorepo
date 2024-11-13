import styled from '@emotion/styled';

import { head } from 'lodash';

import { useCallback, useEffect, useState } from 'react';

import { zIndex } from '../../../../shared/styles';
import COLOR from '../../../../shared/constant/colorset';

import { useAppSelector } from '../../../../shared/store';
import OpenButton from '../components/buy-footer/OpenButton';
import MultiSelectedProductItem from '../components/buy-footer/MultiSelectedProductItem';
import SelectedProductItem from '../components/buy-footer/selected-product/SelectedProductItem';
import ProductBuyPrice from '../components/ProductBuy/ProductBuyPrice';
import ProductBuyButtonGroup from '../components/ProductBuy/ProductBuyButtonGroup';
import { amplitudeService, ScreenName } from '../../../../shared/amplitude';
import { getFusionQueryId } from '../../shared/utils/productDetailEvent';
import sendAmplitudeProductViewSelection from '../../../../shared/amplitude/component/sendAmplitudeProductViewSelection';
import type { DeliveryInfoName } from '../../../types';

const Container = styled.div`
  position: fixed;
  z-index: ${zIndex.productBuyFooter};
  left: 0;
  bottom: 0;
  width: 100%;
  min-height: 20px;
  background-color: ${COLOR.kurlyWhite};
  border-top: 2px solid ${COLOR.kurlyPurple};
`;

const ProductBuyWrapper = styled.div`
  position: relative;
  width: 900px;
  margin: 0 auto;
  font-family: 'Noto Sans KR';
`;

const ProductItemWrapper = styled.div`
  margin-top: 20px;
`;

const ProductBuyPriceWrapper = styled.div`
  padding-top: 20px;
`;

const ProductBuyButtonGroupWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

interface EventViewProductSelectionProps {
  no: number;
  name: string;
  isGiftable: boolean;
  isGroupProduct: boolean;
  deliveryTypeNames: DeliveryInfoName[];
  sellerName: string;
  defaultContentId: number;
  queryId: string | null;
}

const eventViewProductSelection = ({
  no,
  name,
  isGroupProduct,
  deliveryTypeNames,
  sellerName,
  isGiftable,
  defaultContentId,
  queryId,
}: EventViewProductSelectionProps) => {
  sendAmplitudeProductViewSelection({
    productDetailState: {
      no,
      name,
      isGroupProduct,
      deliveryTypeNames,
      sellerName,
      isGiftable,
    },
    defaultContentId,
    queryId: getFusionQueryId(queryId),
  });
};

interface Props {
  isDisplay: boolean;
}

export default function ProductBuyFooterContainer({ isDisplay }: Props) {
  const queryId = useAppSelector(({ productList }) => productList.queryId);
  const {
    no,
    name,
    contentType,
    isGroupProduct,
    deliveryTypeNames,
    sellerName,
    defaultContentId,
    dealProducts,
    directOrderType,
    isGiftable,
  } = useAppSelector(({ productDetail }) => productDetail);

  const [openSection, setOpenSection] = useState(false);

  useEffect(() => {
    if (!isDisplay) {
      amplitudeService.setScreenName(ScreenName.PRODUCT_DETAIL_DESCRIPTION);
      setOpenSection(false);
    }
  }, [isDisplay]);

  const handleClickOpenSection = useCallback(() => {
    if (!openSection) {
      eventViewProductSelection({
        no,
        name,
        isGroupProduct,
        deliveryTypeNames,
        sellerName,
        defaultContentId,
        queryId,
        isGiftable,
      });
    }

    setOpenSection(!openSection);
  }, [defaultContentId, deliveryTypeNames, isGiftable, isGroupProduct, name, no, openSection, queryId, sellerName]);

  const headOfDealProducts = head(dealProducts);

  if (!headOfDealProducts) {
    return <ProductItemWrapper>상품정보가 올바르지 않습니다.</ProductItemWrapper>;
  }

  return (
    <Container>
      <ProductBuyWrapper>
        <OpenButton openSection={openSection} onClick={handleClickOpenSection} />
        {openSection ? (
          <>
            <ProductItemWrapper>
              {contentType === 'MULTI' ? (
                <MultiSelectedProductItem dealProducts={dealProducts} directOrderType={directOrderType} />
              ) : (
                <SelectedProductItem dealProduct={headOfDealProducts} directOrderType={directOrderType} />
              )}
            </ProductItemWrapper>
            <ProductBuyPriceWrapper>
              <ProductBuyPrice />
            </ProductBuyPriceWrapper>
            <ProductBuyButtonGroupWrapper>
              <ProductBuyButtonGroup type="FIXED_WIDTH" />
            </ProductBuyButtonGroupWrapper>
          </>
        ) : null}
      </ProductBuyWrapper>
    </Container>
  );
}
