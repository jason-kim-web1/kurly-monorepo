import { useQuery, useQueryClient } from '@tanstack/react-query';
import { KurlyWebSdkError, Notification } from '@thefarmersfront/kurly-web-sdk';

import { getMemberDeviceAgreement } from '../services';
import { MemberDeviceAgreement } from '../interfaces';

const MEMBER_DEVICE_AGREEMENT_QUERY_KEY = ['member', 'device-agreement'];

const handleSdkError =
  <T>(returnValue: T) =>
  (err: unknown) => {
    if (err instanceof KurlyWebSdkError) {
      switch (err.errorType) {
        case 'APP_VERSION':
        case 'NOT_SUPPORTED':
          alert('지원하지 않는 환경입니다. 최신버전의 앱을 사용 해 주세요.');
          break;
        default:
          alert('알 수 없는 오류가 발생하였습니다. 확인 후 다시 시도 해 주세요.');
      }
      return returnValue;
    }
    throw err;
  };

export default function usePushAgreement(): {
  isLoading: boolean;
  deviceAgreement?: MemberDeviceAgreement;
  setDeviceNotificationOn: () => Promise<boolean>;
  registerMarketingReceivePermission: () => Promise<boolean>;
} {
  const queryClient = useQueryClient();

  const { isLoading, data: deviceAgreement } = useQuery(MEMBER_DEVICE_AGREEMENT_QUERY_KEY, getMemberDeviceAgreement, {
    retry: false,
  });

  const setDeviceNotificationOn = async () => {
    const result = await Notification.setDeviceNotificationOn().catch(handleSdkError({ success: false }));
    if (result.success) {
      await queryClient.invalidateQueries(MEMBER_DEVICE_AGREEMENT_QUERY_KEY);
    }
    return result.success;
  };

  const registerMarketingReceivePermission = async () => {
    const result = await Notification.registerMarketingReceivePermission(true).catch(handleSdkError(false));
    if (result) {
      await queryClient.invalidateQueries(MEMBER_DEVICE_AGREEMENT_QUERY_KEY);
    }
    return result;
  };

  return {
    isLoading,
    deviceAgreement: deviceAgreement ?? undefined,
    setDeviceNotificationOn,
    registerMarketingReceivePermission,
  };
}
