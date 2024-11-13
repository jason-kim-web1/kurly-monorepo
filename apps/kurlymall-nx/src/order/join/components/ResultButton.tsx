import MobileFooter from '../../../shared/components/layouts/MobileFooter';
import Button from '../../../shared/components/Button/Button';
import useCheckoutResult from '../../shared/shared/hooks/useCheckoutResult';

export default function ResultButton() {
  const { moveHomePage, moveOrderListPage } = useCheckoutResult();

  return (
    <MobileFooter columnGap transparent>
      <Button theme="tertiary" text="주문 상세보기" radius={6} height={52} onClick={moveOrderListPage} />
      <Button text="쇼핑 계속하기" radius={6} height={52} onClick={moveHomePage} />
    </MobileFooter>
  );
}
