import httpClient from '../../configs/http-client';
import { PersonalBox, PersonalBoxParam, PersonalBoxAvailable } from '../../interfaces/KurlyPurpleBox';
import { BaseApiResponse } from '../../interfaces';
import { RequestStateType } from '../../../mypage/kurly-purple-box/shared/types/requestStateType';

export interface PersonalBoxApi {
  apply: boolean;
  img_url: string;
  property: RequestStateType;
  reason: string;
}

//신청가능 지역 여부 조회
export const fetchPersonalBoxAvailable = async ({
  address,
  addressDetail,
}: {
  address: string;
  addressDetail: string;
}): Promise<boolean> => {
  const url = '/repack/v1/personal-bag/availability';

  try {
    const { data } = await httpClient.get<PersonalBoxAvailable>(url, {
      params: {
        address,
        addressDetail,
      },
    });
    return data.data;
  } catch {
    throw new Error('신청가능 지역 조회에 실패하였습니다.');
  }
};

//개인 보냉박스 신청 조회
export const fetchPersonalBox = async (): Promise<PersonalBox> => {
  const url = '/repack/v1/personal-bag/status';

  try {
    const { data } = await httpClient.get<BaseApiResponse<PersonalBoxApi>>(url);
    const { apply, img_url: imageUrl, property: requestState, reason } = data.data;
    return { apply, imageUrl, requestState, reason };
  } catch {
    throw new Error('개인 보냉박스 신청 조회에 실패하였습니다.');
  }
};

//개인 보냉박스 신청
export const requestPersonalBox = async (uploadImageFile: File | string): Promise<PersonalBoxParam> => {
  const url = '/repack/v1/personal-bag/register';
  const formData = new FormData();
  formData.append('upload_image_file', uploadImageFile);
  try {
    const { data } = await httpClient.post<PersonalBoxParam>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch {
    throw new Error('개인 보냉박스 신청에 실패하였습니다.');
  }
};
