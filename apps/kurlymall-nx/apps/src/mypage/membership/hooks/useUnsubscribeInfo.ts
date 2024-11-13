import { useLegoInfo } from '../../../lego/hooks/useLegoInfo';

export const useUnsubscribeInfo = () => {
  const { isLoading, bottomButtons, tooltipText, legoUrl } = useLegoInfo({
    dataId: '/mypage/membership/benefit',
  });

  const goToMyMembershipButton = bottomButtons?.find((button) => button.id === 'goToMyMembership');
  const unsubscribeActionButton = bottomButtons?.find((button) => button.id === 'unsubscribeAction');

  const goToMyMembershipButtonText = goToMyMembershipButton?.text || '나의 컬리멤버스 정보 바로가기';
  const unsubscribeActionButtonText = unsubscribeActionButton?.text || '해지하기';

  return {
    isLoading,
    tooltipText,
    goToMyMembershipButtonText,
    unsubscribeActionButtonText,
    legoUrl,
  };
};
