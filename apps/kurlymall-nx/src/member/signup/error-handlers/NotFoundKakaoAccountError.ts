import { GoBackError } from '../../../shared/errors';

export class NotFoundKakaoAccountError extends GoBackError {
  constructor(code: string) {
    super(
      `카카오 회원 정보를 불러올 수 없습니다.
      다시 시도해 주세요(오류코드 : ${code})`,
    );
  }
}
