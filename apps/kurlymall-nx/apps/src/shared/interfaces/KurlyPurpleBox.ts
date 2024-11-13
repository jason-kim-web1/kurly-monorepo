import { RequestStateType } from '../../mypage/kurly-purple-box/shared/types/requestStateType';

//신청가능 지역 여부 조회
export interface PersonalBoxAvailable {
  data: boolean;
}

//개인 보냉박스 신청 조회
export interface PersonalBox {
  apply: boolean;
  imageUrl: string;
  requestState: RequestStateType | '';
  reason: string;
}

//개인 보냉박스 신청 API
export interface PersonalBoxParam {
  upload_image_file: File;
}
