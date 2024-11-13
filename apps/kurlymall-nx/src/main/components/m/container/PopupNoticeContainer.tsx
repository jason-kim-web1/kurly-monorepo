import styled from '@emotion/styled';

import { head } from 'lodash';

import { memo, useEffect } from 'react';

import useMainNoticePopup from '../../../hooks/useMainNoticePopup';
import PopupNoticeItem from '../popup-notice/PopupNoticeItem';
import { zIndex } from '../../../../shared/styles';
import COLOR from '../../../../shared/constant/colorset';
import useScrollLock from '../../../../shared/hooks/useScrollLock';
import { ScreenName, amplitudeService } from '../../../../shared/amplitude';
import { Portal } from '../../../../shared/components/Portal';

const Background = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${COLOR.kurlyBlack};
  opacity: 0.5;
  z-index: ${zIndex.mainPopupBanner - 1};
`;

function PopupNoticeContainer() {
  const { popupNotices, removePopup } = useMainNoticePopup();
  const { lockScroll, unlockScroll } = useScrollLock();

  const popupNotice = head(popupNotices);

  useEffect(() => {
    if (popupNotice) {
      lockScroll();

      amplitudeService.setScreenName(ScreenName.ANNOUNCE);

      return;
    }

    unlockScroll();
  }, [lockScroll, popupNotice, unlockScroll]);

  useEffect(() => {
    if (!popupNotice) {
      amplitudeService.setScreenName(ScreenName.RECOMMENDATION);
    }
  }, [popupNotice]);

  if (!popupNotice) {
    return null;
  }

  const { id, buttons, mobile } = popupNotice;

  return (
    <Portal>
      <Background />
      <PopupNoticeItem htmlContent={mobile.content} buttons={buttons} onClickButton={removePopup(id)} />
    </Portal>
  );
}

export default memo(PopupNoticeContainer);
