import { useEffect } from 'react';

import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { get } from 'lodash';

import { Typography } from '@thefarmersfront/kpds-react';

import HeaderButtons from '../layouts/HeaderButtons';
import { isPC } from '../../../../util/window/getDevice';
import { useWebview } from '../../hooks';
import appService from '../../services/app.service';
import useMobileWebHeaderButton from '../../../header/hooks/useMobileWebHeaderButton';
import { RightButtonType } from '../../../header/constants/mobileWebHeader';
import { multiMaxLineText } from '../../utils';
import { zIndex } from '../../styles';
import { MOBILE_HEADER_HEIGHT } from '../../../order/cart/constants';

export const BUTTON_TYPE = {
  none: 'none',
  back: 'back',
  close: 'close',
} as const;

type ButtonType = keyof typeof BUTTON_TYPE;

const Wrapper = styled.div`
  position: relative;
  height: ${MOBILE_HEADER_HEIGHT}px;
`;

const Header = styled.div`
  position: fixed;
  z-index: ${zIndex.mobileHeader};
  top: 0;
  left: 0;
  right: 0;
  height: ${MOBILE_HEADER_HEIGHT}px;
  display: flex;
  align-items: center;
  background-color: ${vars.color.background.$background1};
`;

const HeaderTitle = styled(Typography)`
  padding: 0 ${vars.spacing.$56};
  ${multiMaxLineText(1)}
`;

interface TopBarProps {
  type?: ButtonType;
  children: string;
  onClickTypeButton?: () => void;
  IconTypes?: RightButtonType[];
}

/**
 * @param type TopBar Type : none, back, close
 * @param children 타이틀
 * @param onClickTypeButton 좌측버튼 동작 (기본동작 : back)
 * @param IconTypes 우측아이콘
 */
export default function TopBar({ type, children, onClickTypeButton, IconTypes }: TopBarProps) {
  const webview = useWebview();
  const leftButtonType = type && get(BUTTON_TYPE, type);

  const { renderLeftButton, renderRightButtons } = useMobileWebHeaderButton({
    leftButtonType,
    onClickLeftButton: onClickTypeButton,
    rightButtonTypes: IconTypes,
  });

  useEffect(() => {
    if (!webview) {
      return;
    }

    appService.changeTitle(children);

    if (leftButtonType) {
      appService.setNavigationButton({ buttonType: leftButtonType });
    }
  }, [children, leftButtonType, webview]);

  if (isPC || webview) {
    return null;
  }

  return (
    <Wrapper>
      <Header>
        <HeaderButtons position="left">{renderLeftButton()}</HeaderButtons>
        <HeaderTitle variant={'$xxlargeSemibold'}>{children}</HeaderTitle>
        <HeaderButtons position="right">{renderRightButtons()}</HeaderButtons>
      </Header>
    </Wrapper>
  );
}
