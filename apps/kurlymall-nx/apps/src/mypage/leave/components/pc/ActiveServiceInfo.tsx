import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import InputGroup from '../../../../shared/components/InputGroup/InputGroup';
import { ACTIVE_SERVICE_INFO } from '../../constants';

const Container = styled.div`
  line-height: 20px;
`;

const Content = styled.div`
  padding-top: 12px;
`;

const ServiceItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 316px;
  height: 20px;
  font-weight: 400;
  letter-spacing: -0.5px;

  &:first-of-type {
    margin-bottom: 20px;
  }
`;

const CancelButton = styled.button`
  font-weight: 500;
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
    <Container>
      <InputGroup label="회원탈퇴 불가 안내" colspan={true}>
        <Content>아래 사유로 인해 즉시 탈퇴가 불가합니다. 아래 사유를 확인해주세요.</Content>
      </InputGroup>
      <InputGroup label={ACTIVE_SERVICE_INFO.title} colspan={true}>
        <Content>
          {isSubscribed && (
            <ServiceItem>
              {ACTIVE_SERVICE_INFO.kurlyMembersName}
              <CancelButton onClick={handleClickMembersCancel}>해지하기</CancelButton>
            </ServiceItem>
          )}
          {isKurlyPay && (
            <ServiceItem>
              {ACTIVE_SERVICE_INFO.kurlyPayName}
              <CancelButton onClick={handleClickKurlyPayCancel}>해지하기</CancelButton>
            </ServiceItem>
          )}
        </Content>
      </InputGroup>
    </Container>
  );
}
