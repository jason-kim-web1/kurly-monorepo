import { useRouter } from 'next/router';

import { isUndefined } from 'lodash';

import { css } from '@emotion/react';

import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';

import SelectedPickupContents from '../../../../shared/components/PickupDetails/SelectedPickupContents';
import SlideModal from '../../../../../../shared/components/modal/SlideModal';

import { PickupPlace } from '../../../../shared/interfaces';
import { useWebview } from '../../../../../../shared/hooks';
import { ignoreError } from '../../../../../../shared/utils/general';
import appService from '../../../../../../shared/services/app.service';
import BottomSheetButtons from './BottonSheetButtons';
import BottomSheetMap from './BottomSheetMap';
import { usePickupDetail } from '../../../../shared/context/PickupDetailContext';
import { setValue } from '../../../../shared/reducers/checkout.slice';

const ContentWrapper = styled.div`
  padding: 4px 12px 12px;
`;

export default function SelectPickupBottomSheet() {
  const router = useRouter();
  const webview = useWebview();
  const dispatch = useDispatch();

  const { selected, isKeywordType, actions } = usePickupDetail();

  const handleClick = (value?: PickupPlace) => {
    if (isUndefined(value)) {
      return;
    }

    if (webview) {
      ignoreError(() => {
        const place = JSON.stringify(value);
        appService.closeWebview({
          callback_function: `updateSelectedPickupPlace(${place})`,
        });
      });

      return;
    }

    dispatch(setValue({ selectedPickupPlace: value }));
    router.back();
  };

  return (
    <SlideModal
      css={
        isKeywordType &&
        css`
          padding-top: 28px;
        `
      }
      showHeader={!isKeywordType}
      open={!!selected}
      onClose={actions.closeAndReset}
      {...(isKeywordType
        ? { disableSwipe: true }
        : {
            hideBackdrop: true,
            modalProps: {
              style: { position: 'absolute', inset: 'unset' },
            },
          })}
    >
      <ContentWrapper>
        <SelectedPickupContents pickupPlace={selected} isKeywordType={isKeywordType} />
        {isKeywordType && <BottomSheetMap pickupPlace={selected} />}
        <BottomSheetButtons
          onClick={handleClick}
          onClose={actions.closeAndReset}
          isKeywordType={isKeywordType}
          pickupPlace={selected}
        />
      </ContentWrapper>
    </SlideModal>
  );
}
