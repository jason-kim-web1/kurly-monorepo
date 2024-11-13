import Alert from '../../Alert/Alert';
import MembershipOnlyProductContent from './MembershipOnlyProductContent';
import { isPC } from '../../../../../util/window/getDevice';
import { checkEqualValueByBase } from '../../../utils/lodash-extends';
import { MEMBERSHIP_PURCHASE_ALERT_TYPE, PRODUCT_SELECT_USER_ACTION_TYPE } from './constants';
import type { MembershipPurchaseAlertInfo, MembershipPurchasePopupType } from '../../../../product/detail/types';

const alertInnerStyle = isPC
  ? `
    .popup-content {
      height: auto;
      overflow-x: hidden;
      padding: 24px 30px 40px;
      border-radius: 12px;
      box-shadow: none;
      text-align: center;
      word-break: keep-all;
    }
    `
  : `
    .popup-content {
      text-align: left;
      line-height: 22px;
    }
    `;

const membersAlertInnerStyle = isPC
  ? `
    .swal2-popup {
      min-width: 440px;
    }
    .popup-content {
      width: 100%;
      height: auto;
      overflow-x: hidden;
      padding: 30px;
      border-radius: 12px;
      box-shadow: none;
      text-align: left;
    }
    `
  : `
    .popup-content {
      width: 100%;
      overflow-x: hidden;
      padding: 16px;
      border-radius: 12px;
      box-shadow: none;
      &.MuiPaper-root {
        margin: 20px;
      }
    }
    `;

const checkMembersJoinType = checkEqualValueByBase<MembershipPurchasePopupType>(
  MEMBERSHIP_PURCHASE_ALERT_TYPE.MEMBERS_JOIN,
);

interface Props {
  userAction?: keyof typeof PRODUCT_SELECT_USER_ACTION_TYPE;
  membershipPurchaseAlertInfo: MembershipPurchaseAlertInfo;
  onClickConfirm(): void;
}

export default function MembershipOnlyProductAlert({
  userAction = 'SET_QUANTITY',
  membershipPurchaseAlertInfo,
  onClickConfirm,
}: Props) {
  const { type, title, text } = membershipPurchaseAlertInfo;
  const isMembersJoin = checkMembersJoinType(type);
  const alertTitle = isMembersJoin ? '' : title;
  const alertText = isMembersJoin ? '' : text;
  const contents = isMembersJoin ? (
    <MembershipOnlyProductContent userAction={userAction} title={title} text={text} onConfirm={onClickConfirm} />
  ) : null;
  const contentsStyle = isMembersJoin ? membersAlertInnerStyle : alertInnerStyle;

  return Alert({
    title: alertTitle,
    text: alertText,
    contents,
    contentsStyle,
    showConfirmButton: !isMembersJoin,
  });
}
