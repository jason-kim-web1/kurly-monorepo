import { useState } from 'react';

import styled from '@emotion/styled';
import { isEmpty } from 'lodash';

import type { ProductDetailNotice } from '../../../../types';

import COLOR from '../../../../../../shared/constant/colorset';

import ProductNoticeItemList from './ProductNoticeItemList';
import ProductNoticeTable from './ProductNoticeTable';
import Alert from '../../../../../../shared/components/Alert/Alert';
import { amplitudeService } from '../../../../../../shared/amplitude';
import { SelectProductDetailInfoPerDeal } from '../../../../../../shared/amplitude/events/product/SelectProductDetailInfoPerDeal';
import { getFusionQueryId } from '../../../../shared/utils/productDetailEvent';
import { useAppSelector } from '../../../../../../shared/store';

const Container = styled.div`
  padding: 72px 0;
  border-top: 1px solid ${COLOR.kurlyGray200};
  font-family: Noto Sans KR;
`;

const Title = styled.h3`
  font-weight: 500;
  font-size: 28px;
  line-height: 41px;
  text-align: center;
  letter-spacing: -0.5px;
  color: ${COLOR.kurlyGray600};
`;

interface Props {
  productNotice: ProductDetailNotice[];
  initTabIndex?: number;
}

export default function ProductNotice({ productNotice, initTabIndex = 0 }: Props) {
  const queryId = useAppSelector(({ productList }) => productList.queryId);

  const [tabIndex, setTabIndex] = useState(initTabIndex);

  if (isEmpty(productNotice)) {
    return null;
  }

  const selectedNotice = productNotice[tabIndex]?.notices;

  const isMultipleNotice = productNotice.length > 1;

  const onClickProductNoticeItem = (index: number, dealProductNo: number, dealProductName: string) => {
    setTabIndex(index);

    try {
      amplitudeService.logEvent(
        new SelectProductDetailInfoPerDeal({
          dealId: dealProductNo,
          dealName: dealProductName,
          fusionQueryId: getFusionQueryId(queryId),
        }),
      );
    } catch (e) {}
  };

  if (isEmpty(selectedNotice)) {
    Alert({
      text: `상품정보가 올바르지 않습니다
문제가 지속되면 고객행복센터로
문의해주세요`,
    });
  }

  return (
    <Container>
      <Title>상품고시정보</Title>
      {isMultipleNotice && (
        <ProductNoticeItemList
          tabIndex={tabIndex}
          productNotice={productNotice}
          onClickProductNoticeItem={onClickProductNoticeItem}
        />
      )}
      <ProductNoticeTable notice={selectedNotice} />
    </Container>
  );
}
