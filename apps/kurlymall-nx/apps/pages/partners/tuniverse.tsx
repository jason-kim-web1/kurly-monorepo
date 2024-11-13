import styled from '@emotion/styled';

import BridgeContainer from '../../src/partners/tuniverse/containers/BridgeContainer';
import COLOR from '../../src/shared/constant/colorset';

const BgContainer = styled.div`
  background-color: ${COLOR.bgLightGray};
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WrappedBridgeContainer = styled.div`
  width: 414px;
  height: 100%;
  background-color: ${COLOR.kurlyWhite};
`;

const TUniversePage = () => {
  return (
    <BgContainer>
      <WrappedBridgeContainer>
        <BridgeContainer />
      </WrappedBridgeContainer>
    </BgContainer>
  );
};

export default TUniversePage;
