export const ORDER_DETAIL_QUERY_KEYS = {
  DETAIL: (groupOrderNo: number) => ['orderDetail', groupOrderNo] as const,
  REFUND_QR: (groupOrderNo: number) => ['orderDetail', 'refundQR', groupOrderNo] as const,
};
