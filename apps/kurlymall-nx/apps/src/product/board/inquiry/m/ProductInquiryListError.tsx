import styled from '@emotion/styled';

import { ErrorIconImg } from '../../../../shared/images';
import COLOR from '../../../../shared/constant/colorset';

const Container = styled.div`
  width: 100%;
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.25;
  letter-spacing: -0.3px;
  color: ${COLOR.kurlyGray400};
  font-size: 16px;
  font-weight: 400;
`;

const WarningImage = styled.div`
  display: block;
  width: 68px;
  height: 68px;
  background: url(${ErrorIconImg});
  background-size: cover;
  margin-bottom: 10px;
`;

export default function ProductInquiryListError() {
  return (
    <Container>
      <WarningImage />
      <span>일시적인 오류가 발생했습니다.</span>
      <span>잠시 후 다시 시도해주세요.</span>
    </Container>
  );
}
