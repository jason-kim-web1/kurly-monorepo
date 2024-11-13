import styled from '@emotion/styled';

import COLOR from '../../../../src/shared/constant/colorset';

import SubPageLayout from '../../../../src/shared/components/layouts/SubPageLayout';
import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';
import CancelContainer from '../../../../src/mypage/order/pc/cancel/containers/CancelContainer';

const styles = {
  layout: {
    background: COLOR.bg,
  },
};

const Title = styled.h2`
  display: block;
  padding-bottom: 30px;
  font-size: 28px;
  line-height: 35px;
  font-weight: 500;
  text-align: center;
`;

export default function OrderCancelPage() {
  return (
    <SubPageLayout css={styles.layout}>
      <Title>주문 취소</Title>
      <AuthContainer loginRequired>
        <CancelContainer />
      </AuthContainer>
    </SubPageLayout>
  );
}