import { nanoid } from 'nanoid';
import amplitude, { AmplitudeClient, Config } from 'amplitude-js';

import { get, isEmpty, isObject } from 'lodash';

import { REFERRER_EVENT_PROPERTY_SEND_EVENT_NAMES, ScreenName, TabName, WEBVIEW_REFERRER_EVENT_SAVE } from '.';
import { AmplitudeEvent } from './AmplitudeEvent';
import AmplitudeBucket from './AmplitudeBucket';

import { isWebview } from '../../../util/window/getDevice';
import appService from '../services/app.service';

import { AMPLITUDE_API_KEY, INTERNAL_APPLOG_API_ENDPOINT } from '../configs/config';

export const USER_PROPERTIES_KEY = 'amplitudeUserProperties';

interface UserPropertiesInterface {
  [key: string]: unknown;
}

type AmplitudeInstanceName = 'default' | 'internal';

interface AmplitudeEndpointConfig {
  name: AmplitudeInstanceName;
  apiKey: string;
  userId?: string;
  config?: Config;
  callback?: (client: AmplitudeClient) => void;
}

const AMP_CONFIG: AmplitudeEndpointConfig = {
  name: 'default',
  apiKey: AMPLITUDE_API_KEY,
  config: { apiEndpoint: INTERNAL_APPLOG_API_ENDPOINT },
};

const makeInstance = (name: AmplitudeInstanceName, config: AmplitudeEndpointConfig): AmplitudeClient => {
  const instance: AmplitudeClient = amplitude.getInstance(name);
  instance.init(config.apiKey, config.userId, config.config, config.callback);
  return instance;
};

const sanitizeLogData = (eventName: string, data?: any) => {
  // NOTE: referrer_event 속성은 CTA 이벤트들에서만 전송되어야 합니다.
  const shouldPreserveReferrerEventProperty = REFERRER_EVENT_PROPERTY_SEND_EVENT_NAMES.has(eventName);
  if (!shouldPreserveReferrerEventProperty && isObject(data)) {
    const nextData = { ...data, referrer_event: get(data, 'referrer_event', '') };
    delete nextData.referrer_event;
    return nextData;
  }
  return data;
};

/**
 * 2개 이상의 AmplitudeClient 이용을 위한 Class
 */
class AmplitudeMultiEndpointClient {
  private userId: string | null;

  /**
   * 기본 클라이언트 인스턴스
   * getSessionId 등, Return값 이용시는 이 client를 기준으로 한다.
   * @private
   */
  private defaultInstance: AmplitudeClient;

  /**
   * 추가 클라이언트 인스턴스 List
   * 오류 발생 시 무시한다.
   * @private
   */
  private additionalInstances: AmplitudeClient[];

  constructor(defaultConfig: AmplitudeEndpointConfig, ...additionalConfigs: AmplitudeEndpointConfig[]) {
    this.defaultInstance = makeInstance('default', defaultConfig);
    this.additionalInstances = additionalConfigs.map((config) => makeInstance(config.name, config));
    this.userId = null;
  }

  execForAllInstances(func: (instance: AmplitudeClient) => void) {
    func(this.defaultInstance);
    try {
      this.additionalInstances.forEach(func);
    } catch (e) {
      console.error(e);
    }
  }

  getDeviceId(): string {
    return this.defaultInstance.getDeviceId();
  }

  getSessionId(): number {
    return this.defaultInstance.getSessionId();
  }

  setUserId(userId: string | null) {
    this.userId = userId;
    this.execForAllInstances((instance) => {
      // 기존로직 유지 위해 'null' 로 처리
      instance.setUserId(userId ?? 'null');
    });
  }

  setUserProperties(properties: any): void {
    this.execForAllInstances((instance) => {
      instance.setUserProperties(properties);
    });
  }

  clearUserProperties(): void {
    this.execForAllInstances((instance) => {
      instance.clearUserProperties();
    });
  }

  /**
   * 원 AmplitudeClient 의 logEvent 의 경우 LogReturn 을 return 하지만
   * 현재 사용하는 부분이 없고 여러개의 return 값중 어떤것을 사용할 지에 대한 정책이 없어 void 형태로 작성
   *
   * callback 또한 마찬가지로 여러개의 callback 이 발생할 수 있는 side effect 여지가 있어 제거.
   * 필요한 경우 정책 결정 후 추가하여 사용할것
   */
  logEvent(event: string, data?: any): void {
    this.execForAllInstances((instance) => {
      instance.logEvent(event, data);
    });
  }
}

