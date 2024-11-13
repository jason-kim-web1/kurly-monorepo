import { useEffect } from 'react';

import styled from '@emotion/styled';

import { pcEventBannerStyles } from '../../../../../../styles/product/pcGoodsDetail.css';
import { handleEventBanner } from '../../../shared/utils/eventBanner';

import RawHTML from '../../../../../shared/components/layouts/RawHTML';

const Container = styled.div`
  width: 814px;
  margin: 0 auto;
  padding-bottom: 48px;
`;

interface Props {
  eventBanner: string;
}

export default function EventBanner({ eventBanner }: Props) {
  useEffect(() => {
    const eventBannerElement = document.querySelector<HTMLElement>('.bnr_viewevent');

    if (eventBannerElement) {
      handleEventBanner(eventBannerElement);
    }
  }, []);

  return (
    <Container>
      <RawHTML css={pcEventBannerStyles} html={eventBanner} />
    </Container>
  );
}
