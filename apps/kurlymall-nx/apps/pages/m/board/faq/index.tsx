import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { redirectTo } from '../../../../src/shared/reducers/page';

export default function FaqBoardList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      redirectTo({
        url: '/m/mypage/faq',
        replace: true,
      }),
    );
  }, [dispatch]);

  return <></>;
}
