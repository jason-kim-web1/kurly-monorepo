import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { isPC } from '../../../../../util/window/getDevice';
import InputGroup from '../../../../shared/components/InputGroup/InputGroup';

const Container = styled.div`
  color: ${COLOR.kurlyGray600};
  line-height: ${isPC ? '22px' : '1.5'};
`;

const Content = styled.div`
  padding-top: ${isPC ? '10px' : 0};
`;

const Emph = styled.strong`
  display: block;
  padding: 19px 0 12px;
  font-weight: ${isPC ? 'normal' : '600'};
  color: ${COLOR.kurlyPurple};
`;

const Item = styled.li`
  word-break: keep-all;
`;

export default function LeaveInfo() {
  return (
    <Container>
      <InputGroup label="회원탈퇴안내" colspan={true}>
        <Content>
          고객님께서 회원 탈퇴를 원하신다니 저희 쇼핑몰의 서비스가 많이 부족하고 미흡했나 봅니다. 불편하셨던 점이나
          불만사항을 알려주시면 적극 반영해서 고객님의 불편함을 해결해 드리도록 노력하겠습니다.
          <Emph>아울러 회원 탈퇴시의 아래 사항을 숙지하시기 바랍니다.</Emph>
          <ul>
            <Item>
              1. 회원 탈퇴 시 고객님의 정보는 상품 반품 및 A/S를 위해 전자상거래 등에서의 소비자 보호에 관한 법률에
              의거한 고객정보 보호정책에따라 관리 됩니다.
            </Item>
            <Item>2. 탈퇴 시 고객님께서 보유하셨던 적립금은 모두 삭제 됩니다.</Item>
            <Item>3. 회원 탈퇴 후 3개월간 재가입이 불가능합니다.</Item>
            <Item>
              4. 컬리패스 해지는 컬리 앱 또는 고객행복센터(1644-1107)를 통해서 가능합니다. 회원 탈퇴 시 이용 중이던
              컬리패스는 서비스 제공 및 이용료 결제가 중단됩니다.
            </Item>
          </ul>
        </Content>
      </InputGroup>
    </Container>
  );
}
