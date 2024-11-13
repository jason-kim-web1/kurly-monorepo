import { useState } from 'react';

import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

import { useAppSelector } from '../../../../../../shared/store';

import { ProductDetailNotice } from '../../../../types';
import ProductNoticeItemList from './ProductNoticeItemList';
import ProductNoticeTable from './ProductNoticeTable';
import Alert from '../../../../../../shared/components/Alert/Alert';
import { amplitudeService } from '../../../../../../shared/amplitude';
import { SelectProductDetailInfoPerDeal } from '../../../../../../shared/amplitude/events/product/SelectProductDetailInfoPerDeal';
import SectionWrapper from '../../SectionWrapper';
import { getFusionQueryId } from '../../../../shared/utils/productDetailEvent';
import COLOR from '../../../../../../shared/constant/colorset';

const Container = styled.div`
  border-top: 1px solid ${COLOR.kurlyGray200};
`;

const Title = styled.h3`
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
  text-align: center;
  margin-bottom: 13px;
  margin-top: 36px;
`;

interface Props {
  productNotice: ProductDetailNotice[];
  initTabIndex?: number;
}

export default function ProductNotice({ productNotice, initTabIndex = 0 }: Props) {
  const { queryId } = useAppSelector(({ productList }) => productList);
  const {
    topBanner: { title },
  } = useAppSelector(({ header }) => header);

  const [tabIndex, setTabIndex] = useState(initTabIndex);

  const isBanner = !!title;

  const isMultipleNotice = productNotice.length > 1;

  const selectedNotice = productNotice[tabIndex]?.notices;

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
    } catch (error) {}
  };

  if (isEmpty(selectedNotice)) {
    Alert({
      text: `상품정보가 올바르지 않습니다\n
문제가 지속되면 고객행복센터로
문의해주세요`,
    });
  }

  return (
    <SectionWrapper>
      <Container>
        <Title>상품고시정보</Title>
        {isMultipleNotice && (
          <ProductNoticeItemList
            isBanner={isBanner}
            tabIndex={tabIndex}
            productNotice={productNotice}
            onClickProductNoticeItem={onClickProductNoticeItem}
          />
        )}
        <ProductNoticeTable notice={selectedNotice} />
      </Container>
    </SectionWrapper>
  );
}
