import styled from '@emotion/styled';
import { useMemo } from 'react';
import { useRouter } from 'next/router';

import COLOR from '../../../../shared/constant/colorset';
import deepLinkUrl from '../../../../shared/constant/deepLink';
import Button from '../../../../shared/components/Button/Button';
import { USER_MENU_PATH } from '../../../../shared/constant/common-path';
import { KURLY_EVENT_URL, KURLY_URL } from '../../../../shared/configs/config';
import { LoadingSpinner } from '../../../../shared/components/LoadingSpinner';
import useAppLink from '../../../../shared/hooks/useAppLink';

const Wrapper = styled.div`
  margin-top: 30px;
  border-top: 1px solid ${COLOR.kurlyGray150};
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 24px auto;
`;

const OpenButton = styled.button`
  margin-top: 22px;
  color: ${COLOR.kurlyGray600};
`;

const SpinnerWrapper = styled(OpenButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

function AppLink() {
  const { query } = useRouter();

  const url = (query.internalUrl || query.externalUrl || query.return_url || query.returnUrl) as string | undefined;

  const uriScheme = useMemo(() => {
    const defaultScheme = deepLinkUrl.HOME;
    if (!url) {
      return defaultScheme;
    }

    const isEventContainer = ['campaign', 'lego', 'clay'].find((path) => url.includes(`${KURLY_EVENT_URL}/${path}/`));

    const kurlyEventHost = `${KURLY_URL}/shop/event`;
    const isV2EventContainer =
      url.includes(`${kurlyEventHost}/kurlyEvent.php`) || url.includes(`${kurlyEventHost}/kurlyEventV2.php`);

    const productPrefix = '/goods/';

    if (isEventContainer || isV2EventContainer) {
      return `kurly://open?url=${encodeURIComponent(url)}`;
    } else if (url.includes(productPrefix)) {
      let goodsNo = '';
      let testUrl = url;
      try {
        const urlComponent = new URL(url);

        testUrl = urlComponent.pathname;
      } catch (err) {
        console.error(err);
      }

      goodsNo = testUrl?.split(productPrefix)?.length === 2 ? testUrl?.split(productPrefix)[1] : '';

      if (!!Number(goodsNo)) {
        return `${deepLinkUrl.PRODUCT}${goodsNo}`;
      }
    } else if (url.includes(USER_MENU_PATH.mykurly.uri)) {
      return deepLinkUrl.MYKURLY;
    }

    return defaultScheme;
  }, [url]);

  const { moveToStore, onClickOpenApp, isUriSchemeChecking } = useAppLink(uriScheme);

  return (
    <Wrapper>
      <ButtonWrapper>
        <Button onClick={moveToStore} width={187} height={56} radius={100} text="컬리 앱 설치하기" />
        {isUriSchemeChecking ? (
          <SpinnerWrapper>
            <div>컬리 앱으로 가는 중...</div>
            <LoadingSpinner width={15} height={15} stroke={COLOR.kurlyGray600} />
          </SpinnerWrapper>
        ) : (
          <OpenButton onClick={onClickOpenApp}>컬리 앱에서 계속하기</OpenButton>
        )}
      </ButtonWrapper>
    </Wrapper>
  );
}

export default AppLink;
