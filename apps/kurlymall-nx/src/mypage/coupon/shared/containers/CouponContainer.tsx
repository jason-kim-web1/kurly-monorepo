import styled from '@emotion/styled';

import useCouponListQuery from '../queries/useCouponListQuery';
import CouponBanner from '../components/CouponBanner';
import CouponList from '../components/CouponList';
import CouponRegister from '../components/CouponRegister';
import EmptyCoupon from '../components/EmptyCoupon';
import { ERROR_TEXT } from '../constants';
import Loading from '../../../../shared/components/Loading/Loading';

const Container = styled.div`
  position: relative;
`;

export default function CouponContainer() {
  const { isError, isLoading } = useCouponListQuery();

  if (isError) {
    return <EmptyCoupon text={ERROR_TEXT} />;
  }

  if (isLoading) {
    return <Loading testId="loading" />;
  }

  return (
    <Container>
      <CouponBanner />
      <CouponList />
      <CouponRegister />
    </Container>
  );
}
