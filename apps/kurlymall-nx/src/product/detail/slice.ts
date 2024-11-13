import { createSlice } from '@reduxjs/toolkit';
import { isEmpty, isEqual, size, sum, concat, eq } from 'lodash';
import router from 'next/router';

import {
  ContentType,
  DealProduct,
  DirectOrderType,
  ProductInfoDictionaryItem,
  GroupProduct,
  LegacyPromotionType,
  ProductDetailContentProps,
  ProductDetailExceptionLabel,
  ProductDetailNotice,
  ProductProps,
  ProductSiteType,
  PlccType,
  JoinOrder,
  ProductShowablePriceName,
  ProductShowablePrices,
  PointBanner,
  ProductReturnInfo,
} from './types';
import { AppThunk } from '../../shared/store';
import { ProductInquiryItem, ProductInquiryPostItem, ProductInquiryPostPagination } from '../board/inquiry/types';

import { getProductInquiryNotice, getProductInquiryPost } from '../board/inquiry/service/productInquiry.service';
import { getIsPickedProduct, getProductDetail } from '../service/product.service';

import { notify } from '../../shared/reducers/page';
import { putPickProduct } from '../../shared/api';
import { getProductCouponBanner } from '../service/product-coupon.service';
import { CouponBannerType, ProductCouponBannerExtraInfo } from '../../../libs/coupon/banner/types';
import {
  postProductInquiryDraft,
  postProductInquiryForm,
  putProductInquiryItem,
} from '../../shared/api/product/inquiry';
import { StorageType } from '../../shared/enums';
import { amplitudeService } from '../../shared/amplitude';
import { RemovePickProduct } from '../../shared/amplitude/events/product/RemovePickProduct';
import { SelectPickProduct } from '../../shared/amplitude/events/product/SelectPickProduct';
import { getFusionQueryId } from './shared/utils/productDetailEvent';

import Alert from '../../shared/components/Alert/Alert';
import { SubmitProductInquirySuccess } from '../../shared/amplitude/events/product/SubmitProductInquirySuccess';
import type { DeliveryInfoName, DeliveryInfoType, StickerList } from '../types';
import { verifyMembershipOnlyProductByDeal } from '../service/verifyMembershipOnlyProductByDeal';
import {
  LAST_VIEWING_CONTENT_NO,
  PRODUCT_SELECT_USER_ACTION_TYPE,
} from '../../shared/components/Cart/MembershipOnlyProductAlert/constants';
import { getPageUrl, MEMBERSHIP_PATH } from '../../shared/constant';
import { storeSessionStorage } from '../../shared/services/session.storage.service';

interface ProductInquiryForm {
  postId?: number;
  open: boolean;
  subject: string;
  content: string;
  isSecret: boolean;
  mode: 'new' | 'edit';
  values: {
    subject: string;
    content: string;
    isSecret: boolean;
  };
}

