import { BUTTON_TITLE } from '../../constants/DeliveryNoticeButton';
import BottomSheetButton from './BottomSheetButton';
import DeliveryNoticeContents from './DeliveryNoticeContents';
import FullTypeBottomSheet from '../../../../shared/components/KPDS/FullTypeBottomSheet';
import { DeliveryNotice } from '../../interface/DeliveryNotice';

interface NoticeBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  noticeContents: DeliveryNotice;
  onClickCheckoutButton: () => Promise<void>;
}

export default function NoticeBottomSheet({
  isOpen,
  onClose,
  noticeContents,
  onClickCheckoutButton,
}: NoticeBottomSheetProps) {
  return (
    <FullTypeBottomSheet
      isOpen={isOpen}
      close={onClose}
      fixedBottomContent={
        <BottomSheetButton onClickCheckoutButton={onClickCheckoutButton} buttonTitle={BUTTON_TITLE} />
      }
    >
      <DeliveryNoticeContents deliveryNotice={noticeContents} />
    </FullTypeBottomSheet>
  );
}
