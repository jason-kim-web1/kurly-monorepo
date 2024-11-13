import { ContentBody } from '../../../marketing/shared/type';
import { VipContentTypes, VipGiftDeliveryMethodType } from './constants';

type VipGiftDeliveryMethod = {
  type: typeof VipGiftDeliveryMethodType[keyof typeof VipGiftDeliveryMethodType];
  text: string;
  places?: { name: string; address: string }[];
};

type VipGiftDeliveryAvailableDate = { start: string; end: string; available: number[] };

type VipGiftConfig = {
  applyAvailableDate: { start: string; end: string };
  deliveryAvailableDate: VipGiftDeliveryAvailableDate;
  eventBoardId: {
    development: number;
    stage: number;
    performance: number;
    production: number;
  };
  deliveryMethods: VipGiftDeliveryMethod[];
};

type VIPBody = ContentBody & {
  giftConfig?: VipGiftConfig;
  text?: string;
  list?: string[];
  tabs?: string[];
  terms?: string;
  benefit?: {
    type: 'random-number' | 'keyword';
    identifier?: string;
    code?: string;
    maxCount?: number;
  };
};

type VipContentTypeKey = typeof VipContentTypes[keyof typeof VipContentTypes];

export type { VIPBody, VipGiftDeliveryMethod, VipGiftDeliveryAvailableDate, VipContentTypeKey };
