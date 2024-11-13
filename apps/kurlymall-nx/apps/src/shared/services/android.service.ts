import { AppService } from './app.service';
import {
  ActionProps,
  CloseWebviewProps,
  DialogProps,
  INFORMATION_CODE,
  OpenWebviewProps,
  TOAST_CODE,
  ToastProps,
  WEBVIEW_CODE,
  WebviewProps,
  AddressActionProps,
  RestockedNotificationActionProps,
  OpenWebViewPopupProps,
  SetNavigationButtonProps,
  SetCopyTextProps,
  RemoveTokenProps,
  SendNewTokenProps,
} from './serviceCode';

import { ScreenName } from '../amplitude';
import { AmplitudeEvent } from '../amplitude/AmplitudeEvent';
import {
  checkAnalyticsInterface,
  checkNavigateInterface,
  checkOrderInterface,
  checkPlatformInterface,
  checkUserInterface,
  OS,
} from '../utils/check-app-interface';
import { BranchEvent } from '../branch';

declare global {
  interface Window {
    Android: {
      postMessage: (strJSON: string) => void;
      postDialog: (strJSON: string) => void;
      postToast: (strJSON: string) => void;
      postWebViewController: (strJSON: string) => void;
      handleBehaviorEvent: (strJSON: string) => void;
      checkoutResult: (strJSON: string) => void;
      getProductDetailDescription: () => string;
      getProductDetailInformation: () => string;
      postAddressResult: (strJSON: string) => void;
    };
    Android_Analytics: {
      setScreenName: (strJSON: string) => void;
      sendAmplitudeEvent: (strJSON: string) => void;
      sendBranchEvent: (strJSON: string) => void;
      sendGAEvent: (strJSON: string) => void;
    };
    Android_Navigate: {
      finishAndRefresh: () => void;
      openWebViewPopUp: (strJSON: string) => void;
      setNavigationButton: (strJSON: string) => void;
    };
    Android_User: {
      getContacts: (strJSON: string) => void;
      setCopyText: (strJSON: string) => void;
      refreshUserInfo: () => void;
      logout: (strJSON: string) => void;
      onUnblockedLogin: (strJSON: string) => void;
    };
    Android_Order: {
      orderSuccess: (strJSON: string) => void;
      orderCancel: (strJSON: string) => void;
      orderFailure: (strJSON: string) => void;
    };
  }
}

const checkAndroidInterface = checkPlatformInterface(OS.ANDROID);
const checkAndroidAnalyticsInterface = checkAnalyticsInterface(OS.ANDROID);
const checkAndroidNavigateInterface = checkNavigateInterface(OS.ANDROID);
const checkAndroidUserInterface = checkUserInterface(OS.ANDROID);
const checkAndroidOrderInterface = checkOrderInterface(OS.ANDROID);

