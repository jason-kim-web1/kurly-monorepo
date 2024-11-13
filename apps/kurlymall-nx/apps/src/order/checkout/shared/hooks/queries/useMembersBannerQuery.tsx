import { useQuery } from '@tanstack/react-query';

import { getDaBanner } from '../../../../../header/services/banner.service';
import { MembersBannerType } from '../../constants/kurly-members-banner';

import { getQueryKey } from '../../utils/getMembersBannerQueryKey';
import { useAppSelector } from '../../../../../shared/store';
import { loadMemberLoading } from '../../../../../shared/reducers/member';

export default function useMembersBannerQuery(bannerType: MembersBannerType) {
  const { isSubscribed } = useAppSelector(({ member }) => ({
    isSubscribed: member.subscription.isSubscribed,
  }));

  const memberLoading = useAppSelector(loadMemberLoading);

  const queryKey = getQueryKey(bannerType);
  const option = {
    enabled: !isSubscribed && !memberLoading,
  };

  const { data } = useQuery(queryKey, () => getDaBanner(bannerType), option);

  return { membersBanner: { bannerUrl: data?.image, bannerTitle: data?.title }, bannerLink: data?.link ?? '' };
}
