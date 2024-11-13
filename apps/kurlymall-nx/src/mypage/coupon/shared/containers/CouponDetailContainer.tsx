import styled from '@emotion/styled';

import { useRouter } from 'next/router';

import { useEffect } from 'react';

import Loading from '../../../../shared/components/Loading/Loading';
import useCouponDetailQuery from '../queries/useCouponDetailQuery';
import CouponDetailHead from '../components/CouponDetailHead';
import CouponDetailNotice from '../components/CouponDetailNotice';
import Alert from '../../../../shared/components/Alert/Alert';
import { isPC, isWebview } from '../../../../../util/window/getDevice';
import appService from '../../../../shared/services/app.service';
import { MYPAGE_PATH } from '../../../../shared/constant';
import COLOR from '../../../../shared/constant/colorset';
import CouponDetailBottomSheet from '../components/CouponDetailBottomSheet';
import CouponDetailContent from '../components/CouponDetailContent';
import { amplitudeService } from '../../../../shared/amplitude';
import { ViewCouponDetail } from '../../../../shared/amplitude/events/coupon';

const Container = styled.div`
  overflow: hidden;
  position: relative;
  background-color: ${COLOR.mykurlyBg};

  &.mobile {
    min-height: calc(-44px + 100vh);
  }
`;

export default function CouponDetailContainer() {
  const { replace } = useRouter();

  const { isLoading, error, data } = useCouponDetailQuery();

  useEffect(() => {
    if (error) {
      const handleError = async (err: typeof error) => {
        await Alert({ contents: err.message, allowOutsideClick: false });

        if (isWebview()) {
          appService.closeWebview();
          return;
        }

        await replace(MYPAGE_PATH.coupon.uri);
      };

      handleError(error);
    }
  }, [error, replace]);

  useEffect(() => {
    if (data?.id) {
      amplitudeService.logEvent(new ViewCouponDetail({ couponCode: data?.id }));
    }
  }, [data?.id]);

  if (isLoading || !data) {
    return <Loading />;
  }

  return (
    <Container className={isPC ? 'pc' : 'mobile'}>
      <CouponDetailHead />
      <CouponDetailContent />
      <CouponDetailNotice />
      <CouponDetailBottomSheet />
    </Container>
  );
}
