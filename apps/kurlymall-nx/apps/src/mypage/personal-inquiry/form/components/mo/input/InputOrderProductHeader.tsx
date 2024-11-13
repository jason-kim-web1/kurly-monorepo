import MobileHeader from '../../../../../../shared/components/layouts/MobileHeader';
import HeaderButtons from '../../../../../../shared/components/layouts/HeaderButtons';
import HeaderTitle from '../../../../../../shared/components/layouts/HeaderTitle';
import CloseButton from '../../../../../../shared/components/Button/CloseButton';

interface Props {
  onClose(): void;
}

export default function InputOrderProductHeader({ onClose }: Props) {
  return (
    <MobileHeader visibleBanner={false}>
      <HeaderButtons position="left">
        <CloseButton onClick={onClose} />
      </HeaderButtons>
      <HeaderTitle>주문상품 선택</HeaderTitle>
    </MobileHeader>
  );
}
