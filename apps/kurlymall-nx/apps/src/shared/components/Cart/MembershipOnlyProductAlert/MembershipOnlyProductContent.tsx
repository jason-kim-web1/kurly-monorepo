import styled from '@emotion/styled';

import Swal from 'sweetalert2';

import withReactContent from 'sweetalert2-react-content';

import {
  MEMBERSHIP_DIALOG_GUIDE_TEXT,
  MEMBERSHIP_DIALOG_REDIRECT_BUTTON_TEXT,
  MEMBERSHIP_DIALOG_TITLE,
  PRODUCT_SELECT_USER_ACTION_TYPE,
} from './constants';
import Button from '../../Button/Button';
import { isPC } from '../../../../../util/window/getDevice';
import COLOR from '../../../constant/colorset';
import { amplitudeService } from '../../../amplitude';
import { SelectMembership } from '../../../amplitude/events/membership';

const MembershipOnlyProductTitle = styled.header`
  padding: ${isPC ? '0 0 24px' : '8px 8px 16px'};
  > h1 {
    font-size: 20px;
    font-weight: 500;
    line-height: 25px;
    color: ${COLOR.kurlyGray800};
    letter-spacing: -0.1px;
  }
`;

const MEMBERSHIP_ONLY_PRODUCT_GUIDE_TEXT_PADDING = {
  SET_QUANTITY: '0 8px 16px',
  ADD_TO_CART: '8px 8px 24px',
  ONLY_MEMBERS_ERROR: '8px 8px 24px',
} as const;

const MembershipOnlyProductGuideText = styled.p<{
  userAction: keyof typeof PRODUCT_SELECT_USER_ACTION_TYPE;
}>`
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  color: ${COLOR.kurlyGray600};
  padding: ${({ userAction }) => (isPC ? '0 0 24px' : MEMBERSHIP_ONLY_PRODUCT_GUIDE_TEXT_PADDING[userAction])};
`;

const ButtonGroupWrapper = styled.footer`
  display: flex;
  flex-direction: ${isPC ? 'row' : 'column-reverse'};
  justify-content: space-between;
  gap: 8px;
`;

interface Props {
  userAction: keyof typeof PRODUCT_SELECT_USER_ACTION_TYPE;
  title?: string | null;
  text?: string | null;
  onDismissed?: VoidFunction;
  onConfirm?: VoidFunction;
}

const swal = withReactContent(Swal);

export default function MembershipOnlyProductContent({
  userAction,
  title = null,
  text = null,
  onDismissed,
  onConfirm,
}: Props) {
  const handleClickCancel = () => {
    if (onDismissed) {
      onDismissed();
    }
    swal.clickCancel();
  };

  const handleClickConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }

    amplitudeService.logEvent(new SelectMembership({ selection_type: 'members_deal' }));
    swal.clickConfirm();
  };

  return (
    <>
      <MembershipOnlyProductTitle>
        <h1>{!!title ? title : MEMBERSHIP_DIALOG_TITLE[userAction]}</h1>
      </MembershipOnlyProductTitle>
      <MembershipOnlyProductGuideText userAction={userAction}>
        {!!text ? text : MEMBERSHIP_DIALOG_GUIDE_TEXT[userAction]}
      </MembershipOnlyProductGuideText>
      <ButtonGroupWrapper>
        <Button text="취소" theme="tertiary" radius={isPC ? 3 : 6} onClick={handleClickCancel} />
        <Button text={MEMBERSHIP_DIALOG_REDIRECT_BUTTON_TEXT} radius={isPC ? 3 : 6} onClick={handleClickConfirm} />
      </ButtonGroupWrapper>
    </>
  );
}
