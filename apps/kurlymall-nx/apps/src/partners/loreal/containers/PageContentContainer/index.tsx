import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';

import TitleSection from '../../components/TitleSection';
import BrandListSection from '../../components/BrandListSection';
import CautionSection from '../../components/CautionSection';
import AgreementSection from '../../components/AgreementSection';
import SubmitButtonSection from '../../components/SubmitButtonSection';

import ColorSet from '../../../../shared/constant/colorset';
import { BASE_BREAK_POINT } from '../../constants';
import Alert from '../../../../shared/components/Alert/Alert';
import AlreadyAgreedDialogContent from '../../components/AlreadyAgreedDialogContent';
import { useAppSelector } from '../../../../shared/store';
import TermsDialogContent from '../../components/TermsDialogContent';
import { redirectTo, redirectToLogin } from '../../../../shared/reducers/page';
import {
  useBrandList,
  useLorealMemberBrandMapping,
  useLorealMemberPrivacyPolicyMutation,
  useTermsDetail,
} from '../../hooks/useLorealQuery';
import { PrivacyPolicyStatusMap } from '../../../../shared/api/partners';
import appService from '../../../../shared/services/app.service';
import { INQUIRY_PATH, PARTNERS_PATH, USER_MENU_PATH, getPageUrl } from '../../../../shared/constant';
import { checkBrowserEnvironment } from '../../../../shared/utils/checkBrowserEnvironment';
import { useWebview } from '../../../../shared/hooks';
import { checkPopUpPermission } from '../../../../shared/utils/checkPopUpPermission';
import deepLinkUrl from '../../../../shared/constant/deepLink';
import { usePreviousRoutePath } from '../../../../shared/context/PreviousRoutePathContext';
import { checkSafari } from '../../../../../util/window/getDevice';
import PromotionCautionSection from '../../components/PromotionCautionSection';

const PageContent = styled.div`
  background-color: ${ColorSet.bgLightGray};
  > main {
    position: relative;
    @media only screen and (min-width: ${BASE_BREAK_POINT}px) {
      width: ${BASE_BREAK_POINT}px;
      margin: 0 auto;
      padding-bottom: 80px;
    }
  }
`;

const CommonStyledAlert = ({
  title,
  contents,
  handleClickConfirmButton = () => {},
}: {
  title?: string;
  contents: string | ReactNode;
  handleClickConfirmButton?(): void;
}) =>
  Alert({
    title,
    contents,
    handleClickConfirmButton,
    contentsStyle: `
      .popup-title { line-height: 23px; }
      .popup-content { word-break: keep-all; text-align: left; }
      @media only screen and (min-width: ${BASE_BREAK_POINT}px) {
        .popup-content { text-align: center; }
      }
     `,
  });

type NotifyType =
  | 'NETWORK_ERROR'
  | 'POP_UP_BLOCKED'
  | 'VALIDATION_AGREEMENT'
  | 'ALREADY_INTEGRATED'
  | 'DETAIL_PRIVACY_POLICY'
  | 'PRIVACY_POLICY_CHANGED'
  | 'WEBVIEW_IS_GUEST';

const NOTIFY_TYPE: Record<NotifyType, NotifyType> = {
  VALIDATION_AGREEMENT: 'VALIDATION_AGREEMENT',
  ALREADY_INTEGRATED: 'ALREADY_INTEGRATED',
  DETAIL_PRIVACY_POLICY: 'DETAIL_PRIVACY_POLICY',
  NETWORK_ERROR: 'NETWORK_ERROR',
  POP_UP_BLOCKED: 'POP_UP_BLOCKED',
  PRIVACY_POLICY_CHANGED: 'PRIVACY_POLICY_CHANGED',
  WEBVIEW_IS_GUEST: 'WEBVIEW_IS_GUEST',
};

