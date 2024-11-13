import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import MobileHeader from '../../../../src/shared/components/layouts/MobileHeader';
import BackButton from '../../../../src/shared/components/Button/BackButton';
import HeaderButtons from '../../../../src/shared/components/layouts/HeaderButtons';
import HeaderTitle from '../../../../src/shared/components/layouts/HeaderTitle';
import AuthContainer from '../../../../src/shared/components/Auth/AuthContainer';
import Alert from '../../../../src/shared/components/Alert/Alert';

import RegistrationForm from '../../../../src/mypage/review/components/m/RegistrationForm';
import ModificationForm from '../../../../src/mypage/review/components/m/ModificationForm';

import { ALERT_MESSAGES } from '../../../../src/mypage/review/constants';

export default function ReviewFormPage() {
  const [touched, setTouched] = useState(false);
  const router = useRouter();
  const { isReady, query } = router;
  const { order, deal, contents, review } = query;
  const orderNo = Number(order);
  const dealProductNo = Number(deal);
  const contentsProductNo = Number(contents);
  const reviewNo = Number(review);
  const isNewReview = !Boolean(reviewNo);

  const leaveReviewPage = () => router.back();

  const handleClickLeaveReviewForm = async () => {
    if (!touched) {
      leaveReviewPage();
      return;
    }
    const { isDismissed } = await Alert({
      text: isNewReview
        ? ALERT_MESSAGES.CONFIRM_LEAVE_REGISTRATION_FORM
        : ALERT_MESSAGES.CONFIRM_LEAVE_MODIFICATION_FORM,
      showCancelButton: true,
    });
    if (isDismissed) {
      return;
    }
    leaveReviewPage();
  };

  useEffect(() => {
    const listener = (event: MouseEvent) => event.preventDefault();
    addEventListener('contextmenu', listener);
    return () => removeEventListener('contextmenu', listener);
  }, []);

  return (
    <>
      <MobileHeader>
        <HeaderButtons position="left">
          <BackButton onClick={handleClickLeaveReviewForm} />
        </HeaderButtons>
        <HeaderTitle>{isNewReview ? '후기 작성' : '후기 수정'}</HeaderTitle>
      </MobileHeader>
      <AuthContainer loginRequired>
        {isReady ? (
          isNewReview ? (
            <RegistrationForm
              orderNo={orderNo}
              dealProductNo={dealProductNo}
              contentsProductNo={contentsProductNo}
              setTouched={setTouched}
              onCancel={leaveReviewPage}
            />
          ) : (
            <ModificationForm
              contentsProductNo={contentsProductNo}
              reviewNo={reviewNo}
              touched={touched}
              setTouched={setTouched}
              onCancel={leaveReviewPage}
            />
          )
        ) : null}
      </AuthContainer>
    </>
  );
}
