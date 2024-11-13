import { UnknownError } from '../../errors';

import { BaseResponse } from '../../interfaces';
import httpClient from '../../configs/http-client';
import { KAKAO_CS_URL } from '../../configs/config';

interface KakaoResponse {
  cancel_button_title: string;
  code: string;
  confirm_flag: boolean;
  message: string;
  ok_button_action_url: string;
  ok_button_title: string;
  title: string;
}

const KAKAO_INQUERY_URL = ['api.happytalk.io', 'pf.kakao.com'];

export const fetchKakao = async () => {
  const url = '/v1/mypage/asks/confirm/kakao';
  try {
    const { data } = await httpClient.get<BaseResponse<KakaoResponse>>(url);

    const response = {
      cancelButtonTitle: data.data.cancel_button_title,
      code: data.data.code,
      confirmFlag: data.data.confirm_flag,
      message: data.data.message,
      okButtonActionUrl: data.data.ok_button_action_url ?? '',
      okButtonTitle: data.data.ok_button_title,
      title: data.data.title,
      isKakaoUrl: false,
    };

    const isOutlink = KAKAO_INQUERY_URL.find((csLink) => {
      return response.okButtonActionUrl.includes(csLink);
    });

    if (isOutlink) {
      response.okButtonActionUrl = KAKAO_CS_URL;
      response.isKakaoUrl = true;
    }

    return response;
  } catch (err) {
    throw new UnknownError(err);
  }
};
