import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import useFetchContent from '../../../marketing/hooks/useFetchContent';
import Alert from '../../../shared/components/Alert/Alert';
import { USER_MENU_PATH } from '../../../shared/constant';
import { redirectTo } from '../../../shared/reducers/page';
import { VipLevelType } from '../../shared/constants';
import { VipContentTypeKey } from '../shared/type';

type VIPContentProps = { vipLevel: VipLevelType };

const useVIPContent = ({ vipLevel }: VIPContentProps) => {
  const queryKey = ['member', 'lounge', vipLevel];
  const queryMetaKey = [...queryKey, 'meta'];

  const dispatch = useDispatch();

  const { data, tabs, error } = useFetchContent<VipContentTypeKey>({
    userLevel: vipLevel,
    queryKey,
    queryMetaKey,
    filePath: 'member-lounges',
  });

  useEffect(() => {
    if (error) {
      Alert({
        text: (error as Error).message || '콘텐츠를 불러오는 중에 문제가 발생했습니다.',
      }).then(() => {
        dispatch(redirectTo({ url: USER_MENU_PATH.home.uri }));
      });
    }
  }, [error, dispatch]);

  return { data, tabs };
};

export default useVIPContent;