export interface ProductDetailState {
  loading: boolean;
  defaultContentId: number;
  allergy: string | null;
  isMultiplePrice: boolean;
  showablePrices: ProductShowablePrices;
  showablePricesInToolTip: ProductShowablePriceName[];
  retailPrice: number | null;
  basePrice: number;
  discountedPrice: number | null;
  discountRate: number;
  isExpectedPoint: boolean;
  expectedPoint: number;
  expectedPointRatio: number;
  expirationDate: string | null;
  extraInfos: ProductInfoDictionaryItem[];
  guide: string;
  isDirectOrder: boolean;
  isOnlyAdult: boolean;
  isPurchaseStatus: boolean;
  isSoldOut: boolean;
  isGiftable: boolean;
  mainImageUrl: string;
  name: string;
  no: number;
  soldOutText: string;
  notSalesText: string;
  contentType: ContentType;
  groupProduct: GroupProduct;
  isGroupProduct: boolean;
  storageTypes: StorageType[];
  productOrigin: string | null;
  shortDescription: string;
  todayBrix: string | null;
  salesUnit: string | null;
  canRestockNotify: boolean;
  volume: string | null;
  exceptionLabel: ProductDetailExceptionLabel;
  afterSaleServiceInfo: string;
  deliveryTypeNames: DeliveryInfoName[];
  deliveryTypeInfos: DeliveryInfoType[];
  sellerName: string;
  memberCoupon: {
    newbieLimitDatetime: string | null;
    newbieMinPrice: number;
  };
  dealProducts: DealProduct[];
  reviewCount: number;
  changeATFOption: boolean;
  inquiry: {
    loading: boolean;
    isError: boolean;

    noticeMaxPage: number;
    noticeListCount: number;
    inquiryListCount: number;
    hasMore: boolean;

    pageVisitHistory: {
      [key: number]: boolean;
    };

    items: ProductInquiryPostItem[];
    pagination: ProductInquiryPostPagination;
    form: ProductInquiryForm;
  };
  isPicked: boolean;
  couponBanner: {
    type: CouponBannerType;
    bannerName: string;
    bannerLink: string | null;
    accessKey: string | null;
    extraInfo: ProductCouponBannerExtraInfo;
  } | null;
  legacyPromotion: LegacyPromotionType;
  maxEa: number;
  minEa: number;
  directOrderType: DirectOrderType;
  productDetail: ProductDetailContentProps;
  productNotice: ProductDetailNotice[];
  sellerNotice: ProductInfoDictionaryItem[];
  isInquiryWritable: boolean;
  isReviewWritable: boolean;
  isThirdPart: boolean;
  productSites: ProductSiteType[];
  plcc: PlccType;
  isJoinOrder: boolean;
  joinOrder: JoinOrder | null;
  stickers_v2: StickerList;
  productVerticalLargeUrl: string;
  productVerticalSmallUrl: string;
  productHorizontalLargeUrl: string;
  pointBanner: PointBanner;
  isFreeDelivery: boolean;
  returnInfo: ProductReturnInfo;
}

const initialState: ProductDetailState = {
  loading: false,
  defaultContentId: 0,
  allergy: null,
  isMultiplePrice: false,
  showablePrices: {
    salesPrice: 0,
    basePrice: null,
    retailPrice: null,
  },
  showablePricesInToolTip: [],
  retailPrice: null,
  basePrice: 0,
  discountedPrice: null,
  discountRate: 0,
  isExpectedPoint: false,
  expectedPoint: 0,
  expectedPointRatio: 0,
  expirationDate: null,
  extraInfos: [],
  guide: '',
  isDirectOrder: false,
  isOnlyAdult: false,
  isPurchaseStatus: false,
  isSoldOut: false,
  isGiftable: false,
  mainImageUrl: '',
  name: '',
  no: 0,
  soldOutText: '',
  notSalesText: '',
  contentType: 'SINGLE',
  groupProduct: {
    groupKeys: [],
    groupMembers: [],
  },
  isGroupProduct: false,
  storageTypes: [],
  productOrigin: null,
  shortDescription: '',
  todayBrix: null,
  salesUnit: null,
  canRestockNotify: false,
  volume: null,
  exceptionLabel: null,
  afterSaleServiceInfo: '',
  deliveryTypeNames: [],
  deliveryTypeInfos: [],
  sellerName: '',
  memberCoupon: {
    newbieLimitDatetime: null,
    newbieMinPrice: 0,
  },
  legacyPromotion: null,
  dealProducts: [],
  reviewCount: 0,
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
  maxEa: 0,
  minEa: 0,
  directOrderType: 'DEFAULT',
  productDetail: {
    legacyContent: '',
    legacyEventBanner: '',
    legacyPiImages: [],
    partnersContent: null,
    giveawayContentsBox: null,
  },
  productNotice: [
    {
      dealProductNo: 0,
      dealProductName: '',
      notices: [
        {
          title: '',
          description: '',
        },
      ],
    },
  ],
  sellerNotice: [],
  isInquiryWritable: false,
  isReviewWritable: false,
  isThirdPart: false,
  productSites: ['MARKET'],
  plcc: {
    isShown: false,
    plccUrl: '',
    benefits: [],
  },
  isJoinOrder: false,
  joinOrder: null,
  stickers_v2: [],
  productVerticalLargeUrl: '',
  productVerticalSmallUrl: '',
  productHorizontalLargeUrl: '',
  pointBanner: {
    isShow: false,
    text: '',
    contents: [],
  },
  isFreeDelivery: false,
  returnInfo: {
    address: '',
    oneWayCost: 0,
    roundTripCost: 0,
  },
};

