import styled from '@emotion/styled';
import { useState } from 'react';

import MobileHeader from '../../../shared/components/layouts/MobileHeader';
import HeaderButtons from '../../../shared/components/layouts/HeaderButtons';
import BackButton from '../../../shared/components/Button/BackButton';
import HeaderTitle from '../../../shared/components/layouts/HeaderTitle';
import COLOR from '../../../shared/constant/colorset';
import TabMenu from './TabMenu';
import NotiContents from './NotiContents';
import { categoryTabList } from '../constants/category.constant';
import { NotificationCategoryTabType } from '../interfaces/category.interface';
import { useWebviewTitle } from '../../../shared/hooks/useWebviewTitle';

const HEADER_HEIGHT = 44;
const MENU_HEIGHT = 44;

const MenuWrap = styled.div<{ nonHeader?: boolean }>`
  overflow: hidden;
  position: ${({ nonHeader }) => (nonHeader ? 'fixed' : 'absolute')};
  z-index: 2;
  left: 0;
  top: ${({ nonHeader }) => (nonHeader ? 0 : HEADER_HEIGHT)}px;
  width: 100%;
  background: ${COLOR.kurlyWhite};
  box-shadow: 0 -1px 0 0 ${COLOR.lightGray} inset;
`;

const MenuGutter = styled.div`
  height: ${MENU_HEIGHT}px;
`;

const TITLE = '알림센터';

export default function NotiCenterContainer() {
  const { webview } = useWebviewTitle({ headerTitle: TITLE });
  const [selectedTab, setTab] = useState<NotificationCategoryTabType>('ALL');

  return (
    <>
      {webview ? (
        <>
          <MenuWrap nonHeader>
            <TabMenu tabList={categoryTabList} onSelect={setTab} />
          </MenuWrap>
          <MenuGutter />
        </>
      ) : (
        <>
          <MobileHeader hideBottomLine>
            <HeaderButtons position="left">
              <BackButton />
            </HeaderButtons>
            <HeaderTitle>{TITLE}</HeaderTitle>
            <MenuWrap>
              <TabMenu tabList={categoryTabList} onSelect={setTab} />
            </MenuWrap>
          </MobileHeader>
          <MenuGutter />
        </>
      )}
      <NotiContents headerHeight={webview ? MENU_HEIGHT : MENU_HEIGHT + HEADER_HEIGHT} selectedTab={selectedTab} />
    </>
  );
}
