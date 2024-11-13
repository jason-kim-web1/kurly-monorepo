import { useRouter } from 'next/router';

import { useDispatch } from 'react-redux';

import { isWebview } from '../../../../util/window/getDevice';
import { useUnsubscribeInfo } from '../hooks/useUnsubscribeInfo';
import { CancelButtonGroup, TooltipButtonWrap, TooltipLayer, TooltipLayerWrap } from '../shared/styled';
import { CLASS_NAME_DEVICE } from '../shared/constants';
import Button from '../../../shared/components/Button/Button';
import { amplitudeService } from '../../../shared/amplitude';
import { SelectMembershipUnsubscribe } from '../../../shared/amplitude/events/membership';
import { redirectTo } from '../../../shared/reducers/page';
import { MYPAGE_PATH } from '../../../shared/constant';
import appService from '../../../shared/services/app.service';
import LegoViewComponent from '../../../lego/components/LegoViewComponent';

export default function BenefitLegoView() {
  const dispatch = useDispatch();

  const { query } = useRouter();

  const { return_url: returnUrl } = query as { return_url: string };

  const { isLoading, legoUrl, tooltipText, goToMyMembershipButtonText, unsubscribeActionButtonText } =
    useUnsubscribeInfo();

  const handleClickMyMembership = () => {
    amplitudeService.logEvent(
      new SelectMembershipUnsubscribe({ pageName: 'event', message: goToMyMembershipButtonText }),
    );

    if (!returnUrl && isWebview()) {
      appService.closeWebview();
      return;
    }
    dispatch(redirectTo({ url: MYPAGE_PATH.myMembership.uri }));
  };

  const handleClickUnsubscribe = () => {
    amplitudeService.logEvent(
      new SelectMembershipUnsubscribe({ pageName: 'event', message: unsubscribeActionButtonText }),
    );

    if (isWebview()) {
      appService.setNavigationButton({
        buttonType: 'back',
      });
    }

    if (returnUrl) {
      dispatch(redirectTo({ url: `${MYPAGE_PATH.unsubscribeMembership.uri}?return_url=${returnUrl}` }));
      return;
    }

    dispatch(redirectTo({ url: MYPAGE_PATH.unsubscribeMembership.uri }));
  };

  return (
    <>
      <LegoViewComponent legoUrl={legoUrl} isMetaLoading={isLoading} />
      <CancelButtonGroup
        paddingTop={40}
        isVertical={true}
        isRevers={true}
        isSticky={false}
        className={CLASS_NAME_DEVICE}
      >
        <TooltipButtonWrap>
          {tooltipText && (
            <TooltipLayerWrap>
              <TooltipLayer className="tooltip">{tooltipText}</TooltipLayer>
            </TooltipLayerWrap>
          )}
          <Button theme="primary" text={goToMyMembershipButtonText} radius={6} onClick={handleClickMyMembership} />
        </TooltipButtonWrap>
        <Button theme="tertiary" text={unsubscribeActionButtonText} radius={6} onClick={handleClickUnsubscribe} />
      </CancelButtonGroup>
    </>
  );
}
