import { useState } from 'react';

import { Swiper as SwiperClass } from 'swiper/types';

export default function useKurlyFreshDetail() {
  const [isSlideToggle, setIsSlideToggle] = useState(true);
  const [swiper, setSwiper] = useState<SwiperClass>();
  const [currentIndex, setCurrentIndex] = useState(1);

  const handleClickSlideView = () => {
    setIsSlideToggle(!isSlideToggle);
  };

  const handleClickSwiperPrev = () => {
    swiper?.slidePrev();
  };

  const handleClickSwiperNext = () => {
    swiper?.slideNext();
  };

  return {
    isSlideToggle,
    swiper,
    setSwiper,
    currentIndex,
    setCurrentIndex,
    handleClickSlideView,
    handleClickSwiperPrev,
    handleClickSwiperNext,
  };
}
