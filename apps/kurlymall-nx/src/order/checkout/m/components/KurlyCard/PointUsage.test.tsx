import { fireEvent, screen } from '@testing-library/react';

import PointUsage from './PointUsage';
import { renderWithProviders } from '../../../../../../util/testutil';
import { usePreviousVendorQuery } from '../../../shared/hooks/queries';
import usePlccPoint from '../../../shared/hooks/usePlccPoint';

jest.mock('../../../shared/hooks/queries');
jest.mock('../../../shared/hooks/usePlccPoint');

const handlePointCheckbox = jest.fn();

describe('KurlyCard PointUsage 테스트', () => {
  beforeEach(() => {
    (usePlccPoint as jest.Mock).mockReturnValue({
      selectedPlccPoint: false,
      handlePointCheckbox,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  context('이전결제수단 조회 API가 pendding 상태이면', () => {
    it('스켈레톤 UI 를 볼 수 있다.', () => {
      (usePreviousVendorQuery as jest.Mock).mockReturnValue({
        isLoading: true,
      });

      renderWithProviders(<PointUsage disabled={false} />);

      expect(screen.getByTestId('point-usage-checkbox-skeleton')).toBeInTheDocument();
    });
  });

  context('disable 이 false 이면', () => {
    it('포인트 사용 화면을 볼 수 있다.', () => {
      (usePreviousVendorQuery as jest.Mock).mockReturnValue({
        isLoading: false,
      });

      renderWithProviders(<PointUsage disabled={false} />);

      const labelText = screen.getByText('즉시 할인');
      const discountPrice = screen.getByText('-30,000원');

      expect(labelText).toBeInTheDocument();
      expect(discountPrice).toBeInTheDocument();
    });

    it('즉시할인 버튼을 클릭할 수 있다. ', async () => {
      (usePreviousVendorQuery as jest.Mock).mockReturnValue({
        isLoading: false,
      });

      renderWithProviders(<PointUsage disabled={false} />);

      const labelText = screen.getByText('즉시 할인');

      fireEvent.click(labelText);

      expect(handlePointCheckbox).toBeCalled();
    });
  });

  context('disable 이 true 이면', () => {
    it('즉시할인 버튼을 클릭할 수 없다. ', () => {
      (usePreviousVendorQuery as jest.Mock).mockReturnValue({
        isLoading: false,
      });

      renderWithProviders(<PointUsage disabled={true} />);

      const labelText = screen.getByText('즉시 할인');

      fireEvent.click(labelText);

      expect(handlePointCheckbox).toBeCalled();
    });
  });
});
