import { useEffect } from 'react';

import styled from '@emotion/styled';

import { mobileEventBannerStyles } from '../../../../../../styles/product/mobileGoodsDetail.css';
import { handleEventBanner } from '../../../shared/utils/eventBanner';

import RawHTML from '../../../../../shared/components/layouts/RawHTML';

const Container = styled.div`
  padding: 20px 6px;
  margin-bottom: 13px;
`;

interface Props {
  eventBanner: string;
}

export default function EventBanner({ eventBanner }: Props) {
  useEffect(() => {
    const eventBannerElement =
      document.querySelector<HTMLElement>('.bnr_viewevent') ||
      document.querySelector<HTMLElement>('.banner_view_event');

    if (eventBannerElement) {
      handleEventBanner(eventBannerElement);
    }
  }, []);

  return (
    <Container>
      <RawHTML css={mobileEventBannerStyles} html={eventBanner} />
    </Container>
  );
}
