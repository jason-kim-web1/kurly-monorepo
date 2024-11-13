interface Props {
  groupOrderNo: number;
  orderNos?: number[];
}

export const getCancelOrderQueryString = ({ groupOrderNo, orderNos }: Props) => {
  const params = {
    ...(groupOrderNo && { groupOrderNo: groupOrderNo.toString() }),
    ...(orderNos && { orderNos: orderNos.toString() }),
  };

  return `?${new URLSearchParams(params).toString()}`;
};
