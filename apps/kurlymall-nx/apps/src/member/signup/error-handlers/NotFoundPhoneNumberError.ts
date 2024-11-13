import { GoBackError } from '../../../shared/errors';

export class NotFoundPhoneNumberError extends GoBackError {
  constructor(code: string) {
    super(
      `휴대폰 번호가 없는 카카오 계정으로는 가입하실 수 없습니다. 카카오 계정의 휴대폰 정보를 확인해 주세요.(오류코드 : ${code})`,
    );
  }
}
