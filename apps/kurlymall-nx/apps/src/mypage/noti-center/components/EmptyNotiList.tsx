import styled from '@emotion/styled';

import { EmptyBellIcon } from '../../../shared/images';
import COLOR from '../../../shared/constant/colorset';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Image = styled.img`
  margin-bottom: 8px;
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  color: ${COLOR.kurlyGray500};
`;

export default function EmptyNotiList() {
  return (
    <Container>
      <Image src={EmptyBellIcon} alt="아직 도착한 알림이 없어요." />
      <Title>아직 도착한 알림이 없어요.</Title>
    </Container>
  );
}
