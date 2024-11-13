import { fireEvent, render, screen } from '@testing-library/react';

import ViewToggleButton from './ViewToggleButton';
import { placeSearchType } from '../../../shared/interfaces';
import { usePickupDetail } from '../../../shared/context/PickupDetailContext';

jest.mock('../../../shared/context/PickupDetailContext');

describe('ViewToggleButton', () => {
  const actions = {
    toggleType: jest.fn(),
  };

  context('viewType 이 MAP 이면', () => {
    it('목록 버튼을 볼 수 있다.', () => {
      (usePickupDetail as jest.Mock).mockReturnValue({
        isKeywordType: false,
        actions,
      });

      const name = '목록';

      render(<ViewToggleButton />);

      const mapButton = screen.getByRole('button', { name: name });

      expect(mapButton).toBeInTheDocument();

      fireEvent.click(mapButton);

      expect(actions.toggleType).toBeCalledWith(placeSearchType.KEYWORD);
    });
  });

  context('viewType 이 KEYWORD 이면', () => {
    it('지도 버튼을 볼 수 있다.', () => {
      (usePickupDetail as jest.Mock).mockReturnValue({
        isKeywordType: true,
        actions,
      });

      const name = '지도';

      render(<ViewToggleButton />);

      const listButton = screen.getByRole('button', { name: name });

      expect(listButton).toBeInTheDocument();

      fireEvent.click(listButton);

      expect(actions.toggleType).toBeCalledWith(placeSearchType.MAP);
    });
  });
});
