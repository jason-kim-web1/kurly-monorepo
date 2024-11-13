import styled from '@emotion/styled';

import { ACTIVE_SERVICE_INFO } from '../../constants';
import COLOR from '../../../../shared/constant/colorset';

const ServiceTitle = styled.h3`
  padding-bottom: 18px;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
`;

const ServiceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  font-weight: 400;
  line-height: 24px;
`;

const ServiceName = styled.span`
  font-size: 16px;
`;

const CancelButton = styled.a`
  color: ${COLOR.kurlyGray450};
  text-decoration: underline;
`;

interface Props {
  isKurlyPay: boolean;
  isSubscribed: boolean;
  handleClickKurlyPayCancel: () => void;
  handleClickMembersCancel: () => void;
}

export default function ActiveServiceInfo({
  isKurlyPay,
  isSubscribed,
  handleClickKurlyPayCancel,
  handleClickMembersCancel,
}: Props) {
  return (
    <>
      <ServiceTitle>{ACTIVE_SERVICE_INFO.title}</ServiceTitle>
      {isSubscribed && (
        <ServiceItem>
          <ServiceName>{ACTIVE_SERVICE_INFO.kurlyMembersName}</ServiceName>
          <CancelButton onClick={handleClickMembersCancel}>해지하기</CancelButton>
        </ServiceItem>
      )}
      {isKurlyPay && (
        <ServiceItem>
          <ServiceName>{ACTIVE_SERVICE_INFO.kurlyPayName}</ServiceName>
          <CancelButton onClick={handleClickKurlyPayCancel}>해지하기</CancelButton>
        </ServiceItem>
      )}
    </>
  );
}
