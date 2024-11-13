import styled from '@emotion/styled';

import { NineteenProduct } from '../../../../../shared/images';
import COLOR from '../../../../../shared/constant/colorset';

const WrapAdultInformation = styled.p`
  position: relative;
  margin: 20px 0 -1px;
  padding: 19px 0 21px 81px;
  border-radius: 3px;
  background-color: ${COLOR.bgLightGray};
  font-size: 14px;
  color: ${COLOR.kurlyBlack};
  line-height: 20px;
  letter-spacing: -0.5px;
  &:before {
    content: '';
    position: absolute;
    left: 43px;
    top: 15px;
    width: 30px;
    height: 30px;
    background: url(${NineteenProduct}) no-repeat 50% 50%;
    background-size: 30px 30px;
  }
`;

export default function AdultInformation() {
  return (
    <WrapAdultInformation>
      미성년자는 구매할 수 없으며, 구매를 위해 만 19세 이상 성인인증이 필요합니다.
    </WrapAdultInformation>
  );
}
