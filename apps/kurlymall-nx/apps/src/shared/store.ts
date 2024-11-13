import { configureStore, getDefaultMiddleware, ThunkAction } from '@reduxjs/toolkit';
import { AnyAction, combineReducers, PreloadedState } from 'redux';

import { shallowEqual, TypedUseSelectorHook, useSelector } from 'react-redux';

import authReducer, { AuthState } from './reducers/auth';
import termsReducer, { TermsState } from './reducers/terms';
import pageReducer, { PageState } from './reducers/page';
import giftReducer, { GiftState } from '../gift/slice';
import checkoutReducer, { CheckoutState } from '../order/checkout/shared/reducers/checkout.slice';
import paymentsReducer, { PaymentsState } from '../order/shared/shared/reducers/payments.slice';
import mypageGiftReducer, { MypageGiftState } from '../mypage/gift/shared/reducers/mypage-gift.slice';
import findReducer, { FindState } from '../member/find/reducers/find.slice';
import personalInquiryListReducer, { PersonalInquiryListState } from '../mypage/personal-inquiry/list/slice';
import personalInquiryFormReducer, { PersonalInquiryFormState } from '../mypage/personal-inquiry/form/slice';
import SocialReducer, { SocialState } from '../member/signup/reducers/slice';
import productDetailReducer, { ProductDetailState } from '../product/detail/slice';
import addressReducer, { AddressState } from './reducers/address';

import cartReducer, { CartState } from '../order/cart/store/cart';
import categoryReducer, { CategoryState } from './reducers/category';
import inquirykakaoReducer, { InquiryKakaoState } from './reducers/InquiryKakao';
import headerReducer, { HeaderState } from '../header/header.slice';
import faqReducer, { FaqState } from '../mypage/faq/slice';
import myKurlyStyleReducer, { MyKurlyStyleState } from '../mypage/my-kurly-style/slice';
import memberReducer, { MemberState } from './reducers/member';
import { mypageCancelReducer, MypageCancelState } from '../mypage/order/mypage-cancel.slice';
import { isProduction } from './configs/config';
import { userTermsReducer, UserTermsState } from '../user-terms/slice';
import { shippingAddressReducer, ShippingAddressState } from './reducers/shipping-address.slice';
import { asyncRequestReducer } from '../cart/shared/reducers/async-request.slice';
import mainReducer, { MainState } from '../main/slice';
import productListReducer, { ProductListState } from '../product/list/slice';
import bulkOrderReducer, { BulkOrderState } from '../mypage/bulk-order/reducers/bulk-order.slice';
import leaveReducer, { LeaveState } from '../mypage/leave/reducers/leave.slice';
import signupReducer, { SignupState } from '../member/signup/reducers/signup.slice';
import {
  mypageGiftCancelReducer,
  MypageGiftCancelState,
} from '../mypage/gift/shared/reducers/mypage-gift-cancel.slice';
import checkoutPaymentReducer, { CheckoutPaymentState } from '../order/checkout/shared/reducers/checkout-payment.slice';
import checkoutCouponReducer, { CheckoutCouponState } from '../order/checkout/shared/reducers/checkout-coupon.slice';
import myMembershipReducer from '../mypage/membership/shared/membership.slice';
import myKurlyReducer from '../mypage/info-section/mykurly.slice';
import { MyMembershipState } from '../mypage/membership/shared/type';
import subscribeResultReducer, { SubscribeResultState } from '../order/subscribe/reducers/subscribeResult.slice';
import subscribeCheckout, { SubscribeCheckoutState } from '../order/subscribe/reducers/subscribeCheckout.slice';
import orderListReducer, { OrderListState } from '../order/order-list/store/order-list';

export type AppState = {
  checkout: CheckoutState;
  checkoutPayment: CheckoutPaymentState;
  checkoutCoupon: CheckoutCouponState;
  payments: PaymentsState;
  gift: GiftState;
  auth: AuthState;
  mypageGift: MypageGiftState;
  mypageGiftCancel: MypageGiftCancelState;
  terms: TermsState;
  page: PageState;
  cart: CartState;
  category: CategoryState;
  inquirykakao: InquiryKakaoState;
  header: HeaderState;
  find: FindState;
  personalInquiryList: PersonalInquiryListState;
  personalInquiryForm: PersonalInquiryFormState;
  social: SocialState;
  faq: FaqState;
  myKurlyStyle: MyKurlyStyleState;
  productDetail: ProductDetailState;
  userTerms: UserTermsState;
  member: MemberState;
  address: AddressState;
  shippingAddress: ShippingAddressState;
  main: MainState;
  mypageCancel: MypageCancelState;
  productList: ProductListState;
  bulkOrder: BulkOrderState;
  leave: LeaveState;
  signup: SignupState;
  myMembership: MyMembershipState;
  subscribeCheckout: SubscribeCheckoutState;
  subscribeResult: SubscribeResultState;
  orderList: OrderListState;
};

const rootReducer = combineReducers({
  gift: giftReducer,
  mypageGift: mypageGiftReducer,
  mypageGiftCancel: mypageGiftCancelReducer,
  checkout: checkoutReducer,
  checkoutPayment: checkoutPaymentReducer,
  checkoutCoupon: checkoutCouponReducer,
  payments: paymentsReducer,
  auth: authReducer,
  terms: termsReducer,
  page: pageReducer,
  cart: cartReducer,
  category: categoryReducer,
  inquirykakao: inquirykakaoReducer,
  header: headerReducer,
  find: findReducer,
  personalInquiryList: personalInquiryListReducer,
  personalInquiryForm: personalInquiryFormReducer,
  social: SocialReducer,
  faq: faqReducer,
  myKurlyStyle: myKurlyStyleReducer,
  productDetail: productDetailReducer,
  userTerms: userTermsReducer,
  member: memberReducer,
  address: addressReducer,
  shippingAddress: shippingAddressReducer,
  asyncRequest: asyncRequestReducer,
  main: mainReducer,
  mypageCancel: mypageCancelReducer,
  productList: productListReducer,
  bulkOrder: bulkOrderReducer,
  leave: leaveReducer,
  signup: signupReducer,
  myMembership: myMembershipReducer,
  subscribeCheckout: subscribeCheckout,
  subscribeResult: subscribeResultReducer,
  myKurly: myKurlyReducer,
  orderList: orderListReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware({ thunk: true })],
    devTools: !isProduction(),
    preloadedState,
  });
};

const store = setupStore();

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
export const useAppSelector: TypedUseSelectorHook<RootState> = (selectFunction) =>
  useSelector(selectFunction, shallowEqual);