const { actions, reducer } = createSlice({
  /* eslint-disable no-param-reassign */
  name: 'product',
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
    setDefaultContentId(state, { payload }: { payload: number }) {
      state.defaultContentId = payload;
    },
    init(state, { payload }: { payload: ProductProps }) {
      if (isEmpty(payload.dealProducts)) {
        throw Error('잘못된 상품입니다.');
      }

      state.allergy = payload.allergy;
      state.isMultiplePrice = payload.isMultiplePrice;
      state.showablePrices = payload.showablePrices;
      state.showablePricesInToolTip = payload.showablePricesInToolTip;
      state.retailPrice = payload.retailPrice;
      state.basePrice = payload.basePrice;
      state.discountedPrice = payload.discountedPrice;
      state.discountRate = payload.discountRate;
      state.isExpectedPoint = payload.isExpectedPoint;
      state.expectedPoint = payload.expectedPoint;
      state.expectedPointRatio = payload.expectedPointRatio;
      state.expirationDate = payload.expirationDate;
      state.extraInfos = payload.extraInfos;
      state.guide = payload.guide;
      state.isDirectOrder = payload.isDirectOrder;
      state.isOnlyAdult = payload.isOnlyAdult;
      state.isPurchaseStatus = payload.isPurchaseStatus;
      state.isSoldOut = payload.isSoldOut;
      state.mainImageUrl = payload.mainImageUrl;
      state.name = payload.name;
      state.no = payload.no;
      state.soldOutText = payload.soldOutText;
      state.notSalesText = payload.notSalesText;
      state.contentType = payload.contentType;
      state.groupProduct = payload.groupProduct;
      state.isGroupProduct = payload.isGroupProduct;
      state.storageTypes = payload.storageTypes;
      state.productOrigin = payload.productOrigin;
      state.shortDescription = payload.shortDescription;
      state.todayBrix = payload.todayBrix;
      state.salesUnit = payload.salesUnit;
      state.canRestockNotify = payload.canRestockNotify;
      state.volume = payload.volume;
      state.exceptionLabel = payload.exceptionLabel;
      state.afterSaleServiceInfo = payload.afterSaleServiceInfo;
      state.deliveryTypeNames = payload.deliveryTypeNames;
      state.deliveryTypeInfos = payload.deliveryTypeInfos;
      state.sellerName = payload.sellerName;
      state.memberCoupon.newbieLimitDatetime = payload.memberCoupon.newbieLimitDatetime;
      state.memberCoupon.newbieMinPrice = payload.memberCoupon.newbieMinPrice;
      state.legacyPromotion = payload.legacyPromotion;
      state.maxEa = payload.maxEa;
      state.minEa = payload.minEa;
      state.directOrderType = payload.directOrderType;
      state.productDetail = payload.productDetail;
      state.productNotice = payload.productNotice;
      state.sellerNotice = payload.sellerNotice;
      state.isInquiryWritable = payload.isInquiryWritable;
      state.isReviewWritable = payload.isReviewWritable;
      state.reviewCount = payload.reviewCount;
      state.isGiftable = payload.isGiftable;
      state.isThirdPart = payload.isThirdPart;
      state.productSites = payload.productSites;
      state.plcc = payload.plcc;
      state.isJoinOrder = payload.isJoinOrder;
      state.joinOrder = payload.joinOrder || null;
      state.stickers_v2 = payload.stickers_v2;
      state.productVerticalLargeUrl = payload.productVerticalLargeUrl;
      state.productVerticalSmallUrl = payload.productVerticalSmallUrl;
      state.productHorizontalLargeUrl = payload.productHorizontalLargeUrl;
      state.isFreeDelivery = payload.isFreeDelivery;
      state.returnInfo = payload.returnInfo;

      if (eq(payload.contentType, 'MULTI')) {
        state.dealProducts = payload.dealProducts;
        return;
      }

      state.dealProducts = payload.dealProducts.map((it) => ({
        ...it,
        quantity: it.minEa,
      }));
    },
    changeATFOption(state) {
      state.changeATFOption = true;
    },
    updateDealProductQuantity(state, { payload }: { payload: { targetProductNo: number; quantity: number } }) {
      const dealProduct = state.dealProducts.find((it) => it.no === payload.targetProductNo);
      if (!dealProduct) {
        return;
      }

      const isIncrease =
        dealProduct.quantity !== payload.quantity && payload.quantity > 0 && dealProduct.quantity < payload.quantity;

      dealProduct.quantity = payload.quantity;

      if (isIncrease) {
        const contentNo = state.no;
        verifyMembershipOnlyProductByDeal({
          dealProducts: [dealProduct],
          userAction: PRODUCT_SELECT_USER_ACTION_TYPE.SET_QUANTITY,
          onClickConfirm: () => {
            storeSessionStorage<string>(LAST_VIEWING_CONTENT_NO, JSON.stringify(contentNo));
            router.push(getPageUrl(MEMBERSHIP_PATH.membership));
          },
        });
      }

      if (state.directOrderType === 'SINGLE_DIRECT_ORDER') {
        state.dealProducts = state.dealProducts.map((it) =>
          it.no !== dealProduct.no ? { ...it, quantity: 0 } : dealProduct,
        );
        return;
      }
    },
    initProductInquiryItems(state) {
      state.inquiry = {
        ...state.inquiry,
        items: [],
        noticeMaxPage: 0,
        noticeListCount: 0,
        inquiryListCount: 0,
        hasMore: false,
        pageVisitHistory: {},
        pagination: {
          count: 0,
          perPage: 10,
          currentPage: 1,
          totalPages: 1,
        },
      };
    },
    modifyProductInquiryForm(state, { payload: partial }: { payload: Partial<ProductInquiryForm> }) {
      state.inquiry.form = {
        ...state.inquiry.form,
        ...partial,
      };
    },
    setProductInquiryItems(state, { payload: items }) {
      state.inquiry.items = items;
    },
    addProductInquiryItems(state, { payload: items }) {
      state.inquiry.items.push(...items);
    },
    deleteProductInquiryItem(state, { payload: targetId }) {
      state.inquiry.items = state.inquiry.items.filter((item) => item.id !== targetId);
    },
    setProductInquiryPagination(state, { payload: pagination }) {
      state.inquiry.pagination = {
        ...state.inquiry.pagination,
        count: pagination.count,
        totalPages: pagination.totalPages,
      };
    },
    setProductInquiryPageVisitHistory(state, { payload: pageNo }) {
      state.inquiry.pageVisitHistory[pageNo] = true;
    },
    setProductInquiryCurrentPage(state, { payload: pageNo }) {
      state.inquiry.pagination.currentPage = pageNo;
    },
    setProductInquiryPageSize(state, { payload: pageSize }) {
      state.inquiry.pagination.perPage = pageSize;
    },
    setInquiryNoticeMaxPage(state, { payload: maxPage }) {
      state.inquiry.noticeMaxPage = maxPage;
    },
    setInquiryBoardLoading(state, { payload: loading }) {
      state.inquiry.loading = loading;
    },
    setInquiryNoticeListCount(state, { payload: count }) {
      state.inquiry.noticeListCount = count;
    },
    setInquiryListCount(state, { payload: count }) {
      state.inquiry.inquiryListCount = count;
    },
    setInquiryHasMore(state, { payload: hasMore }) {
      state.inquiry.hasMore = hasMore;
    },
    toggleExpandInquiryBoardItem(state, { payload: targetItem }: { payload: ProductInquiryItem }) {
      state.inquiry.items = state.inquiry.items.map((item) => ({
        ...item,
        expanded: targetItem.id === item.id && !targetItem.expanded,
      }));
    },
    resetProductInquiryBoard(state) {
      state.inquiry = {
        ...initialState.inquiry,
        pagination: {
          ...initialState.inquiry.pagination,
          perPage: state.inquiry.pagination.perPage,
        },
      };
    },
    setInquiryFormValues(
      state,
      {
        payload: values,
      }: {
        payload: {
          subject: string;
          content: string;
          isSecret: boolean;
        };
      },
    ) {
      state.inquiry.form.values = values;
    },
    setIsError(state, { payload: isError }) {
      state.inquiry.isError = isError;
    },
    setIsPicked(state, { payload: isPicked }) {
      state.isPicked = isPicked;
    },
    setCouponBanner(state, { payload: couponBanner }) {
      state.couponBanner = couponBanner;
    },
  },
});

