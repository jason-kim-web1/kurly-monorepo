import { useRouter } from 'next/router';
import { isEmpty } from 'lodash';

import { useAppSelector } from '../../../shared/store';
import { ignoreError } from '../../../shared/utils/general';
import { amplitudeService } from '../../../shared/amplitude';
import { SelectBenefitBanner } from '../../../shared/amplitude/events/product/SelectBenefitBanner';

const useBenefitBanner = () => {
  const router = useRouter();
  const { isShown, benefits, plccUrl } = useAppSelector(({ productDetail }) => productDetail.plcc);

  const isShowBenefitBanner = isShown && !isEmpty(benefits);

  const handleClickBenefitBanner = (contents: string) => () => {
    ignoreError(() => {
      amplitudeService.logEvent(
        new SelectBenefitBanner({
          message: contents,
          url: plccUrl,
        }),
      );
    });
    router.push(plccUrl);
  };

  return { isShowBenefitBanner, benefits, handleClickBenefitBanner };
};

export { useBenefitBanner };
