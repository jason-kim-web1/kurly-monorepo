import { fireEvent, screen } from '@testing-library/react';

import { Swiper } from 'swiper';
import type { Swiper as SwiperClass } from 'swiper/types';

import { renderWithProviders } from '../../../../../../util/testutil';
import KurlypayNaviationArrow from './KurlypayNavigationArrow';

jest.mock('swiper');

describe('KurlypayNavigationArrow component', () => {
  const slidePrev = jest.fn();
  const slideNext = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  context('swiper.isBeginning 이 true이면', () => {
    const swiper: SwiperClass = new Swiper('mockElement');
    swiper.isBeginning = true;
    swiper.isEnd = false;

    it('왼쪽 끝 화살표를 볼 수 없다.', () => {
      renderWithProviders(<KurlypayNaviationArrow swiper={swiper} />);

      const prevArrow = screen.queryByTestId('prev-arrow');
      const nextArrow = screen.queryByTestId('next-arrow');

      expect(prevArrow).not.toBeInTheDocument();
      expect(nextArrow).toBeInTheDocument();
    });
  });

  context('swiper.isEnd 가 true이면', () => {
    const swiper: SwiperClass = new Swiper('mockElement');
    swiper.isBeginning = false;
    swiper.isEnd = true;

    it('오른쪽 끝 화살표를 볼 수 없다.', () => {
      renderWithProviders(<KurlypayNaviationArrow swiper={swiper} />);

      const prevArrow = screen.queryByTestId('prev-arrow');
      const nextArrow = screen.queryByTestId('next-arrow');

      expect(prevArrow).toBeInTheDocument();
      expect(nextArrow).not.toBeInTheDocument();
    });
  });

  context('isBeginning, isEnd 모두 false 면', () => {
    const swiper: SwiperClass = new Swiper('mockElement');
    swiper.isBeginning = false;
    swiper.isEnd = false;

    it('왼쪽, 오른쪽 화살표 모두 볼 수 있다.', () => {
      renderWithProviders(<KurlypayNaviationArrow swiper={swiper} />);

      const prevArrow = screen.queryByTestId('prev-arrow');
      const nextArrow = screen.queryByTestId('next-arrow');

      expect(prevArrow).toBeInTheDocument();
      expect(nextArrow).toBeInTheDocument();
    });
  });

  context('왼쪽을 클릭하면', () => {
    const swiper: SwiperClass = new Swiper('mockElement');
    swiper.isBeginning = false;
    swiper.isEnd = false;

    it('slidePrev 함수를 호출한다.', () => {
      renderWithProviders(<KurlypayNaviationArrow swiper={swiper} />);

      const prevArrow = screen.getByTestId('prev-arrow');

      fireEvent.click(prevArrow);

      expect(swiper.slidePrev).toBeCalled();
    });
  });

  context('오른쪽을 클릭하면', () => {
    const swiper: SwiperClass = new Swiper('mockElement');
    swiper.isBeginning = false;
    swiper.isEnd = false;

    it('slideNext 함수를 호출한다.', () => {
      renderWithProviders(<KurlypayNaviationArrow swiper={swiper} />);

      const nextArrow = screen.getByTestId('next-arrow');

      fireEvent.click(nextArrow);

      expect(swiper.slideNext).toBeCalled();
    });
  });

  context('swiper 가 undefined 이면', () => {
    const swiper = undefined;

    it('버튼을 클릭해도 swiper 함수가 호출되지 않는다.', () => {
      renderWithProviders(<KurlypayNaviationArrow swiper={swiper} />);

      const prevArrow = screen.getByTestId('prev-arrow');
      const nextArrow = screen.getByTestId('next-arrow');

      fireEvent.click(prevArrow);
      fireEvent.click(nextArrow);

      expect(slidePrev).not.toBeCalled();
      expect(slideNext).not.toBeCalled();
    });
  });
});
