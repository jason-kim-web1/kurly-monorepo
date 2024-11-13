import { ReactNode } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import type { Swiper as SwiperClass } from 'swiper/types';

import type { MainBannerData, MainSite } from '../../../interfaces/MainSection.interface';
import { MAIN_BANNER_SWIPER_AUTOPLAY } from '../../../main.config';
import { queryStringSiteConverter } from '../../../../shared/utils/queryStringSiteConverter';
import NextImage from '../../../../shared/components/NextImage';

const WrapperNextImage = styled.div`
  width: 100%;
  height: 74.6667vw;
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
  onSwiper?(swiper: SwiperClass): void;
  amplitudeSelectBanner(index: number, bannerId: number): void;
}

export default function MainBannerSwiper({ banners, site, onSwiper, amplitudeSelectBanner }: Props) {
  return (
    <Swiper
      onSwiper={onSwiper}
      modules={[Autoplay]}
      autoplay={MAIN_BANNER_SWIPER_AUTOPLAY}
      loop
      speed={400}
      // Swiper transform custom
      onProgress={(swiper, progress) => {
        for (let i = 0; i < swiper.slides.length; i++) {
          const mainBannerImage = swiper.slides[i].querySelector<HTMLElement>('.slide-inner');

          if (mainBannerImage) {
            const slideProgress = progress * (swiper.slides.length - 1) - i;
            mainBannerImage.style.transform = `translate(${slideProgress * swiper.width}px)`;
          }
        }
      }}
      // Autoplay Loop 후 처음이나 끝으로 돌아갈 때 애니메이션 깨짐을 막습니다.
      // Swiper를 움직일 때 wrapper도 같이 움직이는 이슈를 해결합니다.
      // Swiper를 땔 때 기존 Swiper transition 이벤트의 동작을 멈춥니다.
      onSetTransition={(swiper, transition) => {
        for (let i = 0; i < swiper.slides.length; i++) {
          const slideInner = swiper.slides[i].querySelector<HTMLElement>('.slide-inner');

          if (slideInner) {
            slideInner.style.transition = `${transition}ms`;
          }
        }
      }}
      // END: Swiper transform custom
    >
      {banners.map(({ id: bannerId, link, mainBannerMobileUrl, imageUrl }, index) => (
        <SwiperSlide
          key={bannerId}
          style={{
            cursor: 'pointer',
          }}
        >
          <div className="slide-inner">
            <WrapperBanner
              site={site}
              link={link}
              index={index}
              bannerId={bannerId}
              amplitudeSelectBanner={amplitudeSelectBanner}
            >
              <WrapperNextImage>
                <NextImage src={mainBannerMobileUrl || imageUrl} layout="fill" objectFit="cover" alt="배너 이미지" />
              </WrapperNextImage>
            </WrapperBanner>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
