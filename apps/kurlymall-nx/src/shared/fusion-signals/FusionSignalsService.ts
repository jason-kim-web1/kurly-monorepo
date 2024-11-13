import { eq, get, includes } from 'lodash';
import router from 'next/router';

import { isIos, isMobileWeb, isPC } from '../../../util/window/getDevice';
import { putFusionSignals } from './fusionSignals.service';
import { FUSION_SIGNALS_EVENT, FusionSignalsEventType, FusionSignalsParams } from './fusionSignalsType';
import {
  loadSessionStorage,
  removeSessionStorage,
  SESSION_STORAGE_KEY,
  storeSessionStorage,
} from '../services/session.storage.service';
import type { MainSite } from '../../main/interfaces/MainSection.interface';

interface TrackingDataProps {
  type: FusionSignalsEventType;
  fusionQueryId?: string;
  query?: string;
  docId?: number;
  label?: string;
  resPos?: number;
  clickSeq?: number;
}

interface SessionStorageInterface {
  sessionId?: string;
  type?: FusionSignalsEventType;
  query?: string;
  fusionQueryId?: string;
  clickSeq?: number;
  docId?: number;
}

const formatDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const hours = currentDate.getHours().toString().padStart(2, '0');
  return `${year}${month}${day}${hours}`;
};

const VALID_FUSION_SIGNAL_EVENT_PATH = ['/search', '/goods/[productCode]', '/m/search', '/m/goods/[productCode]'];

const isFusionSignalEvent = () => {
  return includes(VALID_FUSION_SIGNAL_EVENT_PATH, router.pathname);
};

const changeTypeEventName = ({
  type,
  sessionStorageType,
}: {
  type: FusionSignalsEventType;
  sessionStorageType?: FusionSignalsEventType;
}) => {
  const isListClickSelectEvent = eq(sessionStorageType, FUSION_SIGNALS_EVENT.CLICK_SELECT);

  if (isListClickSelectEvent && eq(FUSION_SIGNALS_EVENT.CLICK_ADD_TO_CART, type)) {
    return FUSION_SIGNALS_EVENT.CLICK_ADD_TO_CART_FROM_CLICK_SELECT;
  }

  if (isListClickSelectEvent && eq(FUSION_SIGNALS_EVENT.CLICK_BUY_DIRECT, type)) {
    return FUSION_SIGNALS_EVENT.CLICK_BUY_DIRECT_FROM_CLICK_SELECT;
  }

  if (
    eq(FUSION_SIGNALS_EVENT.CLICK_ADD_TO_CART_FROM_CLICK_SELECT, sessionStorageType) &&
    eq(FUSION_SIGNALS_EVENT.CLICK_ADD_TO_CART, type)
  ) {
    return FUSION_SIGNALS_EVENT.CLICK_ADD_TO_CART_FROM_CLICK_SELECT;
  }

  return type;
};

const getDevice = () => {
  if (isPC) {
    return 'PC';
  }
  if (isMobileWeb) {
    return 'MobileWeb';
  }

  return isIos ? 'IOS' : 'Android';
};

class FusionSignalsService {
  site: FusionSignalsParams['site'] = 'market';

  uid = '';

  sessionId = '';

  fusionQueryId = '';

  query = '';

  type: FusionSignalsEventType = '';

  countClickSeq = 0;

  docId = 0;

  sessionStorage: SessionStorageInterface | null = null;

  isLeavingPage = false;

  isRequestBypassEvent = false;

  setUser({ uid, site }: { uid: string; site: MainSite }) {
    if (site) {
      this.site = eq(site, 'BEAUTY') ? 'beauty' : 'market';
    }

    if (this.uid && this.sessionId) {
      return;
    }

    if (!this.uid) {
      this.uid = uid;
    }

    if (!this.sessionId) {
      this.sessionId = get(this.sessionStorage, 'sessionId') || `${this.uid}-${formatDate()}`;
      this.updateSessionStorage({ sessionId: this.sessionId });
    }
  }

