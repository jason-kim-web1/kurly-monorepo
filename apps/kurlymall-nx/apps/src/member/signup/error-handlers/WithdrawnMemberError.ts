import { GoBackError } from '../../../shared/errors';

export class WithdrawnMemberError extends GoBackError {
  constructor(code: string) {
    super(
      `탈퇴 회원은 3개월간 회원가입이 불가능합니다.
      탈퇴한 적이 없다면 고객센터로 문의해 주세요.
      1644-1107.
      (오류코드 : ${code})`,
    );
  }
}
