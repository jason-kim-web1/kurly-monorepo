import { act, renderHook } from '@testing-library/react-hooks';

import useShowQRCode from './useShowQRCode';
import QRCodeAlert from '../components/PickupInfo/QRCodeAlert';

jest.mock('../components/PickupInfo/QRCodeAlert');

describe('useShowQRCode hook test', () => {
  const renderUseShowQRCode = () =>
    renderHook(() =>
      useShowQRCode({
        qrImage: 'qrImage',
        qrImageType: 'png',
        text: 'text',
        callback: jest.fn(),
      }),
    );

  afterEach(() => {
    jest.resetAllMocks();
  });

  context('showQRCode 함수를 호출하기 전에는', () => {
    it('QRCodeAlert를 실행하지 않는다.', () => {
      renderUseShowQRCode();

      expect(QRCodeAlert).not.toBeCalled();
    });
  });

  context('showQRCode 함수를 호출하면', () => {
    it('QRCodeAlert를 실행한다.', () => {
      const { result } = renderUseShowQRCode();

      act(() => {
        result.current.showQRCode();
      });

      expect(QRCodeAlert).toBeCalled();
    });
  });
});
