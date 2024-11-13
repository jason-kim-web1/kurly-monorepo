import styled from '@emotion/styled';

import MobileNavigationBar from '../../../../../../src/header/containers/m/MobileNavigationBar';
import { BUTTON_TYPE } from '../../../../../../src/shared/services';
import FailContainer from '../../../../../../src/order/checkout/m/containers/FailContainer';
import useNavigator from '../../../../../../src/shared/hooks/useNavigator';

const Wrapper = styled.div`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: absolute;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export default function FailPage() {
  const { goToHome: handleClickClose } = useNavigator();

  return (
    <Wrapper>
      <MobileNavigationBar
        title="주문 실패"
        appNavigatorButtonType={BUTTON_TYPE.close}
        leftButtonType={BUTTON_TYPE.close}
        onClickLeftButton={handleClickClose}
      />
      <FailContainer isJoinOrder />
    </Wrapper>
  );
}
