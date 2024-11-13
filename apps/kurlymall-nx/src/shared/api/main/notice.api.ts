import { UnknownError } from '../../errors';
import httpClient from '../../configs/http-client';
import { BaseResponse } from '../../interfaces';

interface PopupNoticeData {
  id: number;
  name: string;
  title: string;
  content: string;
  close_option: string;
  show_order: string;
  popup: { link: string; url: string };
  buttons: { no_show_hours: number; label: string }[];
  pc: { link: string; content: string };
  mobile: { link: string; content: string };
}

export async function fetchMainPopupNotices() {
  try {
    const { data } = await httpClient.get<BaseResponse<PopupNoticeData[]>>('/v3/home/notices');
    return data.data;
  } catch (error) {
    throw new UnknownError(error);
  }
}
