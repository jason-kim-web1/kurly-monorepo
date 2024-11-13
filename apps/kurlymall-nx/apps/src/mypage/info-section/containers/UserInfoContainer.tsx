import styled from '@emotion/styled';

import { useMemo } from 'react';

import { isNull } from 'lodash';

import COLOR from '../../../shared/constant/colorset';

import { MENU_KEY_LIST } from '../../menu-section/constants';

import MenuInfoSection from '../../menu-section/containers/MenuInfoSection';
import { useMenuUpdate } from '../hooks/useMenuUpdate';
import AvailableAmount from '../components/AvailableAmount';
import QuickMenu from '../components/QuickMenu';
import EventBanner from '../components/EventBanner';
import { MAIN_TITLE, QUICKMENU_TITLE } from '../constants';
import { isPC } from '../../../../util/window/getDevice';
import { useAppSelector } from '../../../shared/store';
import GradeBenefit from '../components/GradeBenefit';

import GradeBenefitLoading from '../components/GradeBenefitLoading';
import { useLoadMykurlyInfo } from '../hooks/useLoadMykurlyInfo';
import { CLASS_NAME_DEVICE } from '../../membership/shared/constants';

const Container = styled.div`
  padding-bottom: 20px;
  background-color: ${COLOR.mykurlyBg};
  > div {
    background-color: ${COLOR.kurlyWhite};
  }
  .top-info-section {
    padding: 24px 16px 20px;
  }
  .menu-info-section {
    padding: 0 20px;
  }

  &.pc {
    padding-bottom: 0;
    .top-info-section {
      margin-bottom: 8px;
      padding: 24px 20px 20px;
    }
    .menu-info-section {
      padding: 0 25px;
    }
  }
`;

export default function UserInfoContainer() {
  const { loading, userGradeName, userName, vipInfo, isMyKurlyLoaded, isKurlypayFailure, giftCard, mykurlyBanner } =
    useAppSelector(({ myKurly }) => ({
      loading: myKurly.loading,
      isMyKurlyLoaded: myKurly.isMyKurlyLoaded,
      isKurlypayFailure: myKurly.isKurlypayFailure,
      giftCard: myKurly.giftCard,
      mykurlyBanner: myKurly.mykurlyBanner,
      userGrade: myKurly.userGrade,
      userGradeName: myKurly.userGradeName,
      userName: myKurly.userName,
      vipInfo: myKurly.vipInfo,
    }));

  const { extractMenu, menuInfoMap } = useMenuUpdate();

  const { isTooltipHidden } = useLoadMykurlyInfo();

  const userInfoLoading = useMemo(() => isNull(userGradeName) || isNull(userName), [userGradeName, userName]);

  return (
    <Container className={CLASS_NAME_DEVICE}>
      <div className="top-info-section">
        {loading || !isMyKurlyLoaded || userInfoLoading ? (
          <GradeBenefitLoading />
        ) : (
          <GradeBenefit vipInfo={vipInfo} userGradeName={userGradeName} userName={userName} />
        )}
        <AvailableAmount
          isTooltipHidden={isTooltipHidden}
          isKurlypayFailure={isKurlypayFailure}
          giftCardInfo={giftCard}
          menu={extractMenu(MENU_KEY_LIST.emoney, MENU_KEY_LIST.kurlycash)}
        />
      </div>
      <QuickMenu
        mainTitle={isPC ? QUICKMENU_TITLE : ''}
        menu={extractMenu(MENU_KEY_LIST.order, MENU_KEY_LIST.coupon, MENU_KEY_LIST.pick, MENU_KEY_LIST.favorite)}
      />
      <EventBanner mykurlyBanner={mykurlyBanner} />
      <div className="menu-info-section">
        {new Array(MAIN_TITLE.length).fill(undefined).map((_, index) => (
          <MenuInfoSection
            key={index}
            mainTitle={MAIN_TITLE[index] === MAIN_TITLE[5] ? undefined : MAIN_TITLE[index]}
            isKurlyPayFailure={index === 0 ? isKurlypayFailure : undefined}
            menu={menuInfoMap[MAIN_TITLE[index]]}
          />
        ))}
      </div>
    </Container>
  );
}
