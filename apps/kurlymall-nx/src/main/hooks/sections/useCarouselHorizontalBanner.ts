import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import type { MainSite } from '../../interfaces/MainSection.interface';
import { useAppSelector } from '../../../shared/store';
import { getMainCarouselHorizontalBannerPayload } from '../../service/main.service';
import { checkValidSectionId } from '../../util/checkValidSectionId';
import { queryKeys } from '../../constants';

interface Props {
  site: MainSite;
  sectionId: number;
}

export const useCarouselHorizontalBanner = ({ site, sectionId }: Props) => {
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);
  const queryResult = useQuery(
    queryKeys.carouselBanner(site, sectionId),
    () => getMainCarouselHorizontalBannerPayload(site, sectionId),
    {
      enabled: hasSession && checkValidSectionId(sectionId),
    },
  );
  const { data } = queryResult;
  const title = get(data, 'title', '');
  const subTitle = get(data, 'subtitle', '');
  const bannerList = get(data, 'banners', []);
  return {
    ...queryResult,
    title,
    subTitle,
    bannerList,
  };
};
