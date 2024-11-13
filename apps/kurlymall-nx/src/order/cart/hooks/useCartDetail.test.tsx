import { renderHookWithProviders } from '../../../../util/testutil';
import useCartDetail from './useCartDetail';
import {
  CART_DETAIL_RESPONSE,
  EMPTY_CART_DETAIL_RESPONSE,
  KurlyDeliveryProducts,
  PartnerDeliveryDomesticProduct,
  PartnerDeliveryInternationalProduct,
  UnavailableOrderProducts,
} from '../constants/__mocks__/mockCartDetail';
import useCartDetailQuery from '../queries/useCartDetailQuery';
import { CART_DELIVERY_GROUP } from '../constants/CartDeliveryGroup';

jest.mock('../queries/useCartDetailQuery');

describe('useCartDetail hook test', () => {
  const renderUseCartDetail = () => renderHookWithProviders(() => useCartDetail());

  context('장바구니 총 상품이 0개면', () => {
    it('isEmptyCart 가 true 이다.', async () => {
      (useCartDetailQuery as jest.Mock).mockReturnValueOnce({
        data: EMPTY_CART_DETAIL_RESPONSE,
      });

      const { result, waitFor } = renderUseCartDetail();

      await waitFor(() => result.current.isSuccess);

      expect(result.current.isCartEmpty).toBeTruthy();
    });
  });

  context('장바구니 상세조회 API 에서 에러가 발생하면', () => {
    it('isEmptyCart 가 true 이다.', async () => {
      (useCartDetailQuery as jest.Mock).mockReturnValueOnce({
        isError: true,
      });

      const { result, waitFor } = renderUseCartDetail();

      await waitFor(() => result.current.isError);

      expect(result.current.isCartEmpty).toBeTruthy();
    });
  });

  context('장바구니 상세 조회 시 컨티뉴이티/얼리버드 객체가 포함되어 있으면', () => {
    it('컨티뉴이티/얼리버드 문구를 return 한다.', () => {
      (useCartDetailQuery as jest.Mock).mockReturnValueOnce({
        data: {
          ...CART_DETAIL_RESPONSE,
          displayMessage: {
            deliveryNotice: {
              text: '컨티뉴이티/얼리버드 문구',
            },
          },
        },
      });

      const { result } = renderUseCartDetail();

      expect(result.current.deliveryNoticeText).toBe('컨티뉴이티/얼리버드 문구');
    });
  });

  context.each`
    type | allProducts
    ${CART_DELIVERY_GROUP.KURLY} | ${KurlyDeliveryProducts}
    ${CART_DELIVERY_GROUP.PARTNER_DOMESTIC} | ${[PartnerDeliveryDomesticProduct]}
    ${CART_DELIVERY_GROUP.PARTNER_INTERNATIONAL} | ${[PartnerDeliveryInternationalProduct]}
    ${CART_DELIVERY_GROUP.UNAVAILABLE_ORDERS} | ${UnavailableOrderProducts}
  `(`getAllProducts 의 인자로 $type 를 전달하면 `, ({ type, allProducts }) => {
    it(`장바구니 상세조회 응답의 ${type} key 에 해당하는 배송그룹의 모든 상품 배열을 flat 하여 return 한다.`, async () => {
      (useCartDetailQuery as jest.Mock).mockReturnValueOnce({
        data: CART_DETAIL_RESPONSE,
      });

      const { result, waitFor } = renderUseCartDetail();

      await waitFor(() => result.current.isSuccess);

      const products = result.current.getAllProducts(type);

      expect(products).toEqual(allProducts);
    });
  });

  it('availableProducts 는 구매불가능 상품을 뺀 모든 상품을 flat 하게 return 한다.', async () => {
    (useCartDetailQuery as jest.Mock).mockReturnValueOnce({
      data: CART_DETAIL_RESPONSE,
    });

    const { result, waitFor } = renderUseCartDetail();

    await waitFor(() => result.current.isSuccess);

    expect(result.current.availableProducts).toEqual([
      ...KurlyDeliveryProducts,
      PartnerDeliveryDomesticProduct,
      PartnerDeliveryInternationalProduct,
    ]);
    expect(result.current.availableProducts).not.toContain(UnavailableOrderProducts);
  });
});
