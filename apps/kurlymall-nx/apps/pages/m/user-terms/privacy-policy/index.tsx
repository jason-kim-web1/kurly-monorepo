import styled from '@emotion/styled';

import COLOR from '../../../../src/shared/constant/colorset';
import { useWebview } from '../../../../src/shared/hooks';

import UserTermsView from '../../../../src/user-terms/components/UserTermsView';
import SelectBox from '../../../../src/shared/components/Input/SelectBox';
import UserMenu from '../../../../src/shared/components/layouts/UserMenu';
import useUserTerms from '../../../../src/user-terms/hooks/useUserTerms';
import MobileNavigationBar from '../../../../src/header/containers/m/MobileNavigationBar';

const Container = styled.div`
  margin: 0;
  background-color: ${COLOR.bg};
`;

const PolicyLayout = styled.div`
  padding: 10px 0 70px;
  color: ${COLOR.kurlyGray800};
  line-height: 1.5;
  letter-spacing: 0;
`;

const headerTitle = '컬리 개인정보 처리방침';

export default function PrivacyPolicyPage() {
  const webview = useWebview();
  const { details, value, options, handleChange } = useUserTerms('privacyPolicy');

  return (
    <>
      <MobileNavigationBar title={headerTitle} leftButtonType="back" rightButtonTypes={['delivery', 'cart']} />

      {!webview && <UserMenu isGutter={false} />}

      <Container>
        <PolicyLayout>
          <UserTermsView isMobile html={details ?? ''} />
          <SelectBox name={'privacyPolicy'} value={value ?? ''} options={options} onChange={handleChange} />
        </PolicyLayout>
      </Container>
    </>
  );
}
