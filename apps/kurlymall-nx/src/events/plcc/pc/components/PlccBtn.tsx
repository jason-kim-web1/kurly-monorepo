import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useIssuanceKurlypayCard from '../../../../order/checkout/shared/hooks/useIssuanceKurlypayCard';
import Button from '../../../../shared/components/Button/Button';
import { redirectToLogin } from '../../../../shared/reducers/page';
import { AppState } from '../../../../shared/store';

export default function PlccBtn() {
  const dispatch = useDispatch();
  const { isGuest } = useSelector(({ auth }: AppState) => auth);

  const clickToRedirectToLogin = useCallback(() => {
    dispatch(redirectToLogin());
  }, [dispatch]);

  const { handleCardFormSubmit } = useIssuanceKurlypayCard();

  return (
    <Button
      text="컬리카드 신청하기"
      theme="primary"
      radius={4}
      onClick={isGuest ? clickToRedirectToLogin : handleCardFormSubmit}
    />
  );
}