const getNotifyOptions = (
  type: NotifyType,
  options?: Pick<Parameters<typeof CommonStyledAlert>[0], 'contents'>,
): Parameters<typeof CommonStyledAlert>[0] => {
  const contents = options?.contents;
  switch (type) {
    case NOTIFY_TYPE.VALIDATION_AGREEMENT:
      return {
        title: '약관 동의 안내',
        contents: '필수 약관을 확인해주세요.',
      };
    case NOTIFY_TYPE.ALREADY_INTEGRATED:
      return {
        title: '이미 혜택을 받고 계시는군요!',
        contents,
      };
    case NOTIFY_TYPE.DETAIL_PRIVACY_POLICY:
      return {
        title: '(필수) 개인정보 제3자 제공 동의',
        contents,
      };
    case NOTIFY_TYPE.NETWORK_ERROR:
      return {
        title: '네트워크 오류',
        contents,
      };
    case NOTIFY_TYPE.POP_UP_BLOCKED:
      return {
        contents: checkSafari()
          ? '[설정 > Safari > 팝업 차단] 설정을 해제한 후 다시 시도 해주세요.'
          : '팝업 차단 설정을 해제한 후 다시 시도 해주세요.',
      };
    case NOTIFY_TYPE.PRIVACY_POLICY_CHANGED:
      return {
        title: '약관 변경 안내',
        contents:
          '마이뷰티박스 필수 약관이 변경되었습니다. 관련 혜택을 제공받기 위해서는 변경된 약관 내용에 대한 확인이 필요합니다.',
      };
    case NOTIFY_TYPE.WEBVIEW_IS_GUEST:
      return {
        contents: '로그인하셔야 본 서비스를 이용하실 수 있습니다.',
      };
    default:
      return {
        title: '',
        contents: '',
      };
  }
};
const notify = (type: NotifyType, contents?: Pick<Parameters<typeof CommonStyledAlert>[0], 'contents'>) => {
  const notifyOptions = getNotifyOptions(type, contents);
  return CommonStyledAlert(notifyOptions);
};

declare global {
  interface Window {
    PARTNER_INTEGRATION_CALLBACK?: (status: string) => void;
  }
}

