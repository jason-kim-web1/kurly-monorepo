import { useRouter } from 'next/router';

import Lottie from 'react-lottie-player';

import Images from './Images';
import { useWebview } from '../../shared/hooks/useWebview';
import { useAppSelector } from '../../shared/store';
import { isPC } from '../../../util/window/getDevice';
import { StyledTopBannerWrapper } from '../shared/styled';
import { ContentBody } from '../shared/type';

type TopBannerProps = { images?: ContentBody['images']; styles?: ContentBody['styles']; animationData?: object };

function TopBanner({ images, styles, animationData }: TopBannerProps) {
  const webview = useWebview();

  const {
    query: { isSubTab },
  } = useRouter();

  const { title } = useAppSelector(({ header }) => ({
    title: header.topBanner.title,
  }));

  return (
    <StyledTopBannerWrapper
      className={isPC ? 'pc' : 'mobile'}
      hasBanner={!!title}
      isSubTab={!!isSubTab}
      isWebview={!!webview}
      backgroundColor={styles?.backgroundColor}
    >
      <Images images={images} />
      {animationData ? <Lottie loop play animationData={animationData} className="lottie" /> : null}
    </StyledTopBannerWrapper>
  );
}

export default TopBanner;
