import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

import { ProductInfoDictionaryItem } from '../../../../types';

import COLOR from '../../../../../../shared/constant/colorset';

import ProductNoticeTable from './ProductNoticeTable';
import PartnerSellerGuide from '../../../../shared/PartnerSellerGuide';

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
      {isThirdPart && <PartnerSellerGuide />}
    </Container>
  );
}
