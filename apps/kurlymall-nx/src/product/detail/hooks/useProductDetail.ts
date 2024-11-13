import { useQuery, useQueryClient } from '@tanstack/react-query';
import { eq, isEmpty } from 'lodash';

import { useRouter } from 'next/router';

import { useAppSelector } from '../../../shared/store';
import { getProductDetail } from '../../service/product.service';
import { ContentType, DealProduct } from '../types';

import { ProductDetailState } from '../slice';
import { verifyMembershipOnlyProductByDeal } from '../../service/verifyMembershipOnlyProductByDeal';
import {
  LAST_VIEWING_CONTENT_NO,
  PRODUCT_SELECT_USER_ACTION_TYPE,
} from '../../../shared/components/Cart/MembershipOnlyProductAlert/constants';
import { storeSessionStorage } from '../../../shared/services/session.storage.service';
import { getPageUrl, MEMBERSHIP_PATH } from '../../../shared/constant';

const getDealProducts = (contentType: ContentType, dealProducts: DealProduct[]): DealProduct[] => {
  if (eq(contentType, 'MULTI')) {
    return dealProducts;
  }
  return dealProducts.map((it) => ({
    ...it,
    quantity: it.minEa,
  }));
};

const useProductDetail = (productCode: number) => {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const queryKey = ['product', 'detail', productCode];
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);
  const queryResult = useQuery({
    queryKey,
    queryFn: async (): Promise<ProductDetailState> => {
      const productDetail = await getProductDetail({ productCode });
      if (isEmpty(productDetail.dealProducts)) {
        throw Error('잘못된 상품입니다.');
      }
      const { contentType, dealProducts } = productDetail;
      return {
        ...productDetail,
        defaultContentId: productCode,
        dealProducts: getDealProducts(contentType, dealProducts),
        loading: false,
        changeATFOption: false,
        inquiry: {
          loading: true,
          isError: false,
          items: [],
          noticeMaxPage: 0,
          noticeListCount: 0,
          inquiryListCount: 0,
          hasMore: true,
          pageVisitHistory: {},
          pagination: {
            count: 0,
            perPage: 10,
            currentPage: 1,
            totalPages: 1,
          },
          form: {
            open: false,
            postId: 0,
            subject: '',
            content: '',
            isSecret: false,
            mode: 'new',
            values: {
              subject: '',
              content: '',
              isSecret: false,
            },
          },
        },
        isPicked: false,
        couponBanner: null,
      };
    },
    enabled: hasSession,
    cacheTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  const handleChangeDealProductQuantity = (dealProductNo: number, quantity: number) => {
    queryClient.setQueryData(queryKey, (prevData) => {
      if (!prevData) {
        return;
      }

      const { dealProducts, directOrderType } = prevData as ProductDetailState;
      const dealProduct = dealProducts.find((it) => it.no === dealProductNo);
      if (!dealProduct) {
        return;
      }

      const isIncrease = dealProduct.quantity !== quantity && quantity > 0 && dealProduct.quantity < quantity;
      if (isIncrease) {
        verifyMembershipOnlyProductByDeal({
          dealProducts: [dealProduct],
          userAction: PRODUCT_SELECT_USER_ACTION_TYPE.SET_QUANTITY,
          onClickConfirm: () => {
            storeSessionStorage<string>(LAST_VIEWING_CONTENT_NO, JSON.stringify(productCode));
            push(getPageUrl(MEMBERSHIP_PATH.membership));
          },
        });
      }

      const nextDealProducts =
        directOrderType === 'SINGLE_DIRECT_ORDER'
          ? dealProducts.map((item) => {
              return eq(item.no, dealProductNo) ? { ...item, quantity } : { ...item, quantity: 0 };
            })
          : dealProducts.map((item) => {
              return eq(item.no, dealProductNo) ? { ...item, quantity } : item;
            });

      return {
        ...(prevData as ProductDetailState),
        dealProducts: nextDealProducts,
      };
    });
  };

  return {
    ...queryResult,
    onChangeDealProductQuantity: handleChangeDealProductQuantity,
  };
};

export { useProductDetail };
