import { GoBackError } from '../../../shared/errors';

export class NotInvalidPhoneNumberError extends GoBackError {
  constructor(code: string) {
    super(`휴대폰 번호가 유효하지 않습니다. 카카오 계정의 휴대폰 번호를 확인해 주세요.(오류코드 : ${code})`);
  }
}
