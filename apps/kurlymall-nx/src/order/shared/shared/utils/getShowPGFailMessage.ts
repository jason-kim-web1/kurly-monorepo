import { OrderVendorCode } from '../interfaces';

interface Props {
  selectedVendorCode: OrderVendorCode;
  paymentGatewayMessage?: string;
}

/**
 * 결제 실패 페이지에서 결제 실패 메세지를 보여줘야 하는지 여부를 반환합니다.
 *
 * @param { OrderVendorCode } props.selectedVendorCode
 * @param { string } props.paymentGatewayMessage
 * @return { boolean }
 */
export const getShowPGFailMessage = ({ selectedVendorCode, paymentGatewayMessage }: Props) => {
  const AllowedVendorCode: OrderVendorCode[] = ['phonebill'];

  return !!(AllowedVendorCode.includes(selectedVendorCode) && paymentGatewayMessage);
};
