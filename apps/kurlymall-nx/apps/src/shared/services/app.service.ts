import { isAos } from '../../../util/window/getDevice';
import { ScreenName } from '../amplitude';

import AndroidService from './android.service';
import IosService from './ios.service';
import {
  ActionProps,
  AddressActionProps,
  AnalyticsSendGAEventProps,
  CloseWebviewProps,
  DialogProps,
  OpenWebViewPopupProps,
  OpenWebviewProps,
  PostCheckoutResultProps,
  PostGiftResultProps,
  RestockedNotificationActionProps,
  PostOrderProps,
  PostOrderSuccessProps,
  ToastProps,
  WebviewProps,
  SetNavigationButtonProps,
  SetCopyTextProps,
  RemoveTokenProps,
  SendNewTokenProps,
} from './serviceCode';

import { AmplitudeEvent } from '../amplitude/AmplitudeEvent';
import { BranchEvent } from '../branch';

/**
 * WebView(Android, iOS) 와 mobile Web에서 공통적으로 사용하는 Library
 * wiki : https://kurly0521.atlassian.net/wiki/spaces/MKA/pages/1014333564
 * @param { <ActionProps> } postMessage 공유하기 등 웹 페이지 발생 액션
 * @param { <DialogProps> } postDialog Android, iOS 에서 제공하는 다이얼로그 (얼럿)
 * @param { <ToastProps> } postToast 토스트를 이용하여 메시지를 표시
 * @param { <WebviewProps> } postWebViewController 메시지 핸들러를 이용하여 웹에서 네이티브 영역을 컨트롤
 * @param { string } changeTitle 현재 화면의 내비게이션 바 타이틀을 변경
 * @param { <OpenWebviewProps> } openWebview 웹뷰 이동. is_modal 이 true인 경우 modal view를 띄우고, is_popup 이 true인 경우 modal popup view 를 띄운다.
 * @param { <CloseWebviewProps> } closeWebview 웹뷰 닫기. 이전 웹뷰에서 callback_function 호출
 * @param { <PostGiftResultProps> } postGiftResult 선물하기 결제 결과 전송
 * @param { <PostCheckoutResultProps> } postCheckoutResult 주문서 결제 결과 전송
 * @param { <ScreenName> } setScreenName (구) Amplitude Screen Name 전송
 * @param { <AmplitudeEvent> } setScreenName (구) Amplitude Event 전송
 * @param { <ScreenName> } analyticsSetScreenName Amplitude Screen Name 전송
 * @param { <AmplitudeEvent> } analyticsSendAmplitudeEvent Amplitude Event 전송
 * @param { <BranchEvent> } analyticsSendBranchEvent Branch Event 전송
 * @param { <AnalyticsSendGAEventProps> } analyticsSendGAEvent GA Event 전송
 */
export interface AppService {
  postAppMessage(data: ActionProps): void;
  postMessage(data: ActionProps): void;
  postDialog(data: DialogProps): void;
  postToast(data: ToastProps): void;
  postWebViewController(data: WebviewProps): void;
  changeTitle(title: string): void;
  openWebview(data: OpenWebviewProps): void;
  closeWebview(data?: CloseWebviewProps): void;
  postGiftResult(data: PostGiftResultProps): void;
  postCheckoutResult(data: PostCheckoutResultProps): void;
  postOrderSuccess(data: PostOrderSuccessProps): void;
  postOrderCancel(data: PostOrderProps): void;
  postOrderFailure(data: PostOrderProps): void;
  // 배송지 액션
  postAddressResult(data: AddressActionProps): void;
  // 주문서 - 주문취소 액션
  postCancelSuccess(): void;
  postCancelFail(): void;
  // 데이터 분석
  analyticsSetScreenName(screenName: ScreenName): void;
  analyticsSendAmplitudeEvent<T>(event: AmplitudeEvent<T>): void;
  analyticsSendBranchEvent<E, C>(event: BranchEvent<E, C>): void;
  analyticsSendGAEvent(event: AnalyticsSendGAEventProps): void;
  // 상품상세 - 이미지 자세히 보기
  openImages(imageUrls: string[], selectedIndex?: number): void;
  loadProductDetailDescription(): string;
  loadProductDetailInformation(): string;
  // 재입고 알림 신청
  postRestockedNotification(data: RestockedNotificationActionProps): void;
  // 웹뷰 리프레시 액션
  finishAndRefresh(): void;
  // 웹뷰 팝업 형태
  openWebViewPopUp(data: OpenWebViewPopupProps): void;
  // 연락처 불러오기
  getContacts(): void;
  // 네비게이션 버튼
  setNavigationButton(data: SetNavigationButtonProps): void;
  // 클립보드 복사
  setCopyText(data: SetCopyTextProps): void;
  // 마이페이지 새로고침
  refreshMypage(): void;
  // 401 & 1003 대응 로그아웃 (status: 401 & error-code: 1003은 계정이 일시정지되었다는 의미)
  removeToken(data: RemoveTokenProps): void;
  // 로그인 차단 해지 이후 토큰 재전송
  sendNewToken(data: SendNewTokenProps): void;
}

const appService: AppService = isAos ? AndroidService : IosService;

export default appService;
