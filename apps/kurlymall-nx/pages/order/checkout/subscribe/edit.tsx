import { css } from '@emotion/react';

import SubPageLayout from '../../../../src/shared/components/layouts/SubPageLayout';
import MembersEditPaymentContainer from '../../../../src/order/subscribe/containers/MembersEditPaymentContainer';

import COLOR from '../../../../src/shared/constant/colorset';
import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';

const LayoutStyle = css`
  background: ${COLOR.bg};
`;

export default function EditCheckoutSubscribePage() {
  return (
    <SubPageLayout css={LayoutStyle}>
      <AuthContainer loginRequired>
        <MembersEditPaymentContainer />
      </AuthContainer>
    </SubPageLayout>
  );
}
