import FailContainer from '../../../../../src/order/subscribe/containers/FailContainer';
import COLOR from '../../../../../src/shared/constant/colorset';
import SubPageLayout from '../../../../../src/shared/components/layouts/SubPageLayout';
import AuthContainer from '../../../../../src/shared/components/Auth/AuthContainer';

const styles = {
  layout: {
    background: COLOR.bgLightGray,
  },
};

export default function FailPage() {
  return (
    <SubPageLayout css={styles.layout}>
      <AuthContainer loginRequired>
        <FailContainer />
      </AuthContainer>
    </SubPageLayout>
  );
}
