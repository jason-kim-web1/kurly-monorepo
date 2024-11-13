import COLOR from '../../../../src/shared/constant/colorset';

import SuccessContainer from '../../../../src/order/checkout/pc/containers/SuccessContainer';
import SubPageLayout from '../../../../src/shared/components/layouts/SubPageLayout';

const styles = {
  layout: {
    background: COLOR.bg,
  },
};

export default function SuccessPage() {
  return (
    <SubPageLayout css={styles.layout}>
      <SuccessContainer />
    </SubPageLayout>
  );
}
