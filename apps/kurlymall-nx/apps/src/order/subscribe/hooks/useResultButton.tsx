import { useRouter } from 'next/router';

import useNavigator from '../../../shared/hooks/useNavigator';
import { isWebview } from '../../../../util/window/getDevice';
import appService from '../../../shared/services/app.service';
import { ORDER_PATH } from '../../../shared/constant';

export default function useResultButton() {
  const { replace } = useRouter();
  const { goToMyMembership, goToShopping, goToMembership } = useNavigator();
  const handleClickGoToOrder = async () => {
    if (isWebview()) {
      appService.closeWebview({
        callback_function: 'MEMBERSHIP_REFRESH_CALLBACK()',
      });
      return;
    }

    await replace(ORDER_PATH.order.uri);
  };

  return {
    handleClickMyMembership: goToMyMembership,
    handleClickMembership: goToMembership,
    handleClickGoToShopping: goToShopping,
    handleClickGoToOrder,
  };
}
