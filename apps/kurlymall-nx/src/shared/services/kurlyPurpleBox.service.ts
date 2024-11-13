import {
  fetchPersonalBox,
  fetchPersonalBoxAvailable,
  requestPersonalBox,
} from '../api/kurly-purple-box/kurlyPurpleBox';
import { PersonalBox, PersonalBoxParam } from '../../shared/interfaces/KurlyPurpleBox';

//신청가능 지역 여부 조회
export const getPersonalBoxAvailable = (params: { address: string; addressDetail: string }): Promise<boolean> => {
  return fetchPersonalBoxAvailable(params);
};

//개인 보냉박스 신청 조회
export const getPersonalBox = (): Promise<PersonalBox> => {
  return fetchPersonalBox();
};

//개인 보냉박스 신청
export const updatePersonalBox = (uploadImageFile: File | string): Promise<PersonalBoxParam> => {
  return requestPersonalBox(uploadImageFile);
};
