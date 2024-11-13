import { GoBackError } from '../../../shared/errors';

export class AlreadyExistAccountError extends GoBackError {
  constructor(code: string) {
    super(
      `이미 회원 정보가 존재합니다. 컬리 회원인 경우 아이디로 로그인을 해주세요.

      컬리 회원이 아니신가요? 가입을 하신 적 없다면 고객센터로 문의 주세요. (1644-1107)
      (오류코드 : ${code})`,
    );
  }
}
