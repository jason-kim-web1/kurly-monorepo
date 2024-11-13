import styled from '@emotion/styled';

import { NineteenProduct } from '../../../../../../shared/images';
import COLOR from '../../../../../../shared/constant/colorset';

const WrapAdultInformation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  margin-top: 16px;
  border-radius: 3px;
  background-color: ${COLOR.bg};
`;

const AdultInformationWrapper = styled.span`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const Image = styled.img`
  width: 36px;
  height: 36px;
  margin-right: 12px;
`;

const Text = styled.span`
  font-weight: 500;
  font-size: 13px;
  color: ${COLOR.kurlyBlack};
  line-height: 16px;
  white-space: pre-line;
`;

export default function AdultInformation() {
  return (
    <WrapAdultInformation>
      <AdultInformationWrapper>
        <Image src={NineteenProduct} alt="19" />
        <Text>미성년자는 구매할 수 없으며, 구매를 위해{'\n'}만 19세 이상 성인인증이 필요합니다.</Text>
      </AdultInformationWrapper>
    </WrapAdultInformation>
  );
}
