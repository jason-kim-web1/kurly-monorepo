import COLOR from '../../../../src/shared/constant/colorset';

import SubPageLayout from '../../../../src/shared/components/layouts/SubPageLayout';
import FailContainer from '../../../../src/order/checkout/pc/containers/FailContainer';

const styles = {
  layout: {
    background: COLOR.bg,
  },
};

export default function FailPage() {
  return (
    <SubPageLayout css={styles.layout}>
      <FailContainer />
    </SubPageLayout>
  );
}
