import styled from '@emotion/styled';

import { DeactivationProps, DeliveryType } from '../../../interfaces/ShippingAddress';

import COLOR from '../../../constant/colorset';
import { KURLY_DELIVERY } from '../../../constant';

const Wrapper = styled.div();

const Title = styled.strong<{ deactivation: boolean }>`
  display: block;
  ${({ deactivation }) => (deactivation ? 'padding: 40px 0 14px' : 'padding: 40px 0 34px')};
  font-size: 24px;
  font-weight: 500;
  line-height: 30px;
  color: #333;
  text-align: center;
`;

const colors: Record<DeliveryType, string> = {
  direct: COLOR.kurlyPurple,
  indirect: COLOR.validBlue,
  disable: COLOR.invalidRed,
};

const DeliveryArea = styled.span<{ type: DeliveryType }>`
  color: ${({ type }) => colors[type]};
`;

const Description = styled.p`
  display: block;
  padding-top: 8px;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  color: ${COLOR.kurlyGray600};
`;

const DescriptionSubText = styled(Description)<{ type: DeliveryType }>`
  color: ${({ type }) => colors[type]};
  padding-top: 0;
`;

const RegionNotice = styled.p`
  overflow: hidden;
  padding: 12px 0;
  margin-bottom: 34px;
  background-color: ${COLOR.kurlyGray100};
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.33;
  color: ${COLOR.kurlyGray600};
  text-align: center;
`;

const Delivery: Record<DeliveryType, { text: string; info: string; subText?: string }> = {
  direct: {
    text: KURLY_DELIVERY.direct,
    info: '매일 새벽, 문 앞까지 신선함을 전해드려요.',
  },
  indirect: {
    text: KURLY_DELIVERY.indirect,
    info: '오늘 주문하면 다음 날 바로 도착해요.',
    subText: '지역별 배송 휴무 정책은 배송안내를 참고해주세요',
  },
  disable: {
    text: KURLY_DELIVERY.disable,
    info: '더 많은 곳에 배송될 수 있게 최선을 다하겠습니다.',
  },
};

interface Props {
  type: DeliveryType;
  deactivation?: DeactivationProps;
}

export default function DeliveryPolicyInfo({ type, deactivation }: Props) {
  return (
    <Wrapper>
      <Title deactivation={Boolean(deactivation)}>
        <DeliveryArea type={type}>{Delivery[type].text}</DeliveryArea> 지역입니다.
        <Description>{Delivery[type].info}</Description>
        {Delivery[type].subText && <DescriptionSubText type={type}>{Delivery[type].subText}</DescriptionSubText>}
      </Title>
      {deactivation && deactivation.startAt !== null && deactivation.endAt !== null && (
        <RegionNotice data-testid="deactivation-notice">
          {deactivation.startAt.slice(0, 2)}
          시~
          {deactivation.endAt.slice(0, 2)}시 주문은 택배로 배송되며 <br />
          다음날 밤 12시 이전 도착합니다.
        </RegionNotice>
      )}
    </Wrapper>
  );
}