export const {
  startLoading,
  updateDealProductQuantity,
  setDefaultContentId,
  initProductInquiryItems,
  modifyProductInquiryForm,
  toggleExpandInquiryBoardItem,
  setProductInquiryPageSize,
  setProductInquiryCurrentPage,
  resetProductInquiryBoard,
  setInquiryFormValues,
  deleteProductInquiryItem,
} = actions;

export const initProductDetail =
  (product: ProductProps): AppThunk =>
  async (dispatch) => {
    dispatch(actions.init(product));
  };

const loadProductDetail = (): AppThunk => async (dispatch, getState) => {
  const productCode = getState().productDetail.no;

  try {
    const product = await getProductDetail({ productCode });
    dispatch(initProductDetail(product));

    window.history.replaceState(null, '', `/goods/${productCode}`);
  } catch (e) {
    window.location.reload();
  }
};

export const initProductDetailCouponBanner =
  (productCode: number): AppThunk =>
  async (dispatch) => {
    try {
      const couponBanner = await getProductCouponBanner(productCode);

      if (!couponBanner) {
        dispatch(actions.setCouponBanner(null));
        return;
      }

      const { bannerName, bannerLink, type, accessKey } = couponBanner;

      dispatch(
        actions.setCouponBanner({
          type,
          bannerName,
          bannerLink,
          accessKey,
          extraInfo: type === 'DOWNLOAD_COUPON' ? couponBanner.couponExtraInfo : null,
        }),
      );
    } catch (err) {
      dispatch(actions.setCouponBanner(null));
    }
  };

