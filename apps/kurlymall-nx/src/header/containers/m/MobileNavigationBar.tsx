import { useEffect } from 'react';

import HeaderButtons from '../../../shared/components/layouts/HeaderButtons';
import HeaderTitle from '../../../shared/components/layouts/HeaderTitle';
import MobileHeader from '../../../shared/components/layouts/MobileHeader';
import { isPC, isWebview } from '../../../../util/window/getDevice';
import { useWebview } from '../../../shared/hooks';
import appService from '../../../shared/services/app.service';
import useMobileWebHeaderButton from '../../hooks/useMobileWebHeaderButton';
import { RightButtonType } from '../../constants/mobileWebHeader';
import { ButtonType } from '../../../shared/services';

interface MobileNavigatorBarProps {
  title: string;
  hideBottomLine?: boolean;

  //좌측버튼 (중복노출 불가능)
  leftButtonType?: ButtonType;
  onClickLeftButton?: () => void; //좌측버튼 동작 (기본동작은 뒤로가기)

  //우측버튼 (중복노출 가능)
  rightButtonTypes?: RightButtonType[];

  //앱 네이게이터 버튼
  appNavigatorButtonType?: ButtonType;
}

export default function MobileNavigationBar({
  title,
  leftButtonType,
  onClickLeftButton,
  rightButtonTypes,
  appNavigatorButtonType,
  hideBottomLine = false,
}: MobileNavigatorBarProps) {
  const webview = useWebview();
  const { renderLeftButton, renderRightButtons } = useMobileWebHeaderButton({
    leftButtonType,
    onClickLeftButton,
    rightButtonTypes,
  });

  useEffect(() => {
    if (appNavigatorButtonType && isWebview()) {
      appService.setNavigationButton({
        buttonType: appNavigatorButtonType,
      });
    }
  }, [appNavigatorButtonType]);

  useEffect(() => {
    if (webview) {
      appService.changeTitle(title);
    }
  }, [title, webview]);

  if (isPC || webview) {
    return null;
  }

  return (
    <MobileHeader hideBottomLine={hideBottomLine}>
      <HeaderButtons position="left">{renderLeftButton()}</HeaderButtons>
      <HeaderTitle>{title}</HeaderTitle>
      <HeaderButtons position="right">{renderRightButtons()}</HeaderButtons>
    </MobileHeader>
  );
}
