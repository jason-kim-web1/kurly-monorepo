import styled from '@emotion/styled';

import { amplitudeService } from '../../../shared/amplitude';
import { SelectMyKurlyBanner } from '../../../shared/amplitude/events/mypage';
import { isPC } from '../../../../util/window/getDevice';
import { AdBannersResponse } from '../../../shared/interfaces/AdBannerResponse';

const Container = styled.div`
  width: 100%;
  padding: ${isPC ? '0 25px 20px' : '16px 16px 0'};
`;

const Banner = styled.a`
  display: block;
`;

const BlankImg = styled.img`
  width: 100%;
  height: ${isPC ? '53px' : '15.2vw'};
  object-fit: cover;
  border-radius: ${isPC ? 4 : 8}px;
`;

interface Props {
  mykurlyBanner: AdBannersResponse | null;
}

export default function EventBanner({ mykurlyBanner }: Props) {
  if (!mykurlyBanner) {
    return null;
  }

  const { title, link, imageUrl, image } = mykurlyBanner;

  const handleClickBanner = (url: string) => {
    amplitudeService.logEvent(new SelectMyKurlyBanner({ url }));
  };

  return link ? (
    <Container>
      <Banner href={link} onClick={() => handleClickBanner(link)}>
        <BlankImg src={imageUrl || image} alt={title} />
      </Banner>
    </Container>
  ) : null;
}