const AndroidService: AppService = {
  postMessage(data: ActionProps) {
    const strJSON = JSON.stringify(data);
    window.Android?.postMessage(strJSON);
  },
  postAppMessage(data: ActionProps) {
    this.postMessage(data);
  },
  postDialog(data: DialogProps) {
    const strJSON = JSON.stringify(data);
    window.Android?.postDialog(strJSON);
  },
  postToast(data: ToastProps) {
    const isSuccess = data.type === 'success' ? TOAST_CODE.SUCCESS : TOAST_CODE.FAILURE;
    const strJSON = JSON.stringify({ code: isSuccess, ...data });
    window.Android?.postToast(strJSON);
  },
  postWebViewController(data: WebviewProps) {
    const strJSON = JSON.stringify(data);
    window.Android?.postWebViewController(strJSON);
  },
  changeTitle(title: string) {
    this.postWebViewController({ code: INFORMATION_CODE.TITLE, title });
  },
  openWebview(data: OpenWebviewProps) {
    this.postWebViewController({ code: WEBVIEW_CODE.OPEN, ...data });
  },
  closeWebview(data: CloseWebviewProps) {
    this.postWebViewController({ code: WEBVIEW_CODE.CLOSE, ...data });
  },
  postGiftResult({ orderNumber, status, message }) {
    if (typeof window !== 'object') {
      return;
    }

    window.Android?.postMessage(
      JSON.stringify({
        code: status,
        data: orderNumber,
        message: status === 'PM450' ? '결제를 취소했습니다.' : message,
      }),
    );
  },
  postCheckoutResult({ code, data, error, message }) {
    if (!checkAndroidInterface(['checkoutResult'])) {
      return;
    }

    window.Android?.checkoutResult(
      JSON.stringify({
        code,
        data,
        error,
        message,
      }),
    );
  },
  postOrderSuccess({ orderNumber, amount }) {
    if (!checkAndroidOrderInterface(['orderSuccess'])) {
      return;
    }

    window.Android_Order.orderSuccess(
      JSON.stringify({
        orderNumber,
        amount,
      }),
    );
  },
  postOrderCancel({ orderNumber }) {
    if (!checkAndroidOrderInterface(['orderCancel'])) {
      return;
    }

    window.Android_Order.orderCancel(
      JSON.stringify({
        orderNumber,
      }),
    );
  },
  postOrderFailure({ orderNumber }) {
    if (!checkAndroidOrderInterface(['orderFailure'])) {
      return;
    }

    window.Android_Order.orderFailure(
      JSON.stringify({
        orderNumber,
      }),
    );
  },
  postCancelSuccess() {
    AndroidService.postMessage({
      code: 'WVA4000',
    });
  },
  postCancelFail() {
    AndroidService.postMessage({
      code: 'WVA4001',
    });
  },
  openImages(imageUrls: string[], selectedIndex = 0) {
    AndroidService.postMessage({
      code: 'WVA3000',
      current_image_index: selectedIndex,
      image_urls: imageUrls,
    });
  },
  analyticsSetScreenName(screenName: ScreenName) {
    if (checkAndroidAnalyticsInterface(['setScreenName'])) {
      window.Android_Analytics.setScreenName(
        JSON.stringify({
          screenName,
        }),
      );

      return;
    }

    // 앱 구버전 대응
    if (checkAndroidInterface(['handleBehaviorEvent'])) {
      window.Android?.handleBehaviorEvent(
        JSON.stringify({
          category: 'screen_name',
          name: screenName,
        }),
      );
    }
  },
  analyticsSendAmplitudeEvent<T>(event: AmplitudeEvent<T>) {
    if (checkAndroidAnalyticsInterface(['sendAmplitudeEvent'])) {
      window.Android_Analytics.sendAmplitudeEvent(
        JSON.stringify({
          eventName: event.getName(),
          properties: JSON.stringify(event.getPayload() ?? {}),
        }),
      );

      return;
    }

    // 앱 구버전 대응
    if (checkAndroidInterface(['handleBehaviorEvent'])) {
      window.Android?.handleBehaviorEvent(
        JSON.stringify({
          category: 'event',
          name: event.getName(),
          data: event.getPayload() ?? {},
        }),
      );
    }
  },
  analyticsSendBranchEvent<E, C>(event: BranchEvent<E, C>) {
    if (checkAndroidAnalyticsInterface(['sendBranchEvent'])) {
      window.Android_Analytics.sendBranchEvent(
        JSON.stringify({
          eventName: event.getName(),
          properties: JSON.stringify({
            contentItems: JSON.stringify(event.getContentItems() ?? []),
            eventData: JSON.stringify(event.getEventData() ?? {}),
          }),
        }),
      );
    }
  },
  analyticsSendGAEvent({ optionsOrName, params }) {
    if (checkAndroidAnalyticsInterface(['sendGAEvent'])) {
      window.Android_Analytics.sendGAEvent(
        JSON.stringify({
          eventName: optionsOrName,
          properties: JSON.stringify(params ?? {}),
        }),
      );
    }
  },
  loadProductDetailDescription() {
    return window.Android?.getProductDetailDescription();
  },
  loadProductDetailInformation() {
    return window.Android?.getProductDetailInformation();
  },
  postAddressResult(data: AddressActionProps) {
    const strJSON = JSON.stringify(data);
    window.Android?.postMessage(strJSON);
  },
  postRestockedNotification(data: RestockedNotificationActionProps) {
    window.Android?.postMessage(JSON.stringify(data));
  },
  finishAndRefresh() {
    if (!checkAndroidNavigateInterface(['finishAndRefresh'])) {
      return;
    }
    window.Android_Navigate.finishAndRefresh();
  },
  openWebViewPopUp(data: OpenWebViewPopupProps) {
    if (!checkAndroidNavigateInterface(['openWebViewPopUp'])) {
      return;
    }
    const strJSON = JSON.stringify(data);
    window.Android_Navigate.openWebViewPopUp(strJSON);
  },
  getContacts() {
    if (!checkAndroidUserInterface(['getContacts'])) {
      return;
    }

    window.Android_User.getContacts('setContacts()');
  },
  setNavigationButton(data: SetNavigationButtonProps) {
    if (!checkAndroidNavigateInterface(['setNavigationButton'])) {
      return;
    }
    const strJSON = JSON.stringify(data);
    window.Android_Navigate.setNavigationButton(strJSON);
  },
  setCopyText(data: SetCopyTextProps) {
    const strJSON = JSON.stringify(data);

    if (checkAndroidUserInterface(['setCopyText'])) {
      window.Android_User.setCopyText(strJSON);
      return;
    }
  },
  refreshMypage() {
    if (!checkAndroidUserInterface(['refreshUserInfo'])) {
      return;
    }
    window.Android_User.refreshUserInfo();
  },
  removeToken(data: RemoveTokenProps) {
    const strJSON = JSON.stringify(data);

    window.Android_User.logout(strJSON);
  },
  sendNewToken(data: SendNewTokenProps) {
    const strJSON = JSON.stringify(data);

    window.Android_User.onUnblockedLogin(strJSON);
  },
};

export default AndroidService;
