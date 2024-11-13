import { useDispatch } from 'react-redux';

import { changeProductIsPicked } from '../slice';
import { useAppSelector } from '../../../shared/store';
import { redirectToLogin } from '../../../shared/reducers/page';

export default function usePickProduct(isReferrerReviewDetail?: boolean) {
  const dispatch = useDispatch();
  const isGuest = useAppSelector(({ auth }) => auth.isGuest);
  const isPicked = useAppSelector(({ productDetail }) => productDetail.isPicked);

  const toggleLike = () => {
    if (isGuest) {
      dispatch(redirectToLogin());
      return;
    }

    dispatch(changeProductIsPicked(isReferrerReviewDetail));
  };

  return {
    isActiveLike: isPicked,
    toggleLike,
  };
}
