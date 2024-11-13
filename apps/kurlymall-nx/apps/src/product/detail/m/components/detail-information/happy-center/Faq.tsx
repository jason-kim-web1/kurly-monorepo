import { Fragment, ReactElement, useState } from 'react';

import styled from '@emotion/styled';

import { head } from 'lodash';

import COLOR from '../../../../../../shared/constant/colorset';
import { Arrow10x4C898989 } from '../../../../../../shared/images';
import { getReturnGuideText } from '../../../../shared/utils/getReturnGuideText';
import { DeliveryInfoType } from '../../../../../types';
import { ProductReturnInfo } from '../../../../types';

const Container = styled.div``;

const FaqButton = styled.button<{ isOpenAnswer: boolean }>`
  display: block;
  position: relative;
  width: 100%;
  padding: 14px 0 16px;
  border-bottom: ${(props) => (props.isOpenAnswer ? 'none' : '1px solid ${COLOR.bg};')};
  font-weight: 600;
  font-size: 13px;
  color: ${COLOR.kurlyPurple};

  &:first-of-type {
    border-top: 1px solid ${COLOR.bg};
  }

  &:after {
    content: '';
    position: absolute;
    right: 23px;
    top: 50%;
    width: 10px;
    height: 4px;
    margin-top: -2px;
    background: url(${Arrow10x4C898989}) no-repeat 50% 50%;
    transform: ${(props) => (props.isOpenAnswer ? 'rotate(0)' : 'rotate(180deg)')};
  }
`;

const AnswerWrapper = styled.div`
  padding: 30px 16px;
  background-color: ${COLOR.bg};
  font-size: 13px;
  color: ${COLOR.kurlyGray800};
  line-height: 18px;
  text-align: center;
  white-space: pre-line;
`;

const AnswerSubject = styled.strong`
  display: block;
  padding: 30px 0 11px;
  font-size: 12px;
  color: ${COLOR.kurlyPurple};
  line-height: 17px;

  &:first-of-type {
    padding-top: 0;
  }
`;

const AnswerNoti = styled.strong`
  display: block;
  padding-top: 32px;
  font-weight: 400;
  font-size: 12px;
  color: ${COLOR.kurlyGray600};
  line-height: 17px;
`;

const AnswerList = styled.ul`
  padding-top: 9px;
`;

const AnswerItem = styled.li`
  padding-top: 16px;
  font-size: 12px;
  color: ${COLOR.kurlyGray600};
  line-height: 18px;

  &:before {
    content: '·';
    display: inline-block;
    margin-right: 5px;
    font-size: 20px;
    color: ${COLOR.kurlyGray600};
    vertical-align: -2px;
  }
`;

function FaqFirstContent() {
  return (
    <AnswerWrapper>
      받으신 상품이 표시·광고 내용 또는 계약 내용과{'\n'}
      다른 경우에는 상품을 받은 날부터 3개월 이내,{'\n'}그 사실을 알게 된 날부터 30일 이내에{'\n'}
      교환 및 환불을 요청하실 수 있습니다.{'\n\n'}
      상품의 정확한 상태를 확인할 수 있도록{'\n'}
      사진을 함께 보내주시면 더 빠른 상담이 가능합니다.
      <AnswerNoti>※ 배송 상품에 문제가 있는 것으로 확인되면 배송비는 판매자가 부담합니다.</AnswerNoti>
    </AnswerWrapper>
  );
}

function FaqSecondContent({ returnGuideText }: { returnGuideText: string }) {
  return (
    <AnswerWrapper>
      <AnswerSubject>신선 / 냉장 / 냉동 식품</AnswerSubject>
      상품의 특성상 재판매가 불가하여{'\n'}
      단순 변심, 주문 착오, 주소 오입력 등{'\n'}
      고객의 책임 있는 사유로 인한 교환 및 반품이 어려운 점{'\n'}
      양해 부탁드립니다.{'\n\n'}
      상품에 따라 조금씩 맛이 다를 수 있으며,{'\n'}
      개인의 기호에 따라 같은 상품도 다르게 느끼실 수 있습니다.
      <AnswerSubject>
        유통기한 30일 이상 식품{'\n'}
        (신선 / 냉장 / 냉동 제외) &amp; 기타 상품 (뷰티 제품, 생활용품)
      </AnswerSubject>
      상품을 받은 날부터 7일 이내 교환, 반품이 가능합니다.{'\n'}
      고객행복센터로 문의해주세요.
      <AnswerNoti>{returnGuideText}</AnswerNoti>
    </AnswerWrapper>
  );
}

function FaqThirdContent() {
  return (
    <AnswerWrapper>
      <AnswerSubject>신선 / 냉장 / 냉동 식품</AnswerSubject>
      다음에 해당하는 교환·환불 신청은{'\n'}
      처리가 어려울 수 있으니 양해 부탁드립니다.
      <AnswerList>
        <AnswerItem>
          고객님의 책임 있는 사유로 상품이 멸실되거나 훼손된 경우{'\n'}
          (단, 상품의 내용을 확인하기 위해 포장 등을 훼손한 경우는 제외)
        </AnswerItem>
        <AnswerItem>고객님의 사용 또는 일부 소비로 상품의 가치가 감소한 경우</AnswerItem>
        <AnswerItem>시간이 지나 다시 판매하기 곤란할 정도로 상품의 가치가 감소한 경우</AnswerItem>
        <AnswerItem>복제가 가능한 상품의 포장이 훼손된 경우</AnswerItem>
        <AnswerItem>고객님의 주문에 따라 개별적으로 생산되는 상품의 제작이 이미 진행된 경우</AnswerItem>
        <AnswerItem>반품 신청 후 14일 내에 물품이 반환되지 않고 고객님과 연락이 되지 않는 경우</AnswerItem>
      </AnswerList>
    </AnswerWrapper>
  );
}

type RenderContentType = {
  returnGuideText: string;
};

interface FaqDataType {
  title: string;
  isOpenAnswer: boolean;
  renderContent: ({ returnGuideText }: RenderContentType) => ReactElement;
}

const faqsData: FaqDataType[] = [
  {
    title: '01. 상품에 문제가 있는 경우',
    isOpenAnswer: false,
    renderContent: FaqFirstContent,
  },
  {
    title: '02. 단순 변심, 주문 착오의 경우',
    isOpenAnswer: false,
    renderContent: FaqSecondContent,
  },
  {
    title: '03. 교환·반품이 불가한 경우',
    isOpenAnswer: false,
    renderContent: FaqThirdContent,
  },
];

interface Props {
  isThirdPart: boolean;
  deliveryTypeInfos: DeliveryInfoType[];
  returnInfo: ProductReturnInfo;
}

export default function Faq({ isThirdPart, deliveryTypeInfos, returnInfo }: Props) {
  const [faqs, setFaqs] = useState(faqsData);

  const deliveryInfo = head(deliveryTypeInfos) || { type: 'DAWN' };
  const returnGuideText = getReturnGuideText(isThirdPart, deliveryInfo.type, returnInfo);

  const onClickAnswerOpen = (title: string) => {
    setFaqs(faqs.map((faq) => (faq.title === title ? { ...faq, isOpenAnswer: !faq.isOpenAnswer } : faq)));
  };

  return (
    <Container>
      {faqs.map(({ title, isOpenAnswer, renderContent }) => (
        <Fragment key={title}>
          <FaqButton isOpenAnswer={isOpenAnswer} onClick={() => onClickAnswerOpen(title)}>
            {title}
          </FaqButton>
          {isOpenAnswer && renderContent({ returnGuideText })}
        </Fragment>
      ))}
    </Container>
  );
}
