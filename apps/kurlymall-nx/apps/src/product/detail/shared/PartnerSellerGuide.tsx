import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';
import { InformationMark } from '../../../shared/icons';
import { isPC } from '../../../../util/window/getDevice';

const Container = styled.div`
  width: 100%;
  background-color: ${COLOR.kurlyGray100};
  padding: 18px;
  margin-top: ${isPC ? '20px' : '0'};
  border-radius: 6px;

  .title {
    display: flex;
    align-items: center;

    > svg {
      margin-right: 6px;
    }
    > span {
      color: ${COLOR.kurlyGray800};
      font-size: 13px;
      line-height: 19px;
    }
  }
  .description {
    color: ${COLOR.kurlyGray450};
    font-size: 13px;
    line-height: 18px;
    padding-top: 2px;
    word-break: break-word;
  }
`;

export default function PartnerSellerGuide() {
  return (
    <Container>
      <div className="title">
        <InformationMark />
        <span>본 상품은 파트너사가 판매하는 상품입니다.</span>
      </div>
      <p className="description">
        컬리는 통신판매중개자로서 통신판매의 당사자가 아닙니다.{'\n'}본 상품의 광고, 주문, 품질, 교환/환불 등의 의무와
        책임은 각 판매자에게 있습니다.
      </p>
    </Container>
  );
}
