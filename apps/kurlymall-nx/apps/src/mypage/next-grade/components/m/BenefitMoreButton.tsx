import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { ArrowPurple } from '../../../../shared/images';

const Container = styled.div`
  padding-bottom: 27px;
  border-bottom: 10px solid ${COLOR.bg};
  text-align: center;
`;

const LinkLovers = styled.a`
  padding-right: 15px;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: ${COLOR.kurlyPurple};
  background: url(${ArrowPurple}) no-repeat 100% 50%;
  background-size: 10px 10px;
`;

export default function BenefitMoreButton() {
  return (
    <Container>
      <LinkLovers href="/m2/html.php?htmid=event/kurly.htm&name=lovers">컬리러버스 등급 혜택 전체 보기</LinkLovers>
    </Container>
  );
}
