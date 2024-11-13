import { ORDER_STATUS, OrderStatus } from '../../common/constants/OrderStatus';

export const ACTION_BUTTON_TEXT = {
  배송조회: '배송조회',
  후기작성: '후기작성',
  주문취소: '주문취소',
} as const;

export type ActionButtonText = keyof typeof ACTION_BUTTON_TEXT;

interface OrderActionButton {
  status: OrderStatus;
  buttons: ActionButtonText[];
}

type OrderActionButtons = OrderActionButton[];

export const ORDER_ACTION_BUTTONS: OrderActionButtons = [
  { status: ORDER_STATUS.주문완료, buttons: [ACTION_BUTTON_TEXT.주문취소] },
  { status: ORDER_STATUS.배송완료, buttons: [ACTION_BUTTON_TEXT.후기작성] },
];
