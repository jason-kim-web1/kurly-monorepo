import { SweetAlertResult } from 'sweetalert2';

import MembershipOnlyProductContent from '../../Cart/MembershipOnlyProductAlert/MembershipOnlyProductContent';
import Alert, { checkClosedByBackDrop } from '../Alert';

import { PRODUCT_SELECT_USER_ACTION_TYPE } from '../../Cart/MembershipOnlyProductAlert/constants';
import { membersAlertInnerStyle } from './style';

interface Params {
  onDismissed: VoidFunction;
  onConfirm: VoidFunction;
}

/**
 * 주문서/장바구니 영역에서 컬리멤버스 상품을 구매할 수 없는 user 가 구매 시도 시 보여 줄 alert 입니다.
 *
 * @param onDismissed '취소' 또는 alert 바깥 backdrop 클릭 시 실행할 action
 * @param onConfirm '컬리멤버스 혜택받기' 클릭 시 실행할 action
 * @returns
 */
export const OnlyMembersProductAlert = async ({ onDismissed, onConfirm }: Params) => {
  const { dismiss }: SweetAlertResult = await Alert({
    contents: (
      <MembershipOnlyProductContent
        userAction={PRODUCT_SELECT_USER_ACTION_TYPE.ONLY_MEMBERS_ERROR}
        onDismissed={onDismissed}
        onConfirm={onConfirm}
      />
    ),
    contentsStyle: membersAlertInnerStyle,
    showConfirmButton: false,
  });

  if (checkClosedByBackDrop(dismiss)) {
    onDismissed();
    return;
  }

  return;
};
