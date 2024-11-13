import styled from '@emotion/styled';
import { useCallback } from 'react';
import { isEmpty, isNull } from 'lodash';

import { isMobile } from 'react-device-detect';

import type { MainSite } from '../../../main/interfaces/MainSection.interface';
import LoadingEvent from '../components/LoadingEvent';
import EventBenefit from '../../shared/components/EventBenefit';
import { amplitudeService } from '../../../shared/amplitude';
import { SelectBanner } from '../../../shared/amplitude/events';
import { isPC } from '../../../../util/window/getDevice';
import { PULL_TO_REFRESH_MAIN_TOP } from '../../../shared/constant/pull-to-refresh-margin-top';
import { EventBannerType, useEventBannerList } from '../hooks/useEventBannerList';
import type { EventBenefitResponse } from '../../../shared/interfaces';
import {
  SESSION_STORAGE_KEY as STORAGE_KEY,
  loadSessionStorage,
  removeSessionStorage,
  storeSessionStorage,
} from '../../../shared/services/session.storage.service';
import PullToRefreshNew from '../../../shared/components/PullToRefresh/m/PullToRefreshNew';

const NotList = styled.div`
  width: ${isPC ? '1050px' : '100%'};
  margin: 0 auto 10px;
  padding: 168px 0;
  font-size: 16px;
  color: #b5b5b5;
  text-align: center;
`;

interface Props {
  mainSite: MainSite;
  eventType?: EventBannerType;
}

interface PreviouslyClickedBannerSessionStorageInterface {
  image: string;
  link: string;
  scroll: number;
}

const NOT_EVENT_MASSAGE = {
  MARKET: '등록된 특가/혜택 이벤트가 없습니다.',
  BEAUTY_BENEFIT: '등록된 특가 이벤트가 없습니다.',
  BEAUTY_EVENT: '등록된 이벤트가 없습니다.',
} as const;

const assertSamePreviouslyClickBanner = (
  item: EventBenefitResponse,
  previouslyClickedBannerStorage: PreviouslyClickedBannerSessionStorageInterface,
) => item.image === previouslyClickedBannerStorage.image && item.link === previouslyClickedBannerStorage.link;

const SESSION_STORAGE_KEY = STORAGE_KEY.eventBenefitPreviouslyClickedOption;

export default function EventBenefitContainer({ mainSite, eventType = 'MARKET' }: Props) {
  const {
    data: bannerList,
    isLoading,
    isError,
    refetch,
  } = useEventBannerList({
    eventType,
  });

  const handleClickBanner = (link: string | null, giftIds: string | null, index: number) => {
    if (isEmpty(bannerList) || !bannerList) {
      return;
    }

    storeSessionStorage(SESSION_STORAGE_KEY, {
      image: bannerList[index].image,
      link: bannerList[index].link,
      scroll: window.scrollY,
    });

    amplitudeService.logEvent(
      new SelectBanner({
        eventName: eventType === 'BEAUTY_BENEFIT' ? 'select_benefit_list_banner' : 'select_brand_list_banner',
        url: link,
        contentId: giftIds,
        position: index + 1,
      }),
    );
  };

  const refreshEventBannerList = useCallback(async () => {
    refetch();
  }, [refetch]);

  const handleFocusBannerPosition = useCallback(() => {
    if (isEmpty(bannerList) || !bannerList) {
      return;
    }

    const previouslyClickedBannerInSessionStorage =
      loadSessionStorage<PreviouslyClickedBannerSessionStorageInterface>(SESSION_STORAGE_KEY);

    if (isNull(previouslyClickedBannerInSessionStorage)) {
      return;
    }

    const isPreviouslyClickedBanner = bannerList.some((item) =>
      assertSamePreviouslyClickBanner(item, previouslyClickedBannerInSessionStorage),
    );

    if (
      !isNull(loadSessionStorage(SESSION_STORAGE_KEY)) &&
      previouslyClickedBannerInSessionStorage.scroll > 0 &&
      isPreviouslyClickedBanner
    ) {
      window.scrollTo(0, Number(previouslyClickedBannerInSessionStorage.scroll));
    }

    removeSessionStorage(SESSION_STORAGE_KEY);
  }, [bannerList]);

  if (isLoading) {
    return <LoadingEvent />;
  }

  return (
    <PullToRefreshNew onRefresh={refreshEventBannerList} marginTop={isMobile ? PULL_TO_REFRESH_MAIN_TOP : 0}>
      {isError || isEmpty(bannerList) || !bannerList ? (
        <NotList>{NOT_EVENT_MASSAGE[eventType]}</NotList>
      ) : (
        <EventBenefit
          site={mainSite}
          eventList={bannerList}
          onClickBanner={handleClickBanner}
          onFocusBannerPosition={handleFocusBannerPosition}
        />
      )}
    </PullToRefreshNew>
  );
}
