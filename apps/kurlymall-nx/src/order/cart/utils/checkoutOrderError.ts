import { NextRouter } from 'next/router';
import { Alert } from '@thefarmersfront/kpds-react';

import { OnlyMembersProductsError, ProceedToCheckoutError } from '../../../shared/errors';
import {
  MEMBERSHIP_DIALOG_GUIDE_TEXT,
  MEMBERSHIP_DIALOG_REDIRECT_BUTTON_TEXT,
  MEMBERSHIP_DIALOG_TITLE,
} from '../../../shared/components/Cart/MembershipOnlyProductAlert/constants';
import { MEMBERSHIP_PATH } from '../../../shared/constant';

interface CheckoutOrderErrorProps {
  err: Error;
  router: NextRouter;
}
export const handleCheckoutOrderError = async ({ err, router: { reload, push } }: CheckoutOrderErrorProps) => {
  if (err instanceof OnlyMembersProductsError) {
    const { isConfirmed } = await Alert({
      title: MEMBERSHIP_DIALOG_TITLE.ONLY_MEMBERS_ERROR,
      contents: MEMBERSHIP_DIALOG_GUIDE_TEXT.ONLY_MEMBERS_ERROR,
      confirmButtonTitle: MEMBERSHIP_DIALOG_REDIRECT_BUTTON_TEXT,
      showCancelButton: true,
      buttonLayout: 'vertical',
    });

    if (isConfirmed) {
      await push(MEMBERSHIP_PATH.membership.uri);
      return;
    }

    reload();
    return;
  }

  await Alert({ contents: err.message });
  if (err instanceof ProceedToCheckoutError) reload();
};
