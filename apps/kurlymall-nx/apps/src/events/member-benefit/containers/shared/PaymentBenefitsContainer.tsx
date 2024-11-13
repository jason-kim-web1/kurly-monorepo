import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import { usePaymentBenefitsInfo } from '../../hooks/usePaymentBenefitsQuery';
import Alert from '../../../../shared/components/Alert/Alert';
import { redirectTo } from '../../../../shared/reducers/page';
import { MEMBER_BENEFIT_PATH } from '../../../../shared/constant';
import PaymentHead from '../../components/shared/PaymentHead';
import Loading from '../../../../shared/components/Loading/Loading';
import PaymentContent from '../../components/shared/PaymentContent';
import PaymentNotice from '../../components/shared/PaymentNotice';

const Container = styled.div`
  overflow-wrap: anywhere;
  word-break: keep-all;
`;

export default function PaymentBenefitsContainer() {
  const { isReady } = useRouter();

  const dispatch = useDispatch();

  const { isLoading, data, isDifferentId } = usePaymentBenefitsInfo();

  useEffect(() => {
    if (!isReady || isLoading) {
      return;
    }

    if (isDifferentId) {
      Alert({
        text: '존재하지 않거나, 종료된 혜택 페이지입니다.',
      }).then(() => {
        dispatch(redirectTo({ url: MEMBER_BENEFIT_PATH.members.uri, replace: true }));
      });
      return;
    }
  }, [dispatch, isDifferentId, isLoading, isReady]);

  if (isLoading) {
    return <Loading />;
  }

  return data ? (
    <Container>
      <PaymentHead paymentHead={data.head} />
      <PaymentContent paymentContent={data.content} />
      <PaymentNotice paymentNotice={data.notice} />
    </Container>
  ) : null;
}
