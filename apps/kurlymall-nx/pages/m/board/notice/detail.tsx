import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { ParsedUrlQuery } from 'querystring';

import Alert from '../../../../src/shared/components/Alert/Alert';

import { BOARD_PATH, getPageUrl } from '../../../../src/shared/constant';
import { redirectTo } from '../../../../src/shared/reducers/page';

export default function NoticeDetailGateway() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { no } = router.query as ParsedUrlQuery & { no: string };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (!no) {
      Alert({
        text: '존재하지 않거나, 열람 할 수 없는 게시물 입니다.',
      }).then(() => {
        router.back();
      });
    } else {
      dispatch(
        redirectTo({
          url: `${getPageUrl(BOARD_PATH.noticeDetail)}/${no}`,
          replace: true,
        }),
      );
    }
  }, [dispatch, no, router]);

  return null;
}
