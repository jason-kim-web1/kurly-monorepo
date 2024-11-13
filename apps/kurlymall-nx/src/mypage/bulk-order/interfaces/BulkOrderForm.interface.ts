import { format } from 'date-fns';

export type DeliveryType = 'DELIVERY_ONE' | 'DELIVERY_MULTIPLE'; // 한 곳으로 수령, 여러 곳으로 수령
export type InputEventType = { name: string; value: string };

const today = format(new Date(), 'yyyy-MM-dd');

export interface BulkOrderFormRequest {
  name: string;
  contact: string;
  email: string;
  receiveDate: string;
  deliveryType: DeliveryType;
  note: string;
  agreePrivacyUse: boolean;
}

export interface BulkOrderFormResponse {
  id: number;
  receiveDate: string;
  deliveryType: number;
}

export interface BulkOrderFormInterface {
  name: string;
  contact: string;
  email: string;
  receiveDate: string;
  deliveryType: DeliveryType;
  note: string;
  agreePrivacyUse: boolean;
}

export const initialFormValues: BulkOrderFormInterface = {
  name: '',
  contact: '',
  email: '',
  deliveryType: 'DELIVERY_MULTIPLE',
  receiveDate: today,
  note: '',
  agreePrivacyUse: false,
};