export default class AmplitudeService {
  userId?: string;

  instance?: AmplitudeMultiEndpointClient;

  bucket?: AmplitudeBucket;

  getInstance() {
    if (!this.instance) {
      this.instance = new AmplitudeMultiEndpointClient(AMP_CONFIG);
      this.bucket = this.bucketInstance();
    }

    return this.instance;
  }

  getDeviceId() {
    const instance = this.getInstance();
    return instance.getDeviceId();
  }

  bucketInstance() {
    if (!this.bucket) {
      this.bucket = new AmplitudeBucket(nanoid);
    }

    return this.bucket;
  }

  setScreenName(screenName: ScreenName) {
    if (isWebview()) {
      appService.analyticsSetScreenName(screenName);
      return;
    }

    const instance = this.bucketInstance();
    instance.updateScreenName(screenName);
  }

  logEvent<T>(event: AmplitudeEvent<T>) {
    if (!process.browser || !AMPLITUDE_API_KEY) {
      return;
    }

    if (isWebview()) {
      appService.analyticsSendAmplitudeEvent(event);
      // 웹뷰로 띄워져 referrer_event를 가져가야 할 경우가 아니면 return 하여 불필요한 버켓 연산을 수행하지 않도록 함
      if (!WEBVIEW_REFERRER_EVENT_SAVE.has(event.getName())) {
        return;
      }
    }

    const bucket = this.bucketInstance();

    bucket.updateEventName(event.getName());
    bucket.updateSelectionType(event.getPayload());
    bucket.updateReferrerEvent(event.getName(), event.getPayload());
    bucket.updatePreviousScreenName(event.getName());
    bucket.updateBrowseSectionId(event.getName(), event.getPayload());

    const instance = this.getInstance();
    if (this.userId) {
      instance.setUserId(this.userId);
    } else {
      instance.setUserId(null);
    }

    // 웹뷰가 아닌 경우에만 logEvent 실행(만약 해당 조건문을 걸지 않는다면 웹뷰로 띄워졌을 때 log Event가 중복으로 실행됨)
    if (!isWebview()) {
      const eventName = event.getName();
      instance.logEvent(
        eventName,
        sanitizeLogData(eventName, {
          ...event.getPayload(),
          ...bucket.getData(),
        }),
      );
    }

    bucket.updateBrowseEventName(event.getName());
    bucket.updateBrowseSubEventName(event.getName());
    bucket.updateBrowseEventInfo(event.getName(), event.getPayload());
    bucket.updateBrowseSubEventInfo(event.getName(), event.getPayload());
  }

  setUserId(userId?: string) {
    if (isWebview()) {
      return;
    }

    this.userId = userId;
  }

  getScreenName() {
    const instance = this.bucketInstance();

    return instance.getScreenName();
  }

  setTabName(tabName: TabName) {
    const bucket = this.bucketInstance();
    bucket.updateBrowseTabName(tabName);
  }

  setUserProperties(properties: UserPropertiesInterface) {
    const instance = this.getInstance();

    const keys: string[] = Object.keys(properties);
    const storedData = window.sessionStorage.getItem(USER_PROPERTIES_KEY);
    let parseStoredData: UserPropertiesInterface = {};
    const sendProperty: UserPropertiesInterface = {};

    try {
      if (storedData) {
        parseStoredData = JSON.parse(storedData);
      }
    } catch {}

    for (const key of keys) {
      const property = properties[key];

      if (isEmpty(parseStoredData) || parseStoredData[key] !== property) {
        sendProperty[key] = property;
        window.sessionStorage.setItem(
          USER_PROPERTIES_KEY,
          JSON.stringify(Object.assign(parseStoredData, sendProperty)),
        );
      }
    }

    if (!isEmpty(sendProperty)) {
      instance.setUserProperties(sendProperty);
    }
  }

  getSessionId() {
    const instance = this.getInstance();

    return instance.getSessionId();
  }

  clearUserProperties() {
    const instance = this.getInstance();

    instance.clearUserProperties();
    window.sessionStorage.removeItem(USER_PROPERTIES_KEY);
  }

  getWebviewReferrerEvent() {
    const instance = this.bucketInstance();
    return instance.webviewReferrerEvent;
  }

  setWebviewReferrerEvent(referrerEvent: string | null) {
    const instance = this.bucketInstance();
    instance.updateWebviewReferrerEvent(referrerEvent);
  }
}
