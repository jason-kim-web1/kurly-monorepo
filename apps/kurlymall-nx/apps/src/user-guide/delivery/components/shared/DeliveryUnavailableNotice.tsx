import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

const Container = styled.div`
  padding: 30px 15px;
  background-color: ${COLOR.kurlyWhite};
`;
const Content = styled.div`
  text-align: center;
  line-height: 1.5;
  padding: 14px 10px 16px;
  background-color: ${COLOR.bg};
`;

const Title = styled.h2`
  display: inline-block;
  height: 18px;
  padding-left: 19px;
  font-weight: 600;
  font-size: 12px;
  color: #b3130b;
  line-height: 18px;
  background: url(https://res.kurly.com/mobile/ico/1908/ico_noti_delivery_popup.png) no-repeat 0 50%;
  background-size: 14px 14px;
`;

export default function DeliveryUnavailableNotice() {
  return (
    <Container>
      <Content>
        <Title>
          일부 관공서, 학교, 병원, 시장, 공단지역, 산간지역, 백화점 등은 현장 상황에 따라 샛별배송이 불가능할 수
          있습니다.
        </Title>
      </Content>
    </Container>
  );
}
