import { useDispatch } from 'react-redux';

import { USER_MENU_PATH, getPageUrl } from '../../../../src/shared/constant';
import { redirectTo } from '../../../shared/reducers/page';

export default function useMobileWebHeader() {
  const dispatch = useDispatch();

  const handleClickClose = () => {
    dispatch(
      redirectTo({
        url: getPageUrl(USER_MENU_PATH.home),
      }),
    );
  };

  return { handleClickClose };
}
