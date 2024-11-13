import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';

import HeaderButtons from '../../../../src/shared/components/layouts/HeaderButtons';
import BackButton from '../../../../src/shared/components/Button/BackButton';
import HeaderTitle from '../../../../src/shared/components/layouts/HeaderTitle';
import MobileHeader from '../../../../src/shared/components/layouts/MobileHeader';
import ProductInquiryFormContainer from '../../../../src/product/board/inquiry/m/form/ProductInquiryFormContainer';
import { useAppSelector } from '../../../../src/shared/store';
import { notify, redirectToLogin } from '../../../../src/shared/reducers/page';
import { amplitudeService } from '../../../../src/shared/amplitude';
import { SelectBackButton } from '../../../../src/shared/amplitude/events/product/SelectBackButton';

export default function ProductInquiryFormPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { no, name } = router.query;

  const { isGuest, hasSession } = useAppSelector(({ auth }) => auth);
  const productDetailState = useAppSelector(({ productDetail }) => productDetail);

  useEffect(() => {
    if (hasSession && isGuest) {
      dispatch(redirectToLogin());
    }
  }, [isGuest, hasSession, dispatch]);

  const productNo = Number(no);
  const productName = name?.toString() ?? '';

  useEffect(() => {
    if (!productNo) {
      dispatch(notify('잘못된 접근입니다.'));
      router.back();
    }
  }, [productNo, router, dispatch]);

  if (!productNo) {
    return null;
  }

  const onClickBackButton = async () => {
    try {
      await amplitudeService.logEvent(
        new SelectBackButton({
          productDetailState,
          cancelType: 'back_button',
        }),
      );
    } catch (e) {
    } finally {
      window.history.back();
    }
  };

  return (
    <>
      <MobileHeader visibleBanner={false}>
        <HeaderButtons position="left">
          <BackButton onClick={onClickBackButton} />
        </HeaderButtons>
        <HeaderTitle>상품문의</HeaderTitle>
      </MobileHeader>
      <ProductInquiryFormContainer productNo={productNo} productName={productName} />
    </>
  );
}