export const changeProductDetail =
  (productCode: number): AppThunk =>
  async (dispatch) => {
    dispatch(actions.changeATFOption());
    try {
      const product = await getProductDetail({ productCode });
      dispatch(initProductDetail(product));
      dispatch(initProductDetailCouponBanner(productCode));
      await router.replace(`/goods/${productCode}`, undefined, { scroll: false });
    } catch (error) {
      Alert({
        text: !!error ? error.message : '일시적인 오류로 상품 정보를 불러 올 수 없습니다.',
        handleClickConfirmButton: () => dispatch(loadProductDetail()),
      });
    } finally {
      dispatch(actions.stopLoading());
    }
  };

const getInquiryNoticeData = async (productNo: number) => {
  try {
    const list = await getProductInquiryNotice(productNo);
    const count = size(list);
    return {
      list,
      count,
    };
  } catch (error) {
    return {
      list: [],
      count: 0,
    };
  }
};

export const loadProductInquiryItems =
  (productNo: number, pageNo: number): AppThunk =>
  async (dispatch, getState) => {
    const { inquiry } = getState().productDetail;
    const {
      hasMore: prevHasMore,
      noticeListCount: prevNoticeListCount,
      inquiryListCount: prevInquiryListCount,
      items: prevItems,
      pageVisitHistory,
      loading,
      pagination,
      noticeMaxPage,
    } = inquiry;
    const { perPage } = pagination;
    const isInitialPage = isEqual(pageNo, 1);

    if (!isInitialPage && loading) {
      return;
    }
    if (pageVisitHistory[pageNo]) {
      dispatch(
        actions.setProductInquiryPagination({
          ...pagination,
          currentPage: pageNo,
        }),
      );
      return;
    }
    dispatch(actions.setInquiryBoardLoading(true));

    try {
      if (isInitialPage) {
        const { list: noticeList, count: noticeListCount } = await getInquiryNoticeData(productNo);
        const { items, pagination: nextPagination } = await getProductInquiryPost(productNo, pageNo, perPage);
        const { totalPages: nextTotalPages } = nextPagination;
        const inquiryListCount = size(items);
        const isNoticeListEmpty = isEqual(noticeListCount, 0);
        const maxNoticeListPage = Math.ceil(noticeListCount / perPage);
        const currentTotalListCount = sum([noticeListCount, inquiryListCount]);
        const currentTotalPages = isNoticeListEmpty ? nextTotalPages : Math.ceil(currentTotalListCount / perPage);
        const hasMoreInquiry = currentTotalPages > 1;
        dispatch(actions.setProductInquiryPageVisitHistory(pageNo));
        dispatch(actions.setInquiryHasMore(hasMoreInquiry));
        dispatch(actions.setInquiryNoticeListCount(noticeListCount));
        dispatch(actions.setInquiryListCount(inquiryListCount));
        dispatch(actions.setProductInquiryItems(concat(noticeList, items)));
        dispatch(actions.setInquiryNoticeMaxPage(maxNoticeListPage));
        dispatch(
          actions.setProductInquiryPagination({
            count: currentTotalListCount,
            totalPages: currentTotalPages,
            currentPage: 1,
            perPage,
          }),
        );
        dispatch(actions.setInquiryBoardLoading(false));
        return;
      }
      if (!prevHasMore) {
        dispatch(actions.setInquiryBoardLoading(false));
        return;
      }
      const shouldFetchInquiry = noticeMaxPage <= pageNo;
      if (!shouldFetchInquiry) {
        dispatch(
          actions.setProductInquiryPagination({
            ...pagination,
            currentPage: pageNo,
          }),
        );
        dispatch(actions.setInquiryBoardLoading(false));
        return;
      }
      const actualPage = noticeMaxPage === 0 ? pageNo : Math.abs(noticeMaxPage - pageNo) + 1;

      if (isEqual(actualPage, 1)) {
        dispatch(
          actions.setProductInquiryPagination({
            ...pagination,
            currentPage: pageNo,
          }),
        );
        dispatch(actions.setInquiryBoardLoading(false));
        return;
      }

      const { items, pagination: nextPagination } = await getProductInquiryPost(productNo, actualPage, perPage);
      const { totalPages: nextTotalPages } = nextPagination;
      const inquiryListCount = size(items);
      const isListFullFilled = isEqual(inquiryListCount, perPage);
      const currentInquiryListCount = sum([prevInquiryListCount, inquiryListCount]);
      const currentTotalListCount = sum([prevNoticeListCount, currentInquiryListCount]);
      const hasMoreInquiry = nextTotalPages > actualPage && isListFullFilled;

      dispatch(actions.setProductInquiryPageVisitHistory(pageNo));
      dispatch(actions.setInquiryHasMore(hasMoreInquiry));
      dispatch(actions.setInquiryListCount(currentInquiryListCount));
      dispatch(actions.setProductInquiryItems(concat(prevItems, items)));
      dispatch(
        actions.setProductInquiryPagination({
          count: currentTotalListCount,
          totalPages: hasMoreInquiry ? pageNo + 1 : pageNo,
          currentPage: pageNo,
          perPage,
        }),
      );
      dispatch(actions.setInquiryBoardLoading(false));
    } catch (error) {
      dispatch(actions.setIsError(true));
    }
  };

