import { act, renderHook } from '@testing-library/react-hooks';

import useShowRefundQRCode from './useShowRefundQRCode';
import { usePickupRefundQRQuery } from '../queries/usePickupRefundQRQuery';
import useOrderDetailQuery from '../queries/useOrderDetailQuery';
import QRCodeAlert from '../components/PickupInfo/QRCodeAlert';
import RefundQRCodeErrorAlert from '../components/PaymentInfo/RefundQRCodeErrorAlert';

jest.mock('../components/PickupInfo/QRCodeAlert');
jest.mock('../components/PaymentInfo/RefundQRCodeErrorAlert');
jest.mock('../queries/usePickupRefundQRQuery');
jest.mock('../queries/useOrderDetailQuery');

describe('useShowRefundQRCode hook test', () => {
  const renderUseShowRefundQRCode = () =>
    renderHook(() =>
      useShowRefundQRCode({
        groupOrderNo: 1234,
      }),
    );

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('showQRCode 함수를 호출하기 전에는', () => {
    it('QRCodeAlert를 실행하지 않는다.', () => {
      renderUseShowRefundQRCode();
      expect(QRCodeAlert).not.toBeCalled();
    });
  });

  describe('showQRCode 함수를 호출했는데', () => {
    describe('usePickupRefundQRQuery가 data를 반환하면', () => {
      it('QRCodeAlert를 화면에 노출한다.', async () => {
        (useOrderDetailQuery as jest.Mock).mockReturnValue({
          data: {
            pickupOrderMeta: {
              pickupStrategy: 'QR',
              pickupStatus: 'COMPLETED',
            },
          },
          refetch: jest.fn(),
        });

        (usePickupRefundQRQuery as jest.Mock).mockReturnValue({
          data: {
            qrImage: 'qrImage',
            qrImageType: {
              code: 'qrImageType',
            },
          },
          refetch: jest.fn(),
        });

        const { result } = renderUseShowRefundQRCode();

        await act(async () => {
          result.current.openQRCodeModal();
        });

        expect(QRCodeAlert).toBeCalledWith({
          text: '환불 시, 상품을 픽업한 매장\n직원에게 QR코드를 보여주세요',
          qrImage: 'qrImage',
          qrImageType: { code: 'qrImageType' },
        });
      });
    });

    describe('usePickupRefundQRQuery가 data를 반환하지 않으면', () => {
      it('RefundQRCodeErrorAlert 를 화면에 노출한다.', async () => {
        (useOrderDetailQuery as jest.Mock).mockReturnValue({
          data: {
            pickupOrderMeta: {
              pickupStrategy: 'QR',
              pickupStatus: 'COMPLETED',
            },
          },
          refetch: jest.fn(),
        });

        (usePickupRefundQRQuery as jest.Mock).mockReturnValue({
          data: undefined,
          refetch: jest.fn(),
        });

        const { result } = renderUseShowRefundQRCode();

        await act(async () => {
          result.current.openQRCodeModal();
        });

        expect(RefundQRCodeErrorAlert).toBeCalled();
      });
    });
  });
});
