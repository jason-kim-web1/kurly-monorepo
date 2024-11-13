import styled from '@emotion/styled';

import type { MainSite } from '../../../main/interfaces/MainSection.interface';
import { isPC } from '../../../../util/window/getDevice';
import { EventBenefitResponse } from '../../../shared/interfaces';

import EventItem from './EventItem';

const EventList = styled.ul`
  width: ${isPC ? '1050px' : '100%'};
  margin: 0 auto;
`;

interface Props {
  site: MainSite;
  eventList: EventBenefitResponse[];
  onClickBanner(link: string | null, giftIds: string | null, index: number): void;
  onFocusBannerPosition(): void;
}

export default function EventBenefit({ site, eventList, onClickBanner, onFocusBannerPosition }: Props) {
  return (
    <EventList>
      {eventList.map((event, index) => (
        <EventItem
          key={event.id}
          index={index}
          site={site}
          eventList={event}
          countEventList={eventList.length}
          onClickBanner={onClickBanner}
          onFocusBannerPosition={onFocusBannerPosition}
        />
      ))}
    </EventList>
  );
}
