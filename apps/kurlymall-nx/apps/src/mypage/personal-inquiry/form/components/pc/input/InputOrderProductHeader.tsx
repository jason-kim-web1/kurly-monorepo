import styled from '@emotion/styled';
import { isMobile } from 'react-device-detect';

const Container = styled.div`
  padding: 25px 20px 18px;
`;

const Header = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '24px',
  color: '#333333',
});

const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  background: url('https://res.kurly.com/kurly/ico/2021/popup_close.svg') 50% 50% no-repeat;
  background-size: 32px 32px;
  border: 0;
`;

const HeaderText = styled.span({
  color: '#333333',
  fontSize: isMobile ? '1rem' : '24px',
  lineHeight: '40px',
  fontWeight: 500,
});

const Description = styled.div`
  font-size: 14px;
  line-height: 18px;
  margin-top: 9px;
  color: #999;
`;

interface Props {
  onClose(): void;
}

export default function InputOrderProductHeader({ onClose }: Props) {
  return (
    <Container>
      <Header>
        <HeaderText>주문상품 선택</HeaderText>
        <CloseButton onClick={onClose} />
      </Header>
      <Description>동일 주문번호 내의 상품만 중복으로 선택 가능합니다.</Description>
    </Container>
  );
}
