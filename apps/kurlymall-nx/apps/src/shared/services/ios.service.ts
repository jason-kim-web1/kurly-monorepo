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
import { checkPlatformInterface, OS } from '../utils/check-app-interface';
import { BranchEvent } from '../branch';
import { convertContentItems } from '../branch/utils/convert-content-items';

declare global {
  interface Window {
    webkit?: {
      messageHandlers: {
        app: {
          postMessage: (strJson: string) => void;
        };
        action: {
          postMessage: (strJson: string) => void;
        };
        behaviorEvent: {
          postMessage: (strJson: string) => void;
        };
        dialog: {
          postMessage: (strJson: string) => void;
        };
        webViewController: {
          postMessage: (strJson: string) => void;
        };
        checkoutResult: {
          postMessage: (strJson: string) => void;
        };
        order: {
          postMessage: (strJson: string) => void;
        };
        postCancelSuccess: {
          postMessage: (strJson: string) => void;
        };
        postCancelFail: {
          postMessage: (strJson: string) => void;
        };
        toast: {
          postMessage: (strJson: string) => void;
        };
        navigate: {
          postMessage: (strJson: string) => void;
        };
        analytics: {
          postMessage: (strJson: string) => void;
        };
        user: {
          postMessage: (strJson: string) => void;
        };
      };
    };
  }
}

const checkIosInterface = checkPlatformInterface(OS.IOS);

