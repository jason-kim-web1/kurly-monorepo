import { BrowserOptions } from '@sentry/nextjs';

import { isPC } from '../../../util/window/getDevice';

type STAGE = 'development' | 'stage' | 'performance' | 'production';

export const KURLY_PRODUCTION_URL_LIST = ['https://kurly.com', 'https://www.kurly.com', 'https://game.kurly.com'];

const kurlyUrls: Record<STAGE, string> = {
  development: 'https://www.dev.kurly.com',
  stage: 'https://www.stg.kurly.com',
  performance: 'https://www.perf.kurly.com',
  production: 'https://www.kurly.com',
};

const kurlyNowUrls: Record<STAGE, string> = {
  development: 'https://now.dev.kurly.com',
  stage: 'https://now.stg.kurly.com',
  performance: 'https://now.perf.kurly.com',
  production: 'https://now.kurly.com',
};

const kurlyEventUrls: Record<STAGE, string> = {
  development: 'https://event.dev.kurly.com',
  stage: 'https://event.stg.kurly.com',
  performance: 'https://event.perf.kurly.com',
  production: 'https://event.kurly.com',
};

const apiUrls: Record<STAGE, string> = {
  development: 'https://api.dev.kurly.com',
  stage: 'https://api.stg.kurly.com',
  performance: 'https://api.perf.kurly.com',
  production: 'https://api.kurly.com',
};

const kurlypayApiUrls: Record<STAGE, string> = {
  development: 'https://pg.dev.kurlypay.co.kr',
  stage: 'https://pg.stg.kurlypay.co.kr',
  performance: 'https://pg.stg.kurlypay.co.kr',
  production: 'https://pg.kurlypay.co.kr',
};

const kurlypayWebUrls: Record<STAGE, string> = {
  development: 'https://www.stg.kurlypay.co.kr',
  stage: 'https://www.stg.kurlypay.co.kr',
  performance: 'https://www.stg.kurlypay.co.kr',
  production: 'https://www.kurlypay.co.kr',
};

const kurlypayMemberApiUrls: Record<STAGE, string> = {
  development: 'https://member.dev.kurlypay.co.kr',
  stage: 'https://member.stg.kurlypay.co.kr',
  performance: 'https://member.stg.kurlypay.co.kr',
  production: 'https://member.kurlypay.co.kr',
};

const redisUrls: Record<STAGE, string> = {
  development: 'api-kurly-com-dev.bncetq.ng.0001.apn2.cache.amazonaws.com',
  stage: 'mkweb-cache.stg.kurly.services',
  performance: 'mkweb-cache.perf.kurly.services',
  production: 'redis-mk-v1p5-01.2dmckq.ng.0001.apn2.cache.amazonaws.com',
};

const internalApiUrls: Record<STAGE, string> = {
  development: 'https://api.dev.kurly.services',
  stage: 'https://api.stg.kurly.services',
  performance: 'https://api.perf.kurly.services',
  production: 'http://api.kurly.services',
};

const kakaoShareKeys: Record<STAGE, string> = {
  development: 'e547101b44dc488c620cbcb5489d16f3',
  stage: 'e547101b44dc488c620cbcb5489d16f3',
  performance: 'e547101b44dc488c620cbcb5489d16f3',
  production: '37a25ee08c7c7125675bdbc23a65b473',
};

const naverShareClientId: Record<STAGE, string> = {
  development: 'enpbssz377',
  stage: 'enpbssz377',
  performance: 'enpbssz377',
  production: 'enpbssz377',
};

const kakaoGiftTemplateIds: Record<STAGE, number> = {
  development: 57841,
  stage: 57841,
  performance: 57841,
  production: 57839,
};

const giftCategories: Record<STAGE, number> = {
  development: 772,
  stage: 772,
  performance: 772,
  production: 772,
};

const purpleboxProductId: Record<STAGE, string> = {
  development: '1000035500',
  stage: '1000061870',
  performance: '1000048043',
  production: '1000427479',
};

const curatorProgramLink: Record<STAGE, string> = {
  development: 'https://lounge.dev.kurly.com/curator-program',
  stage: 'https://lounge.stg.kurly.com/curator-program',
  performance: 'https://lounge.perf.kurly.com/curator-program',
  production: 'https://lounge.kurly.com/curator-program',
};

const recipeLink: Record<STAGE, string> = {
  development: 'https://www.dev.kurly.com/recipe',
  stage: 'https://www.stg.kurly.com/recipe',
  performance: 'https://www.perf.kurly.com/recipe',
  production: 'https://www.kurly.com/recipe',
};

// 선물하기 다이나믹 링크
export const GIFT_DYNAMIC_LINK = 'https://we.kurly.com/K91oYgSzIsb';

const branchApiKeys: Record<STAGE, string> = {
  development: 'key_test_joIkrHgomhL3qaEreXL5QdigzEn6Ucd4',
  stage: 'key_test_joIkrHgomhL3qaEreXL5QdigzEn6Ucd4',
  performance: 'key_test_joIkrHgomhL3qaEreXL5QdigzEn6Ucd4',
  production: 'key_live_meOgzIdffiVWvdquf7Orkacksxa2LneN',
};

