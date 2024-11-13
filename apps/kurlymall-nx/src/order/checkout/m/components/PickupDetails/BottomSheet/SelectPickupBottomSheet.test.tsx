import { fireEvent, screen } from '@testing-library/react';

import { useRouter } from 'next/router';

import SelectPickupBottomSheet from './SelectPickupBottomSheet';

import { mockPickupPlaces } from '../../../../../../../fixtures/pickupPlaces';
import getPickupDistance from '../../../../shared/utils/getPickupDistance';
import { PickupPlace } from '../../../../shared/interfaces';
import { useWebview } from '../../../../../../shared/hooks';
import appService from '../../../../../../shared/services/app.service';
import { usePickupDetail } from '../../../../shared/context/PickupDetailContext';
import { renderWithProviders } from '../../../../../../../util/testutil';

jest.mock('next/router');
jest.mock('../../../../../../shared/hooks');
jest.mock('../../../../../../shared/services/app.service');
jest.mock('../../../../shared/context/PickupDetailContext');

describe('SelectPickupBottomSheet test', () => {
  const actions = {
    closeAndReset: jest.fn(),
  };

  context('선택 된 픽업지가 없으면', () => {
    it('아무것도 보여주지 않는다.', () => {
      (usePickupDetail as jest.Mock).mockReturnValue({
        selected: undefined,
        isKeywordType: true,
        actions,
      });

      const { container } = renderWithProviders(<SelectPickupBottomSheet />);

      expect(container).toBeEmptyDOMElement();
    });
  });

  context('선택 된 픽업지가 있으면', () => {
    const pickupPlace = mockPickupPlaces[1];

    it('픽업지 이름, 거리, 주소, 버튼을 볼 수 있다.', () => {
      (usePickupDetail as jest.Mock).mockReturnValue({
        selected: pickupPlace,
        isKeywordType: true,
        actions,
      });

      renderWithProviders(<SelectPickupBottomSheet />);

      const title = screen.getByText(`[${pickupPlace.partnerName}] ${pickupPlace.pickupShopName}`);
      const address = screen.getByText(pickupPlace.pickupShopPlace);
      const distance = screen.getByText(getPickupDistance(pickupPlace.distance));
      const button = screen.getByRole('button', { name: '매장 선택하기' });

      expect(button).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(address).toBeInTheDocument();
      expect(distance).toBeInTheDocument();
    });

    context('searchType 이 지도일 때', () => {
      it('바텀시트 내 지도는 보여주지 않는다.', () => {
        (usePickupDetail as jest.Mock).mockReturnValue({
          selected: pickupPlace,
          isKeywordType: false,
          actions,
        });

        renderWithProviders(<SelectPickupBottomSheet />);

        const map = screen.queryByRole('region', { name: 'bottom-sheet-map' });

        expect(map).not.toBeInTheDocument();
      });
    });

    context('매장 선택하기 버튼을 눌렀을 때', () => {
      context('웹뷰일 경우', () => {
        it('updateSelectedPickupPlace를 callback 함수로 전달하는 closeWebview 웹뷰인터페이스를 호출한다.', async () => {
          (useWebview as jest.Mock).mockReturnValueOnce(true);
          (usePickupDetail as jest.Mock).mockReturnValue({
            selected: pickupPlace,
            isKeywordType: true,
            actions,
          });

          renderWithProviders(<SelectPickupBottomSheet />);

          const button = screen.getByRole('button', { name: '매장 선택하기' });
          fireEvent.click(button);

          expect(appService.closeWebview).toBeCalledWith({
            callback_function: `updateSelectedPickupPlace(${JSON.stringify(pickupPlace)})`,
          });
        });
      });

      context('웹뷰가 아니면', () => {
        it('router.back 을 호출한다.', async () => {
          const back = jest.fn();

          (useWebview as jest.Mock).mockReturnValueOnce(false);
          (useRouter as jest.Mock).mockReturnValueOnce({
            back,
          });
          (usePickupDetail as jest.Mock).mockReturnValue({
            selected: pickupPlace,
            isKeywordType: true,
            actions,
          });

          renderWithProviders(<SelectPickupBottomSheet />);

          const button = screen.getByRole('button', { name: '매장 선택하기' });
          fireEvent.click(button);

          expect(back).toBeCalled();
        });
      });
    });

    context('취소 버튼을 누르면', () => {
      it('actions.closeAndReset 핸들러를 호출한다.', () => {
        (usePickupDetail as jest.Mock).mockReturnValue({
          selected: pickupPlace,
          isKeywordType: true,
          actions,
        });

        renderWithProviders(<SelectPickupBottomSheet />);

        const button = screen.getByRole('button', { name: '취소' });
        fireEvent.click(button);

        expect(actions.closeAndReset).toBeCalled();
      });
    });
  });

  context('픽업지가 주말 휴무 또는 특이사항이 있으면', () => {
    const pickupPlace: PickupPlace = {
      ...mockPickupPlaces[1],
      closeWeekend: true,
      specialInformation: '특이사항 공백 포함 최대19자 권장',
    };

    it('주말휴무, 특이사항 tag 를 볼 수 있다.', () => {
      (usePickupDetail as jest.Mock).mockReturnValue({
        selected: pickupPlace,
        isKeywordType: true,
        actions,
      });

      renderWithProviders(<SelectPickupBottomSheet />);

      expect(screen.getByText('주말 휴무')).toBeInTheDocument();
      expect(screen.getByText('특이사항 공백 포함 최대19자 권장')).toBeInTheDocument();
    });
  });
});
