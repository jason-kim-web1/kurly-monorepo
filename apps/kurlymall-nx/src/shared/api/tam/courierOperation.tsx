import httpClient from '../../configs/http-client';

import { SearchAddressError } from '../../errors/shipping-address/SearchAddressError';
import { CourierOperationRequest, CourierOperationResponse, DeliveryTimeType } from '../../interfaces/ShippingAddress';

export async function fetchCourierOperation(
  params: CourierOperationRequest,
  preferredDeliveryTime?: DeliveryTimeType,
): Promise<CourierOperationResponse> {
  const url = `/addressbook/v1/regions/check-address${
    preferredDeliveryTime ? `?preferredDeliveryTime=${preferredDeliveryTime}` : ''
  }`;

  try {
    const { data } = await httpClient.post(url, params);

    if (data.data.delivery_type === null) {
      throw new SearchAddressError(
        new Error(
          '주소지의 상세 정보를 가져올 수 없습니다. \n상세한 내용은 배송 공지사항을 확인해주세요. \n배송지 저장 및 주문에는 영향이 없습니다.',
        ),
      );
    }

    return data.data;
  } catch (err) {
    throw new SearchAddressError(err);
  }
}
