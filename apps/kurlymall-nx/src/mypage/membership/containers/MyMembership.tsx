import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';

import { loadMyMembership } from '../shared/membership.slice';
import { useAppSelector } from '../../../shared/store';
import Loading from '../../../shared/components/Loading/Loading';
import { MEMBERSHIP_PATH, getPageUrl } from '../../../shared/constant';
import Alert from '../../../shared/components/Alert/Alert';
import Notice from '../components/Notice';
import PaymentSettlement from '../components/PaymentSettlement';
import MyHeader from '../components/MyHeader';
import { redirectTo } from '../../../shared/reducers/page';
import { loadMemberLoading } from '../../../shared/reducers/member';
import FreeTicket from '../components/FreeTicket';
import { RoundSection } from '../shared/styled';
import AffiliateBenefitTitle from '../components/AffiliateBenefitTitle';
import AffiliateBenefitList from '../components/AffiliateBenefitList';
import { CLASS_NAME_DEVICE, MEMBERS_COLLECTION_CODE } from '../shared/constants';
import MembersProductList from '../components/MembersProductList';
import useProductList from '../../../product/list/hook/useProductList';
import { DEFAULT_SORT_TYPE } from '../../../search/shared/constants';
import { useMyBenefitInfo } from '../hooks/useMyBenefitQuery';

const Container = styled.div`
  overflow-wrap: anywhere;
  background-color: ${vars.color.background.$background2};
  word-break: keep-all;

  &.mobile {
    padding: 20px 16px 0;
  }
`;

export default function MyMembershipContainer() {
  const dispatch = useDispatch();

  const { loading } = useAppSelector(({ myMembership }) => ({
    loading: myMembership.loading,
  }));

  const { isSubscribed } = useAppSelector(({ member }) => ({
    isSubscribed: member.subscription.isSubscribed,
  }));

  const memberLoading = useAppSelector(loadMemberLoading);

  const { data: membersCollection, isLoading: collectionLoading } = useProductList({
    section: 'collections',
    code: MEMBERS_COLLECTION_CODE,
    defaultSortType: DEFAULT_SORT_TYPE,
  });

  const { isLoading: benefitLoading } = useMyBenefitInfo();

  const updateMembership = useCallback(() => {
    dispatch(loadMyMembership());
  }, [dispatch]);

  useEffect(() => {
    if (memberLoading) {
      return;
    }

    if (isSubscribed) {
      updateMembership();
    } else {
      Alert({
        text: '유효하지 않은 접근입니다. 다시 시도해주세요.',
      }).then(() => {
        dispatch(
          redirectTo({
            url: getPageUrl(MEMBERSHIP_PATH.membership),
            replace: true,
          }),
        );
      });
    }
  }, [updateMembership, isSubscribed, dispatch, memberLoading]);

  if (loading || memberLoading || collectionLoading || benefitLoading) {
    return <Loading testId="loading" />;
  }

  return (
    <Container className={CLASS_NAME_DEVICE}>
      <MyHeader />
      <RoundSection>
        <AffiliateBenefitTitle />
        <AffiliateBenefitList />
      </RoundSection>
      <MembersProductList membersCollection={membersCollection?.products ?? []} />
      <FreeTicket />
      <PaymentSettlement />
      <Notice />
    </Container>
  );
}
