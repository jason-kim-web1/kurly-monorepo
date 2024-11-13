import { ReactNode } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import type { Swiper as SwiperClass } from 'swiper/types';

import type { MainBannerData, MainSite } from '../../interfaces/MainSection.interface';
import { MAIN_BANNER_SWIPER_AUTOPLAY } from '../../main.config';
import { queryStringSiteConverter } from '../../../shared/utils/queryStringSiteConverter';
import NextImage from '../../../shared/components/NextImage';

const BannerImageWrap = styled.div`
  position: relative;
  width: 100%;
  min-width: 1050px;
  padding-bottom: 370px;
`;

const WrapperBanner = ({
  children,
  link,
  site,
  index,
  bannerId,
  amplitudeSelectBanner,
}: {
  children: ReactNode;
  link: string;
  site: MainSite;
  index: number;
  bannerId: number;
  amplitudeSelectBanner: (index: number, bannerId: number) => void;
}) => {
  if (link) {
    return (
      <Link href={queryStringSiteConverter({ link, site })} passHref prefetch={false}>
        <a href={queryStringSiteConverter({ link, site })} onClick={() => amplitudeSelectBanner(index, bannerId)}>
          {children}
        </a>
      </Link>
    );
  }

  return <>{children}</>;
};

interface Props {
  banners: MainBannerData[];
  site: MainSite;
  amplitudeSelectBanner(index: number, bannerId: number): void;
  onSwiper?(swiper: SwiperClass): void;
}

export default function MainBannerSwiper({ banners, site, onSwiper, amplitudeSelectBanner }: Props) {
  return (
    <Swiper onSwiper={onSwiper} modules={[Autoplay]} autoplay={MAIN_BANNER_SWIPER_AUTOPLAY} loop>
      {banners.map(({ id: bannerId, link, mainBannerPcUrl, imageUrl }, index) => (
        <SwiperSlide
          key={bannerId}
          style={{
            cursor: 'pointer',
          }}
        >
          <WrapperBanner
            site={site}
            link={link}
            index={index}
            bannerId={bannerId}
            amplitudeSelectBanner={amplitudeSelectBanner}
          >
            <BannerImageWrap>
              <NextImage src={mainBannerPcUrl || imageUrl} alt="메인배너" layout="fill" objectFit="cover" />
            </BannerImageWrap>
          </WrapperBanner>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
