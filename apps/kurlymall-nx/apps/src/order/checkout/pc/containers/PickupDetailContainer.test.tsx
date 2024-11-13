import { fireEvent, screen, waitFor } from '@testing-library/react';

import { renderWithProviders } from '../../../../../util/testutil';

import PickupDetailContainer from './PickupDetailContainer';

import { mockPickupPlacesResponse } from '../../../../../fixtures/pickupPlaces';
import usePickupPlacesQuery from '../../shared/hooks/queries/usePickupPlacesQuery';
import {
  resetIntersectionMocking,
  setupIntersectionMocking,
} from '../../../../../util/testutil/intersection-observer-test-utils';
import { PickupDetailProvider } from '../../shared/context/PickupDetailContext';

jest.mock('next/router');
jest.mock('../../shared/hooks/queries/usePickupPlacesQuery');

describe('PickupDetailContainer', () => {
  const close = jest.fn();

  const renderPickupDetailContainer = (preloadedState = {}) =>
    renderWithProviders(
      <PickupDetailProvider>
        <PickupDetailContainer close={close} />
      </PickupDetailProvider>,
      { preloadedState },
    );

  beforeEach(() => {
    setupIntersectionMocking(jest.fn);
    (usePickupPlacesQuery as jest.Mock).mockReturnValue({
      data: {
        pages: [mockPickupPlacesResponse],
      },
    });
  });

  afterEach(() => {
    resetIntersectionMocking();
    jest.clearAllMocks();
  });

  it('검색창에 픽업지를 검색할 수 있다.', () => {
    renderPickupDetailContainer();

    const input = screen.getByRole('textbox', { name: 'search-place' });

    expect(input).toHaveValue('');

    fireEvent.change(input, {
      target: { name: 'search-place', value: '강남' },
    });

    expect(input).toHaveValue('강남');
  });

  it('버튼을 통해 지도뷰/리스트뷰 를 toggle 할 수 있다.', () => {
    renderPickupDetailContainer();

    const mapButton = screen.getByRole('button', { name: '지도' });
    expect(mapButton).toBeInTheDocument();

    fireEvent.click(mapButton);

    const listButton = screen.getByRole('button', { name: '목록' });
    expect(listButton).toBeInTheDocument();
  });

  context('리스트뷰에서', () => {
    it('픽업지 목록을 볼 수 있다.', () => {
      renderPickupDetailContainer();

      expect(screen.getByRole('list', { name: 'pickup-list' })).toBeInTheDocument();
    });

    it('리스트 안내 문구를 볼 수 있다.', () => {
      renderPickupDetailContainer();

      expect(screen.getByText('배송지에서 가까운 순으로 보여드려요')).toBeInTheDocument();
    });
  });

  context('키워드가 있으면', () => {
    it('픽업지 총 개수를 볼 수 있다.', async () => {
      renderPickupDetailContainer();

      const input = screen.getByRole('textbox', { name: 'search-place' });
      fireEvent.change(input, {
        target: { name: 'search-place', value: '강남' },
      });

      const total = `총 ${mockPickupPlacesResponse.total}개`;

      await waitFor(() => {
        expect(screen.getByText(total)).toBeInTheDocument();
      });
    });
  });

  context('취소 Button을 누르면', () => {
    it('close 함수가 호출된다.', () => {
      renderPickupDetailContainer();

      const mapButton = screen.getByRole('button', { name: '취소' });
      expect(close).not.toBeCalled();

      fireEvent.click(mapButton);
      expect(close).toBeCalled();
    });
  });
});
