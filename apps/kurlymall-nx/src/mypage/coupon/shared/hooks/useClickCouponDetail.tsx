import { amplitudeService } from '../../../../shared/amplitude';
import { SelectCouponRemoteButton } from '../../../../shared/amplitude/events/coupon';

interface AmplitudeProperties {
  url: string;
  primaryCategoryId?: string | null;
  secondaryCategoryId?: number | null;
  contentId?: string | null;
  dealName?: string | null;
}

export default function useClickCouponDetail() {
  const handleClickAmplitude = ({
    url,
    primaryCategoryId,
    secondaryCategoryId,
    dealName,
    contentId,
  }: AmplitudeProperties) => {
    amplitudeService.logEvent(
      new SelectCouponRemoteButton({
        url,
        primaryCategoryId,
        secondaryCategoryId,
        contentId,
        dealName,
      }),
    );
  };

  return {
    handleClickAmplitude,
  };
}
