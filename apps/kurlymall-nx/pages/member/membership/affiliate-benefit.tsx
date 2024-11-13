import { useDispatch } from 'react-redux';

import { useEffect } from 'react';

import { redirectTo } from '../../../src/shared/reducers/page';
import { MYPAGE_PATH } from '../../../src/shared/constant';
import { sentryCaptureError } from '../../../src/shared/services';

export default function AffiliateBenefitPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    // TODO 이전 멤버스 외부제휴 혜택 페이지 접근 수 체크를 위해. 이 페이지에 대한 접근이 사라지면 삭제 예정
    sentryCaptureError('AffiliateBenefitPage is deprecated');

    dispatch(redirectTo({ url: MYPAGE_PATH.affiliateBenefit.uri, replace: true }));
  }, [dispatch]);

  return null;
}
