import { GoBackError } from '../../../shared/errors';

export class NotAvailableAddressError extends GoBackError {
  constructor(code: string) {
    super(
      `사용할 수 없는 배송지입니다.
      일반 회원가입을 시도해 주세요.(오류코드 : ${code})`,
    );
  }
}
