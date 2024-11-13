import styled from '@emotion/styled';

import COLOR from '../../../../../../shared/constant/colorset';

import SectionWrapper from '../../SectionWrapper';
import HappyCenterGuide from './HappyCenterGuide';
import Faq from './Faq';
import { DeliveryInfoType } from '../../../../../types';
import { ProductReturnInfo } from '../../../../types';

const HappyCenterHeader = styled.div`
  padding-top: 51px;
  border-top: 8px solid ${COLOR.bg};
`;

const Title = styled.h5`
  font-weight: 600;
  font-size: 16px;
  color: ${COLOR.kurlyGray600};
  text-align: center;
`;

const SubTitleWrapper = styled.p`
  padding: 13px 10px 0;
  font-weight: 600;
  font-size: 12px;
  color: ${COLOR.kurlyGray600};
  line-height: 19px;
  text-align: center;
`;

const SubEmph = styled.span`
  display: block;
  width: 260px;
  margin: 22px auto 0;
  padding: 13px 0 14px;
  border-top: 1px solid ${COLOR.bg};
  border-bottom: 1px solid ${COLOR.bg};
  font-weight: 400;
  line-height: 18px;
  white-space: pre-line;
`;

interface Props {
  isThirdPart: boolean;
  deliveryTypeInfos: DeliveryInfoType[];
  returnInfo: ProductReturnInfo;
}

export default function HappyCenter({ isThirdPart, deliveryTypeInfos, returnInfo }: Props) {
  return (
    <SectionWrapper>
      <HappyCenterHeader>
        <Title>고객행복센터</Title>
        <SubTitleWrapper>
          궁금하신 점이나 서비스 이용에 불편한 점이 있으신가요?
          <SubEmph>
            문제가 되는 부분을 사진으로 찍어{'\n'}
            아래 중 편하신 방법으로 접수해 주시면{'\n'}
            빠르게 도와드리겠습니다.
          </SubEmph>
        </SubTitleWrapper>
      </HappyCenterHeader>
      <HappyCenterGuide />
      <Faq isThirdPart={isThirdPart} deliveryTypeInfos={deliveryTypeInfos} returnInfo={returnInfo} />
    </SectionWrapper>
  );
}