export const loadProductInquiryNextItems =
  (productNo: number): AppThunk =>
  (dispatch, getState) => {
    const { inquiry } = getState().productDetail;
    const { pagination } = inquiry;
    const { totalPages, currentPage } = pagination;

    if (totalPages > 0 && currentPage > totalPages) {
      return;
    }

    dispatch(loadProductInquiryItems(productNo, currentPage));
    dispatch(setProductInquiryCurrentPage(currentPage + 1));
  };

export const loadProductIsPicked =
  (productNo: number): AppThunk =>
  async (dispatch) => {
    try {
      const data = await getIsPickedProduct({ productNo });
      dispatch(actions.setIsPicked(data.isPicked));
    } catch (err) {
      dispatch(notify(err.message));
    }
  };

export const changeProductIsPicked =
  (isReferrerReviewDetail?: boolean): AppThunk =>
  async (dispatch, getState) => {
    const { no, isPicked } = getState().productDetail;
    const togglePicked = !isPicked;

    dispatch(actions.setIsPicked(togglePicked));
    try {
      await putPickProduct({
        productNo: no,
        isPicked: togglePicked,
      });

      const { queryId } = getState().productList;
      const productDetailState = getState().productDetail;

      if (togglePicked) {
        amplitudeService.logEvent(
          new SelectPickProduct({
            productDetailState,
            fusionQueryId: getFusionQueryId(queryId),
            isReferrerReviewDetail,
          }),
        );
        return;
      }

      amplitudeService.logEvent(
        new RemovePickProduct({
          productDetailState,
          fusionQueryId: getFusionQueryId(queryId),
          isReferrerReviewDetail,
        }),
      );
    } catch (err) {
      dispatch(actions.setIsPicked(isPicked));
      dispatch(notify(err.message));
    }
  };