const IosService: AppService = {
  postAppMessage(data: ActionProps) {
    const strJSON = JSON.stringify(data);
    window.webkit?.messageHandlers.app.postMessage(strJSON);
  },
  postMessage(data: ActionProps) {
    if (!checkIosInterface(['action'])) {
      return;
    }

    const strJSON = JSON.stringify(data);
    window.webkit?.messageHandlers?.action?.postMessage(strJSON);
  },
  postDialog(data: DialogProps) {
    const strJSON = JSON.stringify(data);
    window.webkit?.messageHandlers.dialog.postMessage(strJSON);
  },
  postToast(data: ToastProps) {
    const isSuccess = data.type === 'success' ? TOAST_CODE.SUCCESS : TOAST_CODE.FAILURE;
    const strJSON = JSON.stringify({ code: isSuccess, ...data });
    window.webkit?.messageHandlers.toast.postMessage(strJSON);
  },
  postWebViewController(data: WebviewProps) {
    const strJSON = JSON.stringify(data);
    window.webkit?.messageHandlers?.webViewController?.postMessage(strJSON);
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

    window.webkit?.messageHandlers.app.postMessage(
      JSON.stringify({
        code: status,
        data: orderNumber,
        message: status === 'PM450' ? '결제를 취소했습니다.' : message,
      }),
    );
  },
  postCheckoutResult({ code, data, error, message }) {
    if (!checkIosInterface(['checkoutResult'])) {
      return;
    }

    window.webkit?.messageHandlers.checkoutResult.postMessage(
      JSON.stringify({
        code,
        data,
        error,
        message,
      }),
    );
  },
  postOrderSuccess({ orderNumber, amount }) {
    if (!checkIosInterface(['order'])) {
      return;
    }

    window.webkit?.messageHandlers.order.postMessage(
      JSON.stringify({
        name: 'orderSuccess',
        paramsJson: JSON.stringify({
          orderNumber,
          amount,
        }),
      }),
    );
  },
  postOrderCancel({ orderNumber }) {
    if (!checkIosInterface(['order'])) {
      return;
    }

    window.webkit?.messageHandlers.order.postMessage(
      JSON.stringify({
        name: 'orderCancel',
        paramsJson: JSON.stringify({
          orderNumber,
        }),
      }),
    );
  },
  postOrderFailure({ orderNumber }) {
    if (!checkIosInterface(['order'])) {
      return;
    }

    window.webkit?.messageHandlers.order.postMessage(
      JSON.stringify({
        name: 'orderFailure',
        paramsJson: JSON.stringify({
          orderNumber,
        }),
      }),
    );
  },
  postCancelSuccess() {
    IosService.postMessage({
      code: 'WVA4000',
    });
  },
  postCancelFail() {
    IosService.postMessage({
      code: 'WVA4001',
    });
  },
  openImages(imageUrls: string[], selectedIndex = 0) {
    IosService.postMessage({
      code: 'WVA3000',
      current_image_index: selectedIndex,
      image_urls: imageUrls,
    });
  },
  analyticsSetScreenName(screenName: ScreenName) {
    if (checkIosInterface('analytics')) {
      window.webkit?.messageHandlers.analytics.postMessage(
        JSON.stringify({
          name: 'setScreenName',
          paramsJson: JSON.stringify({
            screenName,
          }),
        }),
      );

      return;
    }

    // 앱 구버전 대응
    if (checkIosInterface('behaviorEvent')) {
      window.webkit?.messageHandlers.behaviorEvent.postMessage(
        JSON.stringify({
          category: 'screen_name',
          name: screenName,
        }),
      );
    }
  },
  analyticsSendAmplitudeEvent<T>(event: AmplitudeEvent<T>) {
    if (checkIosInterface('analytics')) {
      window.webkit?.messageHandlers.analytics.postMessage(
        JSON.stringify({
          name: 'sendAmplitudeEvent',
          paramsJson: JSON.stringify({
            eventName: event.getName(),
            properties: JSON.stringify(event.getPayload() ?? {}),
          }),
        }),
      );

      return;
    }

    // 앱 구버전 대응
    if (checkIosInterface('behaviorEvent')) {
      window.webkit?.messageHandlers.behaviorEvent.postMessage(
        JSON.stringify({
          category: 'event',
          name: event.getName(),
          data: event.getPayload() ?? {},
        }),
      );
    }
  },
  analyticsSendBranchEvent<E, C>(event: BranchEvent<E, C>) {
    if (checkIosInterface('analytics')) {
      const contentItems = convertContentItems(event.getContentItems());

      window.webkit?.messageHandlers.analytics.postMessage(
        JSON.stringify({
          name: 'sendBranchEvent',
          paramsJson: JSON.stringify({
            eventName: event.getName(),
            properties: JSON.stringify({
              contentItems,
              eventData: JSON.stringify(event.getEventData() ?? {}),
            }),
          }),
        }),
      );
    }
  },
  analyticsSendGAEvent({ optionsOrName, params }) {
    if (checkIosInterface('analytics')) {
      window.webkit?.messageHandlers.analytics.postMessage(
        JSON.stringify({
          name: 'sendGAEvent',
          paramsJson: JSON.stringify({
            eventName: optionsOrName,
            properties: JSON.stringify(params ?? {}),
          }),
        }),
      );
    }
  },
  loadProductDetailDescription() {
    return 'true';
  },
  loadProductDetailInformation() {
    return 'true';
  },
  postAddressResult(data: AddressActionProps) {
    IosService.postMessage(data);
  },
  postRestockedNotification(data: RestockedNotificationActionProps) {
    window.webkit?.messageHandlers.action.postMessage(JSON.stringify(data));
  },
  finishAndRefresh() {
    if (!checkIosInterface('navigate')) {
      return;
    }

    window.webkit?.messageHandlers.navigate.postMessage(
      JSON.stringify({
        name: 'finishAndRefresh',
      }),
    );
  },
  openWebViewPopUp(data: OpenWebViewPopupProps) {
    if (!checkIosInterface('navigate')) {
      return;
    }

    const strJSON = JSON.stringify(data);
    window.webkit?.messageHandlers.navigate.postMessage(
      JSON.stringify({
        name: 'openWebViewPopUp',
        paramsJson: strJSON,
      }),
    );
  },
  getContacts() {
    if (!checkIosInterface('user')) {
      return;
    }

    const paramsJson = JSON.stringify({
      callback_function: 'setContacts()',
    });

    window.webkit?.messageHandlers.user.postMessage(
      JSON.stringify({
        name: 'getContacts',
        paramsJson,
      }),
    );
  },
  setNavigationButton(data: SetNavigationButtonProps) {
    if (!checkIosInterface('navigate')) {
      return;
    }

    const strJSON = JSON.stringify(data);
    window.webkit?.messageHandlers.navigate.postMessage(
      JSON.stringify({
        name: 'setNavigationButton',
        paramsJson: strJSON,
      }),
    );
  },
  setCopyText(data: SetCopyTextProps) {
    if (!checkIosInterface('user')) {
      return;
    }

    const paramsJson = JSON.stringify(data);
    window.webkit?.messageHandlers.user.postMessage(
      JSON.stringify({
        name: 'setCopyText',
        paramsJson,
      }),
    );
  },

  refreshMypage() {
    if (!checkIosInterface('user')) {
      return;
    }

    window.webkit?.messageHandlers.user.postMessage(
      JSON.stringify({
        name: 'refreshUserInfo',
      }),
    );
  },

  removeToken(data: RemoveTokenProps) {
    const paramsJson = JSON.stringify(data);

    window.webkit?.messageHandlers.user.postMessage(
      JSON.stringify({
        name: 'logout',
        paramsJson,
      }),
    );
  },

  sendNewToken(data: SendNewTokenProps) {
    const paramsJson = JSON.stringify(data);

    window.webkit?.messageHandlers.user.postMessage(
      JSON.stringify({
        name: 'onUnblockedLogin',
        paramsJson,
      }),
    );
  },
};

export default IosService;
