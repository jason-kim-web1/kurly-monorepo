export const REFETCH_PERSONAL_CUSTOMS_CODE = 'refetchPersonalCustomsCode';

export type CustomMessageType = typeof REFETCH_PERSONAL_CUSTOMS_CODE;

export interface CustomMessageEvent {
  type: CustomMessageType;
}

export default CustomMessageEvent;