export const reloadProductInquiryBoard = (): AppThunk => async (dispatch, getState) => {
  const { no, inquiry } = getState().productDetail;
  const { currentPage } = inquiry.pagination;
  dispatch(actions.resetProductInquiryBoard());
  dispatch(loadProductInquiryItems(no, currentPage));
};

export const postProductInquiryItem =
  ({
    productNo,
    subject,
    content,
    isSecret,
  }: {
    productNo: number;
    subject: string;
    content: string;
    isSecret: boolean;
  }): AppThunk =>
  async (dispatch, getState) => {
    const { queryId } = getState().productList;
    const { mode, postId } = getState().productDetail.inquiry.form;

    switch (mode) {
      case 'new': {
        const { id } = await postProductInquiryDraft(productNo);

        try {
          amplitudeService.logEvent(
            new SubmitProductInquirySuccess({
              isFirstSubmitted: true,
              fusionQueryId: getFusionQueryId(queryId),
            }),
          );
        } catch (e) {
        } finally {
          await postProductInquiryForm(productNo, id, {
            subject,
            contents: content,
            is_secret: isSecret,
          });
        }
        break;
      }
      case 'edit': {
        if (!postId) {
          throw Error();
        }

        try {
          amplitudeService.logEvent(
            new SubmitProductInquirySuccess({
              isFirstSubmitted: false,
              fusionQueryId: getFusionQueryId(queryId),
            }),
          );
        } catch (e) {
        } finally {
          await putProductInquiryItem({
            postId,
            productNo: productNo,
            payload: {
              subject,
              contents: content,
              is_secret: isSecret,
            },
          });
        }
        break;
      }
      default:
        throw Error();
    }
  };

export const loadProductDetailInfo =
  (productCode: number): AppThunk =>
  async (dispatch) => {
    try {
      const product = await getProductDetail({ productCode });
      dispatch(initProductDetail(product));
    } catch (error) {
      Alert({
        text: !!error ? error.message : '일시적인 오류로 상품 정보를 불러 올 수 없습니다.',
        handleClickConfirmButton: () => dispatch(loadProductDetail()),
      });
    } finally {
      dispatch(actions.stopLoading());
    }
  };

export default reducer;