const pixelApiKeys: Record<STAGE, string> = {
  development: '526625657540055',
  stage: '526625657540055',
  performance: '526625657540055',
  production: '526625657540055',
};

export const getStage = () => {
  if (process.env.NEXT_PUBLIC_STAGE) {
    return process.env.NEXT_PUBLIC_STAGE as STAGE;
  }

  throw new Error('STAGE 정보가 선언되어 있지 않습니다!');
};

export const ENVIRONMENT = getStage();

export const KURLY_URL = kurlyUrls[ENVIRONMENT];
export const KURLY_NOW_URL = kurlyNowUrls[ENVIRONMENT];
export const KURLY_EVENT_URL = kurlyEventUrls[ENVIRONMENT];
export const API_URL = apiUrls[ENVIRONMENT];
export const REDIS_URL = redisUrls[ENVIRONMENT];
export const INTERNAL_API_URL = internalApiUrls[ENVIRONMENT];
export const KAKAO_SHARE_KEY = kakaoShareKeys[ENVIRONMENT];
export const NAVER_SHARE_CLIENTID = naverShareClientId[ENVIRONMENT];
export const GIFT_CATEGORY = giftCategories[ENVIRONMENT];
export const KAKAO_GIFT_TEMPLATE_ID = kakaoGiftTemplateIds[ENVIRONMENT];
export const BRANCH_API_KEY = branchApiKeys[ENVIRONMENT];
export const KAKAO_CS_URL = 'https://pf.kakao.com/_xcSDxjxl/chat';
export const KURLYPAY_MEMBER_API_URL = kurlypayMemberApiUrls[ENVIRONMENT];
export const KURLYPAY_API_URL = kurlypayApiUrls[ENVIRONMENT];
export const KURLYPAY_WEB_URL = kurlypayWebUrls[ENVIRONMENT];
export const PURPLEBOX_PRODUCT_ID = purpleboxProductId[ENVIRONMENT];
export const PIXEL_API_KEY = pixelApiKeys[ENVIRONMENT];
export const CURATOR_PROGRAM_LINK = curatorProgramLink[ENVIRONMENT];
export const RECIPE_LINK = recipeLink[ENVIRONMENT];

export const SENTRY_INIT_CONFIG: BrowserOptions = {
  dsn: 'https://85c17d02a54d4d19a97d45bf142467a9@o504158.ingest.sentry.io/5920463',
  sampleRate: 1,
  tracesSampleRate: 0.005,
  autoSessionTracking: true,
  environment: ENVIRONMENT,
  denyUrls: [
    /extensions\//i,
    /^safari-extension:\/\//i,
    /^safari-web-extension:\/\//i,
    /^moz-extension:\/\//i,
    /^chrome:\/\//i,
    /^chrome-extension:\/\//i,
    /moz-extension/i,
  ],
  normalizeDepth: 6,
  ignoreErrors: ['ChunkLoadError', '일시적인 장애가 발생했어요. 잠시 후 다시 시도해주세요.'],
  beforeSend: (event) => {
    try {
      const { exception, request } = event;

      // API Error로 4xx 메세지를 받은 경우 센트리 로그를 남기지 않습니다.
      if (exception?.values?.[0].value?.includes('Request failed with status code 4')) {
        return null;
      }

      /**
       * OK CashBag 앱에서 받는 에러는 센트리 로그를 남기지 않습니다.
       * See Also: https://kurly0521.atlassian.net/wiki/spaces/CMWD/pages/3832645423/2023.12+Sentry+-+OcbiOSJS
       */
      if (request?.headers?.['User-Agent']?.match(/OCBAPP\/\d+/)) {
        return null;
      }

      return event;
    } catch {
      return null;
    }
  },
};

export const isProduction = () => ENVIRONMENT === 'production';
export const isPerformance = () => ENVIRONMENT === 'performance';
export const isDevelopment = () => ENVIRONMENT === 'development';
export const isStage = () => ENVIRONMENT === 'stage';

const amplitudeApiKeys = () => {
  if (isPerformance() || isDevelopment() || isStage()) {
    if (isPC) {
      return '18fa79ccb0a347230e61111141593c7b';
    }
    return '5eb1eb9a37af1f1bdad609256e58db68';
  }

  if (isProduction() && isPC) {
    return '65bebb55595beb82e78d5d1ae808702c';
  }
  return '5533c0aa41ff95090e8c73ab4263299f';
};

export const AMPLITUDE_API_KEY = amplitudeApiKeys();
export const INTERNAL_APPLOG_API_ENDPOINT = isProduction()
  ? 'applog.kurly.com/v1/applog'
  : 'applog.kurly.com/v1/applog-testbed';

export const SESSION_KEY_PROD = 'PHPSESSID';
export const SESSION_KEY_DEV = 'DEVSTG_PHPSESSID';
export const SESSION_KEY = isProduction() ? SESSION_KEY_PROD : SESSION_KEY_DEV;

