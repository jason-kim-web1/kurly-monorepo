import { GoBackError } from '../../../shared/errors';

export class SocialTokenExpiredError extends GoBackError {
  constructor(code: string) {
    super(`정보 입력 시간이 초과되었습니다. 다시 시도해 주세요. (오류코드 : ${code})`);
  }
}
