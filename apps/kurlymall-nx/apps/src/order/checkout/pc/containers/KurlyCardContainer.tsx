import InformationRow from '../../../../shared/components/layouts/InformationRow';
import COLOR from '../../../../shared/constant/colorset';
import KurlyCard from '../components/KurlyCard';
import useIssuanceKurlypayCard from '../../shared/hooks/useIssuanceKurlypayCard';
import usePlccPoint from '../../shared/hooks/usePlccPoint';
import { useAppSelector } from '../../../../shared/store';

const styles = {
  layout: {
    borderTop: `1px solid ${COLOR.bg}`,
  },
};

export default function KurlyCardContainer() {
  const { handleCardFormSubmit } = useIssuanceKurlypayCard();
  const { isPLCCExisted, selectedPlccPoint, handlePointCheckbox } = usePlccPoint();
  const hasKurlypayError = useAppSelector(({ checkoutPayment }) => checkoutPayment.hasKurlypayError);
  const usedPoint = useAppSelector(({ checkout }) => checkout.usedPoint);

  return (
    <InformationRow title="즉시 할인" css={styles.layout}>
      <KurlyCard
        isPLCCExisted={isPLCCExisted}
        isSelectedPoint={selectedPlccPoint}
        onClickPoint={handlePointCheckbox}
        onClickIssueCard={handleCardFormSubmit}
        disabled={hasKurlypayError || usedPoint > 0}
      />
    </InformationRow>
  );
}
