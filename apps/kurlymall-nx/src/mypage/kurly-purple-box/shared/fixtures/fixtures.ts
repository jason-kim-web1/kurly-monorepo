import { RequestState, RequestStateType } from '../types/requestStateType';
import { ICON_CAMERA } from '../constants/imageUrl';

interface PersonalBox {
  data: PersonalBoxData;
  isError: boolean;
}

interface PersonalBoxData {
  apply: boolean;
  imageUrl: string;
  requestState: RequestStateType | '';
  reason: string;
}

export const usePersonalBoxFixture: PersonalBox = {
  data: {
    apply: false,
    imageUrl: '',
    requestState: '',
    reason: '',
  },
  isError: false,
};

export const usePersonalBoxDataFixture: PersonalBoxData = {
  apply: false,
  imageUrl: ICON_CAMERA,
  requestState: RequestState.REQUESTED,
  reason: '',
};
