import { useQuery } from '@tanstack/react-query';

import { useAppSelector } from '../../../../shared/store';
import { PERSONAL_BOX, PERSONAL_BOX_AVAILABLE, PERSONAL_BOX_COMPLETE_REQUEST } from '../utils/kurlyPurpleBoxQueryKey';

type RefetchType = boolean | 'always';

import { getPersonalBox, getPersonalBoxAvailable } from '../../../../shared/services/kurlyPurpleBox.service';
import { isDefined } from '../../../../shared/utils/lodash-extends';

//개인 보냉박스 신청 조회
export const usePersonalBox = (refetchOnMount?: 'always') => {
  const { isGuest } = useAppSelector(({ auth }) => auth);
  const option = {
    enabled: !isGuest,
    refetchOnMount: refetchOnMount ?? refetchOnMount,
  };
  return useQuery(PERSONAL_BOX, getPersonalBox, option);
};

//신청가능 지역 여부 조회
export const usePersonalBoxAvailable = () => {
  const { isGuest } = useAppSelector(({ auth }) => auth);
  const currentAddress = useAppSelector(({ shippingAddress }) => shippingAddress.currentAddress);

  const option = {
    enabled: !isGuest && isDefined(currentAddress),
    refetchOnMount: 'always' as RefetchType,
  };

  return useQuery(
    PERSONAL_BOX_AVAILABLE,
    () => {
      if (!currentAddress) {
        return;
      }

      const params = {
        address: currentAddress.roadAddress,
        addressDetail: currentAddress.addressDetail,
      };

      return getPersonalBoxAvailable(params);
    },
    option,
  );
};

//신청완료 페이지 노출 여부
export const useCompleteRequest = () => {
  const { isGuest } = useAppSelector(({ auth }) => auth);
  return useQuery(PERSONAL_BOX_COMPLETE_REQUEST, {
    initialData: false,
    enabled: !isGuest,
  });
};
