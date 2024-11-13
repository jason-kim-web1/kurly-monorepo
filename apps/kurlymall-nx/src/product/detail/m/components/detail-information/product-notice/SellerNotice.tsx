import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

import { ProductInfoDictionaryItem } from '../../../../types';
import ProductNoticeTable from './ProductNoticeTable';
import PartnerSellerGuide from '../../../../shared/PartnerSellerGuide';

const Container = styled.div`
  margin-top: 36px;
  margin-bottom: 24px;
`;

const Title = styled.h3`
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
  text-align: center;
  margin-bottom: 13px;
  margin-top: 36px;
`;

const SellerGuideWrapper = styled.div`
  padding: 12px 16px 0;
  .description {
    white-space: pre-line;
  }
`;

interface Props {
  sellerNotice: ProductInfoDictionaryItem[];
  isThirdPart: boolean;
}

export default function SellerNotice({ sellerNotice, isThirdPart }: Props) {
  if (isEmpty(sellerNotice)) {
    return null;
  }

  return (
    <Container>
      <Title>판매자정보</Title>
      <ProductNoticeTable notice={sellerNotice} />
      {isThirdPart && (
        <SellerGuideWrapper>
          <PartnerSellerGuide />
        </SellerGuideWrapper>
      )}
    </Container>
  );
}
