/**
 * 배송 탬플릿
 *
 * DEFAULT : 샛별배송용 템플릿 (오전 7시)
 *
 * AM8 : 샛별배송용 템플릿 (오전 8시)
 *
 * NO_DELIVERY_MSG_TIME : 일반 택배배송용 템플릿
 */
export enum ReceiverDetailTemplate {
  DEFAULT = 'DEFAULT',
  AM8 = 'AM8',
  NO_DELIVERY_MSG_TIME = 'NO_DELIVERY_MSG_TIME',
}

export type ReceiverDetailTemplateType = keyof typeof ReceiverDetailTemplate;
