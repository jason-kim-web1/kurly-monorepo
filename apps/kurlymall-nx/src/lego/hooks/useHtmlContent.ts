import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';

import useLoadKakao from '../../shared/hooks/useLoadKakao';
import { useAppSelector } from '../../shared/store';
import { useScreenName } from '../../shared/hooks';
import { ScreenName } from '../../shared/amplitude';
import Alert from '../../shared/components/Alert/Alert';
import { redirectTo } from '../../shared/reducers/page';
import { USER_MENU_PATH } from '../../shared/constant';
import { createFileUrl, LegoEventTracker } from '../utils';
import { ENVIRONMENT, isProduction } from '../../shared/configs/config';
import { ExtendedWindow, IContent } from '../types';
import { isIos, isWebview } from '../../../util/window/getDevice';
import { APP_DEVICE, DEVICE } from '../constants';
import httpClient from '../../shared/configs/http-client';

const initialContent = {
  html: '',
  scripts: [],
  styles: [],
};

interface Props {
  isPC: boolean;
  legoUrl?: string;
  isLoading: boolean;
}

export const useHtmlContent = ({ isPC, legoUrl, isLoading }: Props) => {
  useLoadKakao();

  const [content, setContent] = useState<IContent>(initialContent);

  const dispatch = useDispatch();

  const { accessToken, isGuest } = useAppSelector((state) => ({
    accessToken: state.auth.accessToken,
    isGuest: state.auth.isGuest,
  }));

  useScreenName(ScreenName.EVENT_LIST);

  useEffect(() => {
    if (!isLoading && !legoUrl) {
      Alert({ text: '페이지를 찾을 수 없습니다.', showCancelButton: false }).then(() => {
        dispatch(
          redirectTo({
            url: USER_MENU_PATH.home.uri,
          }),
        );
      });
    }
  }, [isLoading, legoUrl, dispatch]);

  useEffect(() => {
    try {
      if (legoUrl && accessToken) {
        const url = createFileUrl({ isPC, environment: ENVIRONMENT, path: legoUrl });

        axios
          .get(url)
          .then((response) => {
            const data = response.data;

            if (data) {
              /** www-v2 의존 코드 대응 START */
              // TODO 추후 legoland에서 window 객체 변수들 안 쓰도록 수정하고 난 뒤, 에디터 코드 & 이벤트 페이지 재발행 후 삭제 가능
              (window as ExtendedWindow).webStatus = (window as ExtendedWindow).webStatus || {
                appCheck: isWebview(),
                appDevice: isWebview() ? (isIos ? APP_DEVICE.ios : APP_DEVICE.android) : false,
                is_sess: !isGuest,
                is_release_build: isProduction(),
                device: isPC ? DEVICE.pc : DEVICE.mobile,
              };

              (window as ExtendedWindow).kurlyApi = (window as ExtendedWindow).kurlyApi || httpClient;

              (window as ExtendedWindow)._oldAlert = (window as ExtendedWindow)._oldAlert || window.alert;

              (window as ExtendedWindow).kurlyTracker =
                (window as ExtendedWindow).kurlyTracker || new LegoEventTracker({ skip: false });
              /** www-v2 의존 코드 대응 END */

              const newContent: IContent = { ...initialContent };

              const legoHtml = document.createElement('html');

              legoHtml.innerHTML = data;

              newContent.html = legoHtml.getElementsByTagName('body')[0].innerHTML;

              newContent.styles = Array.prototype.slice
                .call(legoHtml.getElementsByTagName('style'))
                .map((style) => style.innerText);

              newContent.scripts = Array.prototype.slice
                .call(legoHtml.getElementsByTagName('script'))
                .map((script) => script.innerText.replace('this.setHeaderTitle(),', ''));

              setContent(newContent);
            }
          })
          .catch((e: AxiosError) => {
            if (e.response?.status === 404) {
              Alert({ text: '페이지를 찾을 수 없습니다.', showCancelButton: false }).then(() => {
                dispatch(
                  redirectTo({
                    url: USER_MENU_PATH.home.uri,
                  }),
                );
              });
            } else {
              throw e;
            }
          });
      }
    } catch (err) {
      console.error(err);

      Alert({ text: '일시적인 오류가 발생했습니다. 고객센터에 문의해주세요.', showCancelButton: false }).then(() => {
        dispatch(
          redirectTo({
            url: USER_MENU_PATH.home.uri,
          }),
        );
      });
    }
  }, [isPC, legoUrl, accessToken, isGuest, dispatch]);

  return { content };
};
