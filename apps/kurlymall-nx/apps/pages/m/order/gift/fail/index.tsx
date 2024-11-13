import FailContainer from '../../../../../src/order/checkout/m/containers/FailContainer';
import SubPageLayout from '../../../../../src/shared/components/layouts/SubPageLayout';
import COLOR from '../../../../../src/shared/constant/colorset';

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
