import { Dispatch } from 'redux';

import { isMobileWeb, isPC, isWebview } from '../../../../util/window/getDevice';
import Alert, { closeAlert } from '../../../shared/components/Alert/Alert';
import BottomSheet from '../../../shared/components/BottomSheet/BottomSheet';
import { MYPAGE_PATH, USER_MENU_PATH, getPageUrl } from '../../../shared/constant';
import { redirectTo } from '../../../shared/reducers/page';
import { reserveToUnsubscribeMembership, unsubscribeMembershipNow } from '../shared/service';
import { CancelReason, UnsubscribeConfirmMessage } from '../shared/type';
import { MembershipStatusChange } from '../../../shared/amplitude/events/order/MembershipStatusChange';
import { amplitudeService } from '../../../shared/amplitude';
import appService from '../../../shared/services/app.service';
import Button from '../../../shared/components/Button/Button';
import { FinalAsk } from '../shared/styled';
import ModalCloseButton from '../../../shared/components/Button/ModalCloseButton';
import { CLASS_NAME_DEVICE } from '../shared/constants';
import deepLinkUrl from '../../../shared/constant/deepLink';
import { loadMyKurlyInfo } from '../../info-section/mykurly.slice';
import { handleClickUnsubscribeConfirm } from '../shared/utils';

const COMMON_TITLE = '컬리멤버스를 해지하시겠어요?';
const COMMON_MESSAGES = [
  '멤버십 재등록은 언제든 가능합니다. 멤버십 종료일까지 컬리멤버스 혜택을 이용할 수 있습니다.',
  '무료이용권을 이용하는 경우 멤버스 해지하기 시 소멸되며, 재가입 시 원복되지 않습니다.',
];

const CancelNowMessage = (
  <div className="message">
    즉시 구독 취소를 할 경우 이용료 결제가 취소됩니다. 첫 달 무료 혜택 이용고객님도 즉시 구독 취소 시 더 이상 무료
    혜택을 받으실 수 없습니다.
  </div>
);

type FinalAskProps = {
  returnUrl?: string;
  dispatch: Dispatch<any>;
  endSubscriptionDate: string;
  isCancelNow: boolean;
  cancelReason: CancelReason;
  showStayMembership: () => void;
};

