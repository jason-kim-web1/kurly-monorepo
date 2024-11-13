import SuccessContainer from '../../../../../src/order/subscribe/containers/SuccessContainer';
import COLOR from '../../../../../src/shared/constant/colorset';
import SubPageLayout from '../../../../../src/shared/components/layouts/SubPageLayout';
import AuthContainer from '../../../../../src/shared/components/Auth/AuthContainer';

const styles = {
  layout: {
    background: COLOR.bgLightGray,
  },
};

export default function SuccessPage() {
  return (
    <SubPageLayout css={styles.layout}>
      <AuthContainer loginRequired>
        <SuccessContainer />
      </AuthContainer>
    </SubPageLayout>
  );
}
