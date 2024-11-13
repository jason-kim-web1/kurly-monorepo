import TopBanner from '../../../marketing/components/TopBanner';
import * as VVIPAnimationData from '../assets/VVIP_lottie.json';
import * as VIPAnimationData from '../assets/VIP_lottie.json';
import { isPC } from '../../../../util/window/getDevice';
import { ContentBody } from '../../../marketing/shared/type';
import useVIPLevel from '../../shared/useVIPLevel';

type LoungeTopBannerProps = { images?: ContentBody['images']; styles?: ContentBody['styles']; animationData?: object };

function LoungeTopBanner({ images, styles }: LoungeTopBannerProps) {
  const { isVVIP } = useVIPLevel();

  let animationData = undefined;
  if (!isPC) {
    animationData = isVVIP ? VVIPAnimationData : VIPAnimationData;
  }

  return <TopBanner animationData={animationData} images={images} styles={styles} />;
}

export default LoungeTopBanner;
