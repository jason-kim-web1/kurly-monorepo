import { useMemo } from 'react';

interface Props {
  isTabClick: boolean;
  isScrollDown: boolean;
}

export default function useDeliveryTabHidden({ isTabClick, isScrollDown }: Props) {
  const isDeliveryTabHide = useMemo(() => {
    // 탭을 클릭 한 경우에는 경우 숨기지 않음
    if (isTabClick) {
      return false;
    }

    // HEADER_HEIGHT 보다 큰데 스크롤 방향이 down 이면 숨김
    return isScrollDown;
  }, [isTabClick, isScrollDown]);

  return {
    isDeliveryTabHide,
  };
}
