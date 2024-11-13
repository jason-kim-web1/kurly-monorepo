import { useDispatch } from 'react-redux';

import { useEffect } from 'react';

import { redirectTo } from '../../../src/shared/reducers/page';
import { USER_MENU_PATH } from '../../../src/shared/constant';

export default function MemberBenefitInviteCartPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(redirectTo({ url: USER_MENU_PATH.home.uri, replace: true }));
  }, [dispatch]);

  return null;
}
