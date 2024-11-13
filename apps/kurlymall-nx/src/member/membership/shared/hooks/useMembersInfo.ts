import { useRouter } from 'next/router';
import { head } from 'lodash';

import { useLegoInfo } from '../../../../lego/hooks/useLegoInfo';

export const useMembersInfo = () => {
  const { isReady, asPath } = useRouter();

  const dataId = isReady ? head(asPath.split('?')) : undefined;

  const { isLoading, bottomButtons, legoUrl, tooltipText } = useLegoInfo({
    dataId,
  });

  const subscribedButton = bottomButtons?.find((button) => button.id === 'subscribed');
  const unSubscribedButton = bottomButtons?.find((button) => button.id === 'unsubscribed');

  const subscribedButtonText = subscribedButton?.text || '나의 컬리멤버스 정보 확인하기';
  const unSubscribedButtonText = unSubscribedButton?.text || '컬리멤버스 시작하기';

  const tooltipButtonText = tooltipText || '무료이용권 사용 가능!';

  return { isLoading, subscribedButtonText, unSubscribedButtonText, legoUrl, tooltipButtonText };
};
