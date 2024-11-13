import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import Info from '../../../../shared/icons/Info';

const InfoText = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0 15px 20px;
  color: ${COLOR.kurlyGray450};
  background-color: ${COLOR.kurlyGray100};
`;

const InfoIco = styled.div`
  display: flex;
  margin-right: 10px;
`;

export default function AddressTopText() {
  return (
    <InfoText>
      <InfoIco>
        <Info />
      </InfoIco>
      배송지에 따라 상품정보 및 배송유형이 달라질 수 있습니다.
    </InfoText>
  );
}
