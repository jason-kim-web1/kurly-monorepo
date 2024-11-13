import styled from '@emotion/styled';

import { amplitudeService } from '../../../shared/amplitude';
import { SelectNotificationBanner } from '../../../shared/amplitude/events/SelectNotificationBanner';
import { AdBannersResponse } from '../../../shared/interfaces/AdBannerResponse';

const BannerWrapper = styled.div`
  padding: 16px 20px 0;
`;

const BannerImage = styled.img`
  object-fit: cover;
  height: calc((100vw - 40px) / 4.7);
  border-radius: 8px;
  width: 100%;
`;

export default function NotiCenterBanner({ banner }: { banner: AdBannersResponse }) {
  const handleClickBanner = () => {
    amplitudeService.logEvent(new SelectNotificationBanner(banner.link, banner.id));
  };

  return (
    <BannerWrapper>
      <a href={banner.link} onClick={handleClickBanner}>
        <BannerImage src={banner.image} alt={banner.title} title={banner.title} />
      </a>
    </BannerWrapper>
  );
}
