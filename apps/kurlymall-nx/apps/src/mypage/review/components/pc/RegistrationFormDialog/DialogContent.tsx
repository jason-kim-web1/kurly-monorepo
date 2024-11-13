import ReviewModalProductContent from '../ReviewModal/ReviewModalProductContent';
import ReviewGuide from '../../shared/ReviewGuide';
import { RegistrationForm } from './RegistrationForm';

interface Props {
  dialogData: {
    contentsProductNo: number;
    dealProductNo: number;
    orderNo: number;
  };
  onClose(): void;
  onCheckFormChangeAndClose(): void;
  onFormChange(isChanged: boolean): void;
  onRegistrationSuccess(): void;
}

export const DialogContent = ({
  dialogData,
  onClose,
  onFormChange,
  onCheckFormChangeAndClose,
  onRegistrationSuccess,
}: Props) => {
  const { contentsProductNo, dealProductNo, orderNo } = dialogData;
  return (
    <>
      <ReviewModalProductContent contentsProductNo={contentsProductNo} dealProductNo={dealProductNo} />
      <ReviewGuide />
      <RegistrationForm
        orderNo={orderNo}
        dealProductNo={dealProductNo}
        onClose={onClose}
        onCheckFormChangeAndClose={onCheckFormChangeAndClose}
        onFormChange={onFormChange}
        onSuccess={onRegistrationSuccess}
      />
    </>
  );
};
