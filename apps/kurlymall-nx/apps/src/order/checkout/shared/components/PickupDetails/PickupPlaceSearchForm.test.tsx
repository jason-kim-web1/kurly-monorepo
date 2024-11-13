import { fireEvent, render, screen } from '@testing-library/react';

import PickupPlaceSearchForm from './PickupPlaceSearchForm';
import { placeSearchType } from '../../interfaces';
import { usePickupDetail } from '../../context/PickupDetailContext';

jest.mock('../../context/PickupDetailContext');

describe('PickupPlaceSearchForm', () => {
  const actions = {
    searchPickupPlace: jest.fn(),
    toggleType: jest.fn(),
  };

  context('픽업지를 검색하면', () => {
    const keyword = '강남';
    it('actions.searchPickupPlace 를 호출한다.', () => {
      (usePickupDetail as jest.Mock).mockReturnValue({
        isKeywordType: true,
        actions,
        keyword,
      });

      render(<PickupPlaceSearchForm />);

      const input = screen.getByRole('textbox', { name: 'search-place' });

      fireEvent.change(input, {
        target: { name: 'search-place', value: keyword },
      });

      expect(actions.searchPickupPlace).toBeCalledWith(keyword);
    });
  });

  context('검색어가 없고', () => {
    context('검색 타입이 MAP 이면', () => {
      it('목록 버튼을 볼 수 있고, 클릭하면 actions.toggleType 을 호출한다.', () => {
        (usePickupDetail as jest.Mock).mockReturnValue({
          isKeywordType: false,
          actions,
          keyword: '',
        });

        render(<PickupPlaceSearchForm />);

        const button = screen.getByRole('button', { name: '목록' });

        expect(button).toBeInTheDocument();

        fireEvent.click(button);

        expect(actions.toggleType).toBeCalledWith(placeSearchType.KEYWORD);
      });
    });

    context('검색 타입이 KEYWORD 이면', () => {
      it('지도 버튼을 볼 수 있고, 클릭하면 actions.toggleType 을 호출한다.', () => {
        (usePickupDetail as jest.Mock).mockReturnValue({
          isKeywordType: true,
          actions,
          keyword: '',
        });

        render(<PickupPlaceSearchForm />);

        const button = screen.getByRole('button', { name: '지도' });

        expect(button).toBeInTheDocument();

        fireEvent.click(button);

        expect(actions.toggleType).toBeCalledWith(placeSearchType.MAP);
      });
    });
  });

  context('검색어가 있으면', () => {
    const keyword = '강남';

    it('검색창의 검색어를 볼 수 있고, 버튼은 미노출한다.', () => {
      (usePickupDetail as jest.Mock).mockReturnValue({
        isKeywordType: true,
        actions,
        keyword,
      });

      render(<PickupPlaceSearchForm />);

      const input = screen.getByRole('textbox', { name: 'search-place' });

      fireEvent.change(input, {
        target: { name: 'search-place', value: keyword },
      });

      expect(input).toBeInTheDocument();
      expect(input).toHaveValue(keyword);

      const listButton = screen.queryByRole('button', { name: '지도' });

      expect(listButton).not.toBeInTheDocument();
    });
  });
});
