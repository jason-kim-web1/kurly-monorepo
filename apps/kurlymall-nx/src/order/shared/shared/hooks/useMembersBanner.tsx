import { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import useMembersBannerQuery from '../../../checkout/shared/hooks/queries/useMembersBannerQuery';

import { MembersBannerType } from '../../../checkout/shared/constants/kurly-members-banner';
import { amplitudeService } from '../../../../shared/amplitude';
import {
  KurlyMembersBannerTypeEventMap,
  SelectOrderSheetBanner,
} from '../../../../shared/amplitude/events/checkout/SelectOrderSheetBanner';
import appService from '../../../../shared/services/app.service';
import { INFORMATION_CODE } from '../../../../shared/services';
import { CALLBACK_FUNCTION_NAMES } from '../../../../shared/constant/callbackFunction';
import { redirectTo } from '../../../../shared/reducers/page';
import { isWebview } from '../../../../../util/window/getDevice';

interface MembersBannerProps {
  bannerType: MembersBannerType;
  redirectLink?: string;
}

export default function useMembersBanner({ bannerType, redirectLink }: MembersBannerProps) {
  const dispatch = useDispatch();
  const { membersBanner, bannerLink } = useMembersBannerQuery(bannerType);
  const targetUrl = `${redirectLink ?? bannerLink}`;

  const goToMembership = useCallback(() => {
    amplitudeService.logEvent(
      new SelectOrderSheetBanner({ selectionType: KurlyMembersBannerTypeEventMap[bannerType] }),
    );

    if (isWebview()) {
      appService.postWebViewController({
        code: INFORMATION_CODE.RETURN,
        callback_function: `${CALLBACK_FUNCTION_NAMES.checkoutMembershipRefresh}()`,
      });

      dispatch(redirectTo({ url: `kurly://open?url=${targetUrl}` }));
      return;
    }

    dispatch(redirectTo({ url: targetUrl }));
  }, [bannerType, dispatch, targetUrl]);

  return { membersBanner, goToMembership };
}
