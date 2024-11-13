import { ImageFormat } from '../../../../@types/images';
import httpClient from '../../configs/http-client';
import { BaseResponse } from '../../interfaces';
import { Nullable } from '../../types';

interface PickupRefundQRParams {
  orderNo: number;
}

interface PickupRefundQRResponse {
  qrImage: Nullable<string>;
  qrImageType: Nullable<{ code: ImageFormat }>;
}

export const fetchPickupRefundQR = async ({ orderNo }: PickupRefundQRParams) => {
  const url = `/order-external/v1/pickup/${orderNo}/refund-qr`;

  const { data } = await httpClient.get<BaseResponse<PickupRefundQRResponse>>(url);

  return {
    qrImage: data?.data.qrImage,
    qrImageType: data?.data.qrImageType?.code,
  };
};