export const RESOURCE_URL = 'https://res.kurly.com';

// 구글 애널리틱스 키
export const GA_INIT_KEY = isProduction() ? 'G-BJ5N3PD9QG' : 'G-S9583994W3';

// 띠배너가 사라지는 페이지 입니다.
// 이벤트 페이지 - 신규가입 페이지, 회원혜택, 친구초대, 장바구니, 결제혜택
// 상품상세 페이지 - 상품상세탭이 fixed 될 때
// 주문서, 주문완료 화면
export const BANNER_HIDE_URL = [
  // 선물 수신 관련 페이지
  '?externalGroupOrderNo=',
  // 성인 인증 페이지
  '/member/adult-verification',
  '/member/find',
  // 회원가입 페이지
  '/member/signup',
  // 주문서 관련 페이지
  '/order/checkout',
  '/order/gift',
  // 알림센터
  '/mypage/noti-center',
];

export const NEXT_PUBLIC_MOCK_ENABLED = process.env.NEXT_PUBLIC_MOCK_ENABLED === 'true';

export const DISABLE_AMPLITUDE_SAMPLING = process.env.NEXT_PUBLIC_DISABLE_AMPLITUDE_SAMPLING === 'true';

export const ENABLE_SENTRY = isProduction() || process.env.NEXT_PUBLIC_ENABLE_SENTRY_IN_NON_PRODUCTION === 'true';

export const KURLY_EMPLOYEE_USERS = {
  development: `${RESOURCE_URL}/json/event/2022/benefitEmployeeUserDev.json`,
  stage: `${RESOURCE_URL}/json/event/2022/benefitEmployeeUserDev.json`,
  performance: `${RESOURCE_URL}/json/event/2022/benefitEmployeeUser.json`,
  production: `${RESOURCE_URL}/json/event/2022/benefitEmployeeUser.json`,
};

export const KURLY_EMPLOYEE_BENEFIT_ITEMS = {
  development: `${RESOURCE_URL}/json/event/2022/benefitEmployeeItemDev.json`,
  stage: `${RESOURCE_URL}/json/event/2022/benefitEmployeeItemDev.json`,
  performance: `${RESOURCE_URL}/json/event/2022/benefitEmployeeItem.json`,
  production: `${RESOURCE_URL}/json/event/2022/benefitEmployeeItem.json`,
};

// 특수 휴일(명절 등)
export const SPECIAL_HOLIDAY_DELIVERY = {
  development: `${RESOURCE_URL}/json/test/holiday/holidayDelivery.json`,
  stage: `${RESOURCE_URL}/json/test/holiday/holidayDelivery_dev.json`,
  production: `${RESOURCE_URL}/json/holiday/holidayDelivery.json`,
  performance: `${RESOURCE_URL}/json/test/holiday/holidayDelivery.json`,
};

export const GIFT_DELIVERY_NOTICE = {
  development: `${RESOURCE_URL}/json/goods/giftNotice_dev.json`,
  stage: `${RESOURCE_URL}/json/goods/giftNotice_dev.json`,
  performance: `${RESOURCE_URL}/json/goods/giftNotice_dev.json`,
  production: `${RESOURCE_URL}/json/goods/giftNotice.json`,
};

export const TERMS_THIRD_PARTY_URL = isProduction()
  ? `${RESOURCE_URL}/json/terms/third-party/thirdParty.json`
  : `${RESOURCE_URL}/json/terms/third-party/thirdParty_dev.json`;

export const EVENT_CONFIG = {
  development: 'https://moderate.dev.kurly.com/event/config?platform=web',
  stage: 'https://moderate.stg.kurly.com/event/config?platform=web',
  production: 'https://moderate.kurly.com/event/config?platform=web',
  performance: 'https://moderate.stg.kurly.com/event/config?platform=web',
};

export const SHOWCASE_RESOURCE_BASE_URL = {
  development: `${RESOURCE_URL}/json/test/showcase`,
  stage: `${RESOURCE_URL}/json/test/showcase`,
  performance: `${RESOURCE_URL}/json/test/showcase`,
  production: `${RESOURCE_URL}/json/showcase`,
};

export const APP_CONFIG = {
  development: 'https://moderate.dev.kurly.com/app/config?platform=web',
  stage: 'https://moderate.stg.kurly.com/app/config?platform=web',
  production: 'https://moderate.kurly.com/app/config?platform=web',
  performance: 'https://moderate.stg.kurly.com/app/config?platform=web',
};

const cookieDomains: Record<STAGE, string> = {
  development: 'dev.kurly.com',
  stage: 'stg.kurly.com',
  performance: 'perf.kurly.com',
  production: 'kurly.com',
};

export const COOKIE_DOMAIN = cookieDomains[ENVIRONMENT];

export const GROWTHBOOK_API_HOST = 'https://cdn.growthbook.io';
export const GROWTHBOOK_CLIENT_KEY = isProduction() ? 'sdk-hgeMnhohPsVFwuj' : 'sdk-3epEZfsKb8sfdwt';