  setFusionQueryId(fusionQueryId?: string) {
    this.fusionQueryId = fusionQueryId || get(this.sessionStorage, 'fusionQueryId') || '';
    this.updateSessionStorage({ fusionQueryId: this.fusionQueryId });
  }

  setQuery(query?: string) {
    this.query = query || get(this.sessionStorage, 'query') || '';
    this.updateSessionStorage({ query: this.query });
  }

  setDocId(docId?: number) {
    this.docId = docId || get(this.sessionStorage, 'docId') || 0;
    this.updateSessionStorage({ docId: this.docId });
  }

  getSessionStorage() {
    this.sessionStorage = loadSessionStorage<SessionStorageInterface>(SESSION_STORAGE_KEY.FUSION_SIGNALS);
  }

  updateSessionStorage(updateSession: SessionStorageInterface) {
    storeSessionStorage(SESSION_STORAGE_KEY.FUSION_SIGNALS, {
      fusionQueryId: this.fusionQueryId,
      query: this.query,
      clickSeq: this.countClickSeq,
      docId: this.docId,
      ...updateSession,
    });
  }

  updateClickSeqCount() {
    if (!this.sessionStorage) {
      this.countClickSeq = 0;
      return;
    }

    const { fusionQueryId } = this.sessionStorage;
    this.countClickSeq = eq(this.fusionQueryId, fusionQueryId) ? (this.countClickSeq || 0) + 1 : 0;
  }

  resetFusionQuery() {
    removeSessionStorage(SESSION_STORAGE_KEY.FUSION_SIGNALS);
    this.fusionQueryId = '';
    this.countClickSeq = 0;
    this.sessionStorage = null;
    this.docId = 0;
    this.isLeavingPage = false;
  }

  // NOTE: 상품상세 - sessionStorage
  handleProductDetailEntryEvent() {
    this.getSessionStorage();
    this.isRequestBypassEvent = true;

    if (!eq(get(this.sessionStorage, 'type'), FUSION_SIGNALS_EVENT.CLICK_PRODUCT)) {
      this.isLeavingPage = true;
    }

    this.updateSessionStorage({
      type: '',
    });
  }

  async logEvent(trackingData: TrackingDataProps) {
    if (!trackingData || this.isLeavingPage || !isFusionSignalEvent()) {
      this.resetFusionQuery();
      return;
    }

    this.getSessionStorage();

    const isRequestEvent = eq(FUSION_SIGNALS_EVENT.REQUEST, trackingData.type);

    const isListEvent = includes(
      [FUSION_SIGNALS_EVENT.CLICK_SELECT, FUSION_SIGNALS_EVENT.CLICK_PRODUCT],
      trackingData.type,
    );

    if (
      isRequestEvent &&
      (eq(get(this.sessionStorage, 'fusionQueryId'), trackingData.fusionQueryId) || this.isRequestBypassEvent)
    ) {
      this.isRequestBypassEvent = false;
      return;
    }

    if (isRequestEvent) {
      this.setFusionQueryId(trackingData.fusionQueryId);
      this.setQuery(trackingData.query);
    }

    if (!this.fusionQueryId) {
      this.resetFusionQuery();
      return;
    }

    if (isListEvent) {
      this.updateClickSeqCount();
      this.setDocId(trackingData.docId);
    }

    this.type = changeTypeEventName({ type: trackingData.type, sessionStorageType: get(this.sessionStorage, 'type') });

    this.updateSessionStorage({
      type: this.type,
    });

    const params: FusionSignalsParams = {
      site: this.site,
      session: this.sessionId,
      app_id: getDevice(),
      user_id: this.uid,
      fusion_query_id: this.fusionQueryId,
      query: this.query,
      ...(trackingData.docId && { doc_id: trackingData.docId }),
      ...(trackingData.label && { label: trackingData.label }),
      ...(!isRequestEvent && { click_seq: this.countClickSeq }),
      ...(isListEvent && { res_offset: 0 }), // NOTE: PC의 paging을 사용 안하기 때문에 항상 0
      ...(isListEvent && { res_pos: trackingData.resPos }),
    };

    await putFusionSignals({
      type: this.type,
      params,
    });
  }
}

export const fusionSignalsService = new FusionSignalsService();
