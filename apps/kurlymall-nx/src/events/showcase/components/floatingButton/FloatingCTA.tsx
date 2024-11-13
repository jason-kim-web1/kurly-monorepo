import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { FloatingButton } from './index';
import { ignoreError } from '../../../../shared/utils/general';
import { SelectEventPageButton } from '../../../../shared/amplitude/events/event';
import { amplitudeService } from '../../../../shared/amplitude';
import deepLinkUrl from '../../../../shared/constant/deepLink';
import { isWebview } from '../../../../../util/window/getDevice';
import { KURLY_URL } from '../../../../shared/configs/config';
import { useShowcaseContext } from '../../context/showcaseContext';

const ContentName = styled.p`
  max-width: 70%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${COLOR.kurlyWhite};
  font-size: 16px;
  font-weight: 600;
  line-height: 1.571rem;
`;

const Text = styled.span`
  color: ${COLOR.loversWhite};
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.429rem;
`;

interface Props {
  inView: boolean;
}

const FloatingCTA = ({ inView }: Props) => {
  const router = useRouter();
  const { viewingProduct } = useShowcaseContext();
  const { currentIndex, name, contentNo, isPurchase } = viewingProduct;

  const onClickGoToProductDetail = () => {
    const landingUrl = `${KURLY_URL}/goods/${contentNo}`;

    ignoreError(() => {
      amplitudeService.logEvent(
        new SelectEventPageButton({
          url: landingUrl,
          message: name,
          selectionType: 'floating',
          position: String(currentIndex),
          contentId: String(contentNo),
          contentName: name,
        }),
      );
    });

    if (isWebview()) {
      location.href = `${deepLinkUrl.PRODUCT}${contentNo}`;
      return;
    }

    router.push(landingUrl);
  };

  return (
    <FloatingButton inView={inView && isPurchase} disabled={!isPurchase} onClick={onClickGoToProductDetail}>
      <ContentName>{name}</ContentName>
      <Text>보러가기</Text>
    </FloatingButton>
  );
};

export { FloatingCTA };
