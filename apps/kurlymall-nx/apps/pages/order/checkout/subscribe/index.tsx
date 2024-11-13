import { css } from '@emotion/react';

import MembersSubscribeCheckoutContainer from '../../../../src/order/subscribe/containers/MembersSubscribeCheckoutContainer';
import SubPageLayout from '../../../../src/shared/components/layouts/SubPageLayout';

import COLOR from '../../../../src/shared/constant/colorset';
import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';

const LayoutStyle = css`
  background: ${COLOR.bg};
`;

export default function CheckoutSubscribePage() {
  return (
    <SubPageLayout css={LayoutStyle}>
      <AuthContainer loginRequired>
        <MembersSubscribeCheckoutContainer />
      </AuthContainer>
    </SubPageLayout>
  );
}
