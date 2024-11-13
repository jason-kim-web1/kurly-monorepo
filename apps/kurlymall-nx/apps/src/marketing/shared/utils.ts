import { isAfter, isBefore, isEqual, parseISO } from 'date-fns';

import { isWebview } from '../../../util/window/getDevice';
import { amplitudeService } from '../../shared/amplitude';
import { SelectVipPageButton } from '../../shared/amplitude/events/lounges';
import Alert from '../../shared/components/Alert/Alert';
import appService from '../../shared/services/app.service';
import { LinkAction } from './type';

type AmplitudeParamType = {
  text?: string;
  pageName?: string;
  selectionType: 'benefit' | 'event_page' | 'subtab' | 'collection' | 'benefit_confirm';
};

const webLinkAction = (webLink?: string) => {
  if (!webLink) {
    Alert({
      text: '앱에서 확인해주세요',
    });
    return;
  }

  location.href = webLink;
};

const webViewLinkAction = (appLink?: string) => {
  if (!appLink) return;

  const isDeepLink = appLink.includes('kurly://') ?? false;
  const isRootPath = appLink.includes('https://') ?? false;

  if (isDeepLink) {
    location.href = appLink;
    return;
  } else {
    appService.openWebview({
      url: `${isRootPath ? appLink : `${window.location.origin}${appLink}`}`,
      is_modal: true,
    });
  }
};

const extractCodeCollection = (url: string) => {
  const match = url.match(/code=([^&]+)/);
  return match ? match[1] : null;
};

export const externalLinkAction = (webLink?: string) => {
  if (!webLink) return;

  window.open(webLink);
  return;
};

const buttonClickToAmplitudeEvent = ({ text, pageName, selectionType }: AmplitudeParamType) => {
  amplitudeService.logEvent(
    new SelectVipPageButton({
      url: location.href,
      pageName: pageName ?? '',
      selectionType,
      message: text ?? '',
    }),
  );
};

/**
 * Amplitude에 보낼 selectionType이다.
 * @param isLegoLanding 레고 랜딩 여부
 * @param isBenefitCheck 혜택 랜딩 여부
 * @returns 'event_page' | 'benefit' | undefined
 */
const getSelectionType = (webLink?: string): 'event_page' | 'benefit' | undefined => {
  const legoRegex = /\/event\//;
  const benefitRegex = /\/mypage\/(membership|coupon)/;
  const isLegoLanding = legoRegex.test(webLink || '');
  const isBenefitCheck = benefitRegex.test(webLink || '');

  if (isLegoLanding) return 'event_page';
  if (isBenefitCheck) return 'benefit';
  return undefined;
};

/**
 *
 * @param date
 * @returns
 * isVisibleByAfterDate(undefined); // true
 * 현재날짜 2024-09-03 기준
 * isVisibleByAfterDate({start: '2024-09-01', end: '2024-09-02'}); // false
 * isVisibleByAfterDate({start: '2024-09-03', end: '2024-09-04'}); // true
 * isVisibleByAfterDate({start: '2024-09-03', end: '2024-09-05'}); // true
 * isVisibleByAfterDate({start: '2024-09-03', end: '2024-09-03'}); // true
 * isVisibleByAfterDate({start: '2024-09-04', end: '2024-09-05'}); // false
 */
export const isVisibleByAfterDate = (date: { start: string; end: string } | undefined) => {
  if (!date?.start || !date?.end) return true;

  const now = new Date();
  const startDate = parseISO(date.start); // 다른 타임존이면 비교가 곤란하므로 parseISO 사용
  const endDate = parseISO(date.end); // 다른 타임존이면 비교가 곤란하므로 parseISO 사용

  // 현재날짜 >= 시작일자 && 현재날짜 <= 종료일자
  return (isEqual(now, startDate) || isAfter(now, startDate)) && (isEqual(now, endDate) || isBefore(now, endDate));
};

export const handleLinkAction = ({ webLink, appLink, type, pageName, text }: LinkAction) => {
  if (!webLink && !appLink) return undefined;

  const selectionType = getSelectionType(webLink);

  if (selectionType) {
    const amplitudeParam: AmplitudeParamType = {
      text,
      pageName,
      selectionType,
    };
    buttonClickToAmplitudeEvent(amplitudeParam);
  }

  if (type === 'external-link') {
    externalLinkAction(webLink);
    return;
  }

  if (isWebview()) {
    if (appLink?.includes('collection')) {
      const collectionCode = extractCodeCollection(appLink);

      amplitudeService.logEvent(
        new SelectVipPageButton({
          url: location.href,
          pageName: pageName ?? '',
          selectionType: 'collection',
          message: text ?? '',
          collectionId: collectionCode ?? '',
        }),
      );
    }

    webViewLinkAction(appLink);
  } else {
    webLinkAction(webLink);
  }
};
