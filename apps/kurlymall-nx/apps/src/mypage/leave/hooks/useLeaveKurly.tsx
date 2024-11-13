import { useDispatch } from 'react-redux';

import { useState } from 'react';

import { hideLoading, redirectTo, showLoading } from '../../../shared/reducers/page';
import { postLeave } from '../../../shared/api/mypage/leave';
import { PayStatusTextMap } from '../../myinfo/interfaces/MyInfoForm.interface';
import { getPageUrl, KURLYPAY_PATH, MYPAGE_PATH } from '../../../shared/constant';
import appService from '../../../shared/services/app.service';
import Alert from '../../../shared/components/Alert/Alert';
import { handleChange, setActiveKurlyMembers, setActiveKurlyPay } from '../reducers/leave.slice';
import { LeaveRequest } from '../interface/Leave.interface';
import { useWebview } from '../../../shared/hooks';
import { sentryCaptureError } from '../../../shared/services';
import useKurlypay, { KURLYPAY_PAGES } from '../../../shared/hooks/useKurlypay';
import { isWebview } from '../../../../util/window/getDevice';
import { useAppSelector } from '../../../shared/store';
import { doLogout } from '../../../member/logout/shared';

export const useLeaveKurly = () => {
  const dispatch = useDispatch();
  const isWebView = useWebview();
  const { getReturnUrl } = useKurlypay();

  const isSKTMember = useAppSelector(({ member }) => member.subscription.partner?.isSKT);

  const [kurlyPayTargetUrl, setKurlyPayTargetUrl] = useState('');

  const handleLeaveKurly = async ({ password, reasonComment, reasonCodes }: LeaveRequest) => {
    try {
      dispatch(showLoading());

      const { kurlyPay, membership } = await postLeave({
        password,
        reasonComment,
        reasonCodes,
      });

      const { status, token, merchantMemberIdentifier, merchantIdentifier } = kurlyPay;
      const { possibleWithdrawal } = membership;

      if (status === PayStatusTextMap.LINKED || !possibleWithdrawal) {
        dispatch(setActiveKurlyPay(status === PayStatusTextMap.LINKED));
        dispatch(setActiveKurlyMembers(!possibleWithdrawal));

        const returnUrl = getReturnUrl(`${KURLYPAY_PATH.kurlypayDefaultCallback.uri}`);
        const targetUrl = `${window.location.origin}${KURLYPAY_PATH.kurlypayAction.uri}?authorizationToken=${token}&merchantIdentifier=${merchantIdentifier}&merchantMemberIdentifier=${merchantMemberIdentifier}&action=${KURLYPAY_PAGES.leave}&returnUrl=${returnUrl}`;

        setKurlyPayTargetUrl(targetUrl);

        return;
      }

      await Alert({
        text: '정상적으로 회원 탈퇴 처리가 승인되었습니다.\n그동안 이용해 주셔서 진심으로 감사합니다.',
      });

      if (isWebView) {
        appService.postAppMessage({ code: 'WV3200' });
        return;
      }

      doLogout();
    } catch (error) {
      sentryCaptureError(error as Error);
      if (error.response.status === 422) {
        dispatch(handleChange({ name: 'password', value: '' }));
        await Alert({
          text: error.response.data.message ?? '비밀번호가 일치하지 않습니다.',
        });
        return;
      }
      Alert({ contents: '일시적인 오류가 발생하였습니다.\n잠시 후 다시 시도해주세요.' });
    } finally {
      dispatch(hideLoading());
    }
  };

  const handleClickKurlyPayCancel = () => {
    const leaveUrl = getPageUrl(MYPAGE_PATH.leave);

    if (isWebView) {
      appService.setNavigationButton({
        buttonType: 'close',
      });
      appService.openWebview({
        url: kurlyPayTargetUrl,
        title: '컬리페이 해지',
        is_modal: true,
      });
      dispatch(redirectTo({ url: leaveUrl }));
      return;
    }

    window.open(kurlyPayTargetUrl, '_blank');

    if (!isWebview()) {
      dispatch(redirectTo({ url: leaveUrl }));
      return;
    }
  };

  const handleClickMembersCancel = () => {
    const leaveUrl = getPageUrl(MYPAGE_PATH.leave);
    const targetUrl = `${window.location.origin}${getPageUrl(MYPAGE_PATH.myMembershipBenefit)}?return_url=${leaveUrl}`;

    if (isSKTMember) {
      Alert({ text: 'T우주패스 구독 해지하신 뒤\n회원탈퇴가 가능합니다.' }).then(() => {
        dispatch(redirectTo({ url: leaveUrl }));
      });
      return;
    }

    if (isWebView) {
      appService.setNavigationButton({
        buttonType: 'close',
      });
      appService.openWebview({
        url: targetUrl,
        title: '컬리멤버스 혜택',
        is_modal: true,
      });
      dispatch(redirectTo({ url: leaveUrl }));
      return;
    }

    window.open(targetUrl, '_blank');

    if (!isWebview()) {
      dispatch(redirectTo({ url: leaveUrl }));
      return;
    }
  };

  return { handleLeaveKurly, handleClickKurlyPayCancel, handleClickMembersCancel };
};