function FinalAskComponent({
  returnUrl,
  endSubscriptionDate,
  isCancelNow,
  cancelReason,
  dispatch,
  showStayMembership,
}: FinalAskProps) {
  const loadingButtons = () => {
    const unsubscribeButtonsLoading = document.getElementById('unsubscribeButtonsLoading');
    const unsubscribeButtonsLoaded = document.getElementById('unsubscribeButtonsLoaded');

    unsubscribeButtonsLoading?.classList.remove('hidden');
    unsubscribeButtonsLoaded?.classList.add('hidden');
  };

  const loadedButtons = () => {
    const unsubscribeButtonsLoading = document.getElementById('unsubscribeButtonsLoading');
    const unsubscribeButtonsLoaded = document.getElementById('unsubscribeButtonsLoaded');

    unsubscribeButtonsLoading?.classList.add('hidden');
    unsubscribeButtonsLoaded?.classList.remove('hidden');
  };

  const unsubscribeNow = async () => {
    try {
      loadingButtons();

      await unsubscribeMembershipNow(cancelReason);

      amplitudeService.logEvent(new MembershipStatusChange({ status_type: 'unsubscribe' }));

      await Alert({
        text: '컬리멤버스 구독이 취소되었습니다.',
      });

      loadedButtons();

      if (isWebview()) {
        appService.refreshMypage();
        dispatch(
          redirectTo({
            url: deepLinkUrl.MYKURLY,
          }),
        );
        return;
      }

      dispatch(loadMyKurlyInfo());

      if (returnUrl) {
        dispatch(redirectTo({ url: returnUrl }));
        return;
      }

      if (isMobileWeb) {
        dispatch(redirectTo({ url: getPageUrl(USER_MENU_PATH.mykurly) }));
        return;
      }

      dispatch(redirectTo({ url: getPageUrl(MYPAGE_PATH.orderList) }));
    } catch (err) {
      loadedButtons();

      await Alert({
        text: '유효하지 않은 조건입니다. 다시 확인해주세요.',
      });
    }
  };

  const reserveToUnsubscribe = async () => {
    try {
      loadingButtons();

      await reserveToUnsubscribeMembership(cancelReason);

      amplitudeService.logEvent(new MembershipStatusChange({ status_type: 'unsubscribe_pending' }));

      loadedButtons();

      await Alert({
        text: `해지 신청이 완료되었습니다.\n${endSubscriptionDate}까지 멤버십이 유지됩니다.`,
      });

      if (isWebview()) {
        appService.closeWebview({
          callback_function: `MEMBERSHIP_FINISH_AND_REFRESH()`,
        });
        return;
      }

      if (returnUrl) {
        dispatch(redirectTo({ url: returnUrl }));
        return;
      }

      dispatch(redirectTo({ url: getPageUrl(MYPAGE_PATH.myMembership) }));
    } catch (err) {
      loadedButtons();

      await Alert({
        text: '유효하지 않은 조건입니다. 다시 확인해주세요.',
      });
    }
  };

  const clickActionMap = {
    [UnsubscribeConfirmMessage.NOW]: unsubscribeNow,
    [UnsubscribeConfirmMessage.RESERVE]: reserveToUnsubscribe,
    [UnsubscribeConfirmMessage.CANCEL]: showStayMembership,
    [UnsubscribeConfirmMessage.UNSUBSCRIBE]: reserveToUnsubscribe,
  };

  const EndDateComponent = (
    <div className="end-date">
      <span className="label">멤버십 종료 예정일</span>
      <span>{endSubscriptionDate}</span>
    </div>
  );

  const CancelNowButtons = (
    <div className="button-group">
      <div className="hidden" id="unsubscribeButtonsLoading">
        <Button theme="tertiary" radius={6} isLoading text="즉시 구독 취소" />
        <Button theme="primary" radius={6} isLoading text="구독 해지 예약" />
      </div>
      <div id="unsubscribeButtonsLoaded">
        <Button
          theme="tertiary"
          radius={6}
          onClick={() =>
            handleClickUnsubscribeConfirm({
              pageName: 'confirmsheet_agreement',
              message: UnsubscribeConfirmMessage.NOW,
              clickAction: clickActionMap[UnsubscribeConfirmMessage.NOW],
            })
          }
          text={UnsubscribeConfirmMessage.NOW}
        />
        <Button
          theme="primary"
          radius={6}
          onClick={() =>
            handleClickUnsubscribeConfirm({
              pageName: 'confirmsheet_agreement',
              message: UnsubscribeConfirmMessage.RESERVE,
              clickAction: clickActionMap[UnsubscribeConfirmMessage.RESERVE],
            })
          }
          text={UnsubscribeConfirmMessage.RESERVE}
        />
      </div>
    </div>
  );

  const ReserveToCancelButtons = (
    <div className="button-group">
      <div className="hidden" id="unsubscribeButtonsLoading">
        <Button theme="tertiary" radius={6} isLoading text="취소" />
        <Button theme="primary" radius={6} isLoading text="해지하기" />
      </div>
      <div id="unsubscribeButtonsLoaded">
        <Button
          theme="tertiary"
          radius={6}
          onClick={() =>
            handleClickUnsubscribeConfirm({
              pageName: 'confirmsheet_agreement',
              message: UnsubscribeConfirmMessage.CANCEL,
              clickAction: clickActionMap[UnsubscribeConfirmMessage.CANCEL],
            })
          }
          text={UnsubscribeConfirmMessage.CANCEL}
        />

        <Button
          theme="primary"
          radius={6}
          onClick={() =>
            handleClickUnsubscribeConfirm({
              pageName: 'confirmsheet_agreement',
              message: UnsubscribeConfirmMessage.UNSUBSCRIBE,
              clickAction: clickActionMap[UnsubscribeConfirmMessage.UNSUBSCRIBE],
            })
          }
          text={UnsubscribeConfirmMessage.UNSUBSCRIBE}
        />
      </div>
    </div>
  );

  if (isPC) {
    return Alert({
      showCancelButton: false,
      showConfirmButton: false,
      contentsStyle: `
          .swal2-popup {
            max-width: 440px;
          }
          .popup-content {
            padding: 30px;
          }
        `,
      contents: (
        <FinalAsk className={CLASS_NAME_DEVICE}>
          <div className="title">
            {COMMON_TITLE}
            <ModalCloseButton onClick={closeAlert} />
          </div>
          {COMMON_MESSAGES.map((data) => (
            <div key={data} className="message">
              {data}
            </div>
          ))}
          {isCancelNow ? (
            <>
              {CancelNowMessage}
              {EndDateComponent}
              {CancelNowButtons}
            </>
          ) : (
            <>
              {EndDateComponent}
              {ReserveToCancelButtons}
            </>
          )}
        </FinalAsk>
      ),
    });
  }

  return BottomSheet({
    showCancelButton: false,
    showConfirmButton: false,
    contents: (
      <FinalAsk className={CLASS_NAME_DEVICE}>
        <div className="title">{COMMON_TITLE}</div>
        {EndDateComponent}
        {COMMON_MESSAGES.map((data) => (
          <div key={data} className="message">
            {data}
          </div>
        ))}
        {isCancelNow ? (
          <>
            {CancelNowMessage}
            {CancelNowButtons}
          </>
        ) : (
          <>{ReserveToCancelButtons}</>
        )}
      </FinalAsk>
    ),
  });
}

export default FinalAskComponent;