const PageContentContainer = () => {
  const dispatch = useDispatch();
  const childWindowRef = useRef<Window | null>(null);
  const isWebView = useWebview();

  const isGuest = useAppSelector(({ auth }) => auth.isGuest);
  const { brandListCount } = useBrandList();
  const { termsDetail, isError: termsDetailError, refetch } = useTermsDetail();
  const { mutateAsync, isIdle, isSuccess, reset } = useLorealMemberPrivacyPolicyMutation();
  const { membershipStatus, formattedAgreedAt, membershipUserKey, currentIntegratedBrandListCount } =
    useLorealMemberBrandMapping(!isGuest);
  const { previousRoutePath } = usePreviousRoutePath();
  const [agree, setAgree] = useState(false);
  const isAlreadyIntegratedAllBrand = brandListCount === currentIntegratedBrandListCount;
  const isMemberPrivacyAgreed = membershipStatus === PrivacyPolicyStatusMap.AGREE;

  const handleClickInquiryList = () => {
    if (isWebView) {
      return;
    }
    if (isGuest) {
      dispatch(redirectToLogin());
      return;
    }

    dispatch(
      redirectTo({
        url: getPageUrl(INQUIRY_PATH.inquiry),
      }),
    );
  };

  const handleIntegrationSuccess = useCallback(() => {
    if (!previousRoutePath) {
      dispatch(
        redirectTo({
          url: getPageUrl(USER_MENU_PATH.beautyHome),
        }),
      );
      return;
    }
  }, [dispatch, previousRoutePath]);

  const handleMessageFromChildWebView = useCallback(
    (status: string) => {
      if (status !== 'success') {
        return;
      }
      handleIntegrationSuccess();
    },
    [handleIntegrationSuccess],
  );

  const handleMessageFromChildWindow = useCallback(
    (event: MessageEvent) => {
      const { data } = event;
      try {
        if (childWindowRef.current) {
          childWindowRef.current.close();
        }
      } catch (error) {}

      try {
        const { type, payload } = data;
        if (type !== 'PARTNER_INTEGRATION_CALLBACK') {
          return;
        }
        const { status } = payload;
        if (status !== 'success') {
          return;
        }
        handleIntegrationSuccess();
      } catch (error) {}
    },
    [handleIntegrationSuccess],
  );

  const handleClickOpenTerms = async () => {
    if (termsDetailError) {
      notify(NOTIFY_TYPE.NETWORK_ERROR, {
        contents: '약관 정보를 불러올 수 없습니다.\n잠시 후 다시 시도해 주세요.',
      });
      await refetch();
      return;
    }
    notify(NOTIFY_TYPE.DETAIL_PRIVACY_POLICY, {
      contents: <TermsDialogContent {...termsDetail} />,
    });
  };

  const handleChangeAgree = (nextAgree: boolean) => {
    setAgree(nextAgree);
  };

  const handleFormSubmit = () => {
    const targetUrl = `${window.location.origin}${PARTNERS_PATH.popup.uri}?userKey=${membershipUserKey}`;
    if (isWebView) {
      appService.openWebview({
        url: targetUrl,
        title: '제휴 멤버십 연동 동의',
        is_modal: false,
      });
      return;
    }
    childWindowRef.current = window.open(targetUrl, '_blank');
    if (!checkPopUpPermission(childWindowRef.current)) {
      notify(NOTIFY_TYPE.POP_UP_BLOCKED);
    }
  };

  const handleClickSubmit = async () => {
    if (!isIdle) {
      return;
    }
    if (isGuest) {
      if (isWebView) {
        await notify(NOTIFY_TYPE.WEBVIEW_IS_GUEST);
        location.href = deepLinkUrl.LOGIN;
        return;
      }
      dispatch(redirectToLogin());
      return;
    }
    if (!agree) {
      notify(NOTIFY_TYPE.VALIDATION_AGREEMENT);
      return;
    }
    if (!membershipUserKey) {
      notify(NOTIFY_TYPE.NETWORK_ERROR, {
        contents: '회원 연동 정보를 조회할 수 없습니다.\n잠시 후 다시 시도해 주세요.',
      });
      return;
    }
    if (isAlreadyIntegratedAllBrand && isMemberPrivacyAgreed && formattedAgreedAt) {
      notify(NOTIFY_TYPE.ALREADY_INTEGRATED, {
        contents: <AlreadyAgreedDialogContent agreedAt={formattedAgreedAt} />,
      });
      return;
    }

    if (!isMemberPrivacyAgreed || !isSuccess) {
      const agreementResult = await mutateAsync();
      if (!agreementResult) {
        notify(NOTIFY_TYPE.NETWORK_ERROR, {
          contents: '개인정보 제 3자 제공 동의 정보를 저장할 수 없습니다.\n잠시 후 다시 시도해 주세요.',
        });
        reset();
        return;
      }
    }
    reset();
    handleFormSubmit();
  };

  useEffect(() => {
    if (!checkBrowserEnvironment()) {
      return;
    }
    window.PARTNER_INTEGRATION_CALLBACK = handleMessageFromChildWebView;
    window.addEventListener('message', handleMessageFromChildWindow);
    return () => {
      window.PARTNER_INTEGRATION_CALLBACK = () => {
        return;
      };
      window.removeEventListener('message', handleMessageFromChildWindow);
    };
  }, [handleMessageFromChildWebView, handleMessageFromChildWindow]);

  return (
    <PageContent>
      <main>
        <TitleSection />
        <BrandListSection />
        <CautionSection onClickInquiryList={handleClickInquiryList} isWebView={isWebView} />
        {/*TODO : 프로모션이 종료되면 PromotionCautionSection 컴포넌트를 제거 합니다.*/}
        <PromotionCautionSection />
        <AgreementSection agree={agree} onChange={handleChangeAgree} onClickShowTerms={handleClickOpenTerms} />
        <SubmitButtonSection onClick={handleClickSubmit} />
      </main>
    </PageContent>
  );
};

export default PageContentContainer;
