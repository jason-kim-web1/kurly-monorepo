import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { loadUnsubscribeMembershipDetail } from '../shared/membership.slice';
import { useAppSelector } from '../../../shared/store';
import Loading from '../../../shared/components/Loading/Loading';
import Alert from '../../../shared/components/Alert/Alert';
import { MEMBERSHIP_PATH, getPageUrl } from '../../../shared/constant';
import ShowBenefitsComponent from '../components/ShowBenefits';
import SurveyComponent from '../components/Survey';
import { amplitudeService } from '../../../shared/amplitude';
import { SelectMembershipUnsubscribe } from '../../../shared/amplitude/events/membership';
import { redirectTo } from '../../../shared/reducers/page';
import RemainingPeriodComponent from '../components/RemainingPeriod';
import { loadMemberLoading } from '../../../shared/reducers/member';
import { useStayMembership } from '../hooks/useStayMembership';
import { handleClickUnsubscribeConfirm } from '../shared/utils';
import { UnsubscribeConfirmMessage } from '../shared/type';
import { useMyBenefitInfo } from '../hooks/useMyBenefitQuery';

enum UnsubscribeMembershipProcess {
  ShowBenefits = 'showBenefits',
  Survey = 'survey',
}

type CancelReason = {
  id: number;
  reason: string;
};

export default function UnsubscribeMembershipContainer() {
  const [currentState, setCurrentState] = useState({
    process: UnsubscribeMembershipProcess.ShowBenefits,
  });

  const dispatch = useDispatch();

  const { isSubscribed, endSubscriptionDate, isSKTMember } = useAppSelector(({ member }) => ({
    isSubscribed: member.subscription.isSubscribed,
    endSubscriptionDate: member.subscription.endSubscriptionDate,
    isSKTMember: member.subscription.partner?.isSKT,
  }));

  const memberLoading = useAppSelector(loadMemberLoading);

  const { loading, isCancelNow } = useAppSelector(({ myMembership }) => ({
    isCancelNow: myMembership.isCancelNow,
    loading: myMembership.loading,
  }));

  const { returnUrl, showStayMembership } = useStayMembership();

  const { isLoading: benefitLoading, coreBenefitValue } = useMyBenefitInfo();

  const updateMembership = useCallback(() => {
    dispatch(loadUnsubscribeMembershipDetail());
  }, [dispatch]);

  useEffect(() => {
    if (memberLoading) {
      return;
    }

    if (!isSubscribed || isSKTMember) {
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
      return;
    }

    if (isSubscribed) {
      updateMembership();
      return;
    }
  }, [updateMembership, isSubscribed, memberLoading, isSKTMember, dispatch]);

  const showSurvey = () => {
    amplitudeService.logEvent(new SelectMembershipUnsubscribe({ pageName: 'unsubscribe', message: '해지하기' }));

    setCurrentState({ process: UnsubscribeMembershipProcess.Survey });
  };

  const remainingPeriodInfo = async (cancelReason: CancelReason) => {
    await RemainingPeriodComponent({
      cancelReason: cancelReason,
      returnUrl,
      dispatch,
      isCancelNow,
      endSubscriptionDate,
      showStayMembership,
    });
  };

  const submitSurveyResult = (id: number, text: string) => {
    handleClickUnsubscribeConfirm({
      pageName: 'survey',
      message: UnsubscribeConfirmMessage.SURVEY,
      clickAction: () => remainingPeriodInfo({ id, reason: text }),
    });
  };

  if (loading || memberLoading || benefitLoading) {
    return <Loading testId="loading" />;
  }

  if (currentState.process === UnsubscribeMembershipProcess.ShowBenefits) {
    return (
      <ShowBenefitsComponent
        nextProcess={showSurvey}
        showStayMembership={showStayMembership}
        coreBenefitValue={coreBenefitValue}
      />
    );
  }

  if (currentState.process === UnsubscribeMembershipProcess.Survey) {
    return <SurveyComponent submitSurveyResult={submitSurveyResult} />;
  }

  return null;
}
