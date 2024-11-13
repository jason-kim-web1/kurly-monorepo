import { useCallback, useEffect, useState } from 'react';

import { Swiper as SwiperClass } from 'swiper/types';

export default function useMainBannerSwiper(swiper?: SwiperClass) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goPrev = useCallback(() => {
    if (!swiper || swiper.destroyed) {
      return;
    }
    swiper.slidePrev();
  }, [swiper]);

  const goNext = useCallback(() => {
    if (!swiper || swiper.destroyed) {
      return;
    }
    swiper.slideNext();
  }, [swiper]);

  useEffect(() => {
    if (!swiper || swiper.destroyed) {
      return;
    }

    swiper.on('realIndexChange', ({ realIndex }) => {
      setCurrentIndex(realIndex);
    });
  }, [swiper]);

  return { goPrev, goNext, currentIndex };
}
