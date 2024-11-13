import styled from '@emotion/styled';
import { head } from 'lodash';

import COLOR from '../../../../../../shared/constant/colorset';
import { useAppSelector } from '../../../../../../shared/store';

import AnswerContent from './AnswerContent';
import { getReturnGuideText } from '../../../../shared/utils/getReturnGuideText';

const AnswerNoti = styled.span`
  display: block;
  padding-top: 22px;
`;

const AnswerSubTitle = styled.strong`
  display: block;
  padding: 30px 0 6px;
  font-weight: 500;
  font-size: 15px;
  color: ${COLOR.kurlyPurple};
  line-height: 22px;

  &:first-of-type {
    padding-top: 0;
  }
`;

const AnswerItem = styled.span`
  display: block;

  &:before {
    content: '';
    display: inline-block;
    width: 3px;
    height: 3px;
    margin: 9px 4px 0 0;
    border-radius: 100%;
    background-color: ${COLOR.kurlyGray800};
    vertical-align: 4px;
  }
`;

export default function RefundExchangeGuide() {
  const isThirdPart = useAppSelector(({ productDetail }) => productDetail.isThirdPart);
  const deliveryTypeInfos = useAppSelector(({ productDetail }) => productDetail.deliveryTypeInfos);
  const returnInfo = useAppSelector(({ productDetail }) => productDetail.returnInfo);

  const deliveryInfo = head(deliveryTypeInfos) || { type: 'DAWN' };
  const returnGuideText = getReturnGuideText(isThirdPart, deliveryInfo.type, returnInfo);

  return (
    <>
      <AnswerContent title="01. 상품에 문제가 있는 경우">
        받으신 상품이 표시·광고 내용 또는 계약 내용과 다른 경우에는 상품을 받은 날부터 3개월 이내,{'\n'}그 사실을 알게
        된 날부터 30일 이내에 교환 및 환불을 요청하실 수 있습니다.{'\n'}
        상품의 정확한 상태를 확인할 수 있도록 사진을 함께 보내주시면 더 빠른 상담이 가능합니다.
        <AnswerNoti>※ 배송 상품에 문제가 있는 것으로 확인되면 배송비는 판매자가 부담합니다.</AnswerNoti>
      </AnswerContent>
      <AnswerContent title="02. 단순 변심, 주문 착오의 경우">
        <AnswerSubTitle>신선 / 냉장 / 냉동 식품</AnswerSubTitle>
        상품의 특성상 재판매가 불가하여 단순 변심, 주문 착오, 주소 오입력 등 고객의 책임 있는 사유로 인한 교환 및 반품이
        어려운 점 양해 부탁드립니다.{'\n'}
        상품에 따라 조금씩 맛이 다를 수 있으며, 개인의 기호에 따라 같은 상품도 다르게 느끼실 수 있습니다.
        <AnswerSubTitle>
          유통기한 30일 이상 식품 (신선 / 냉장 / 냉동 제외) &amp; 기타 상품 (뷰티 제품, 생활용품)
        </AnswerSubTitle>
        상품을 받은 날부터 7일 이내 교환, 반품이 가능합니다. 고객행복센터로 문의해주세요.
        <AnswerNoti>{returnGuideText}</AnswerNoti>
      </AnswerContent>
      <AnswerContent title="03. 교환·반품이 불가한 경우">
        다음에 해당하는 교환·환불 신청은 처리가 어려울 수 있으니 양해 부탁드립니다.{'\n\n'}
        <AnswerItem>
          고객님의 책임 있는 사유로 상품이 멸실되거나 훼손된 경우{'\n'}
          (단, 상품의 내용을 확인하기 위해 포장 등을 훼손한 경우는 제외)
        </AnswerItem>
        <AnswerItem>고객님의 사용 또는 일부 소비로 상품의 가치가 감소한 경우</AnswerItem>
        <AnswerItem>시간이 지나 다시 판매하기 곤란할 정도로 상품의 가치가 감소한 경우</AnswerItem>
        <AnswerItem>복제가 가능한 상품의 포장이 훼손된 경우</AnswerItem>
        <AnswerItem>고객님의 주문에 따라 개별적으로 생산되는 상품의 제작이 이미 진행된 경우</AnswerItem>
        <AnswerItem>반품 신청 후 14일 내에 물품이 반환되지 않고 고객님과 연락이 되지 않는 경우</AnswerItem>
      </AnswerContent>
    </>
  );
}
