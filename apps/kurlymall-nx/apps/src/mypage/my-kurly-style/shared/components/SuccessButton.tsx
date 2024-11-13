import { css } from '@emotion/react';

import { useDispatch } from 'react-redux';

import { isPC } from '../../../../../util/window/getDevice';

import Button from '../../../../shared/components/Button/Button';

import MobileFooter from '../../../../shared/components/layouts/MobileFooter';
import { redirectTo } from '../../../../shared/reducers/page';
import { getPageUrl, USER_MENU_PATH } from '../../../../shared/constant';
import { amplitudeService } from '../../../../shared/amplitude';
import { SelectSite } from '../../../../shared/amplitude/events/mykurly-style/SelectSite';

const styles = {
  footer: css`
    ${isPC
      ? css`
          display: flex;
          margin: 30px auto 0;
          width: 374px;
          justify-content: space-between;
          position: relative;
          padding: 0;
          + div {
            display: none;
          }
        `
      : css`
          column-gap: 8px;
        `}
  `,

  button: css`
    ${!isPC &&
    css`
      width: 100%;
    `}
  `,
};

export default function SuccessButton() {
  const dispatch = useDispatch();

  const goToLink = (link: { uri: string; name: string }, selectButton: 'market' | 'beauty') => {
    void amplitudeService.logEvent(new SelectSite({ siteInfo: selectButton }));
    dispatch(redirectTo({ url: getPageUrl(link) }));
  };

  return (
    <>
      <MobileFooter css={styles.footer}>
        <Button
          text="마켓컬리 보기"
          width={183}
          height={isPC ? 56 : 52}
          radius={isPC ? 3 : 6}
          theme="tertiary"
          onClick={() => goToLink(USER_MENU_PATH.home, 'market')}
          css={styles.button}
        />
        <Button
          text="뷰티컬리 보기"
          width={183}
          height={isPC ? 56 : 52}
          radius={isPC ? 3 : 6}
          onClick={() => goToLink(USER_MENU_PATH.beautyHome, 'beauty')}
          css={styles.button}
        />
      </MobileFooter>
    </>
  );
}
