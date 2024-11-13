import { useRouter } from 'next/router';

import { useDispatch } from 'react-redux';

import { useEffect } from 'react';

import Loading from '../../../shared/components/Loading/Loading';
import CouponPack from '../components/CouponPack';

import useCouponPackQuery from '../hooks/useCouponPackQuery';
import Alert from '../../../shared/components/Alert/Alert';
import { redirectTo } from '../../../shared/reducers/page';
import { getPageUrl, MEMBERSHIP_PATH } from '../../../shared/constant';
import { useAppSelector } from '../../../shared/store';
import { loadMemberLoading } from '../../../shared/reducers/member';

export default function CouponPackContainer() {
  const { isReady } = useRouter();

  const dispatch = useDispatch();

  const isSubscribed = useAppSelector(({ member }) => member.subscription.isSubscribed);

  const memberLoading = useAppSelector(loadMemberLoading);

  const { isError, isLoading, selectedBenefitOptionId, providedBenefitOptionId, couponMetaList } = useCouponPackQuery();

  useEffect(() => {
    if (memberLoading) {
      return;
    }

    if (!isSubscribed) {
      Alert({
        text: '유효하지 않은 접근입니다. 다시 시도해주세요.',
      }).then(() => {
        dispatch(
          redirectTo({
            url: getPageUrl(MEMBERSHIP_PATH.membership),
            replace: true,
          }),
        );
      });
    }
  }, [dispatch, isError, isSubscribed, memberLoading]);

  if (isError) {
    return null;
  }

  if (!isReady || isLoading) {
    return <Loading testId="loading" />;
  }

  return (
    <CouponPack
      isLoading={isLoading}
      selectedBenefitOptionId={selectedBenefitOptionId}
      providedBenefitOptionId={providedBenefitOptionId}
      couponMetaList={couponMetaList}
    />
  );
}
