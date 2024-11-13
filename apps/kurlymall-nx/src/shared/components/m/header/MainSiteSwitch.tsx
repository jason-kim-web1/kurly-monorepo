import styled from '@emotion/styled';

import { ChangeEvent, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { motion, useAnimation } from 'framer-motion';

import { ChangedMainSite, MainSite } from '../../../../main/interfaces/MainSection.interface';
import useWindowSize from '../../../hooks/useWindowSize';
import AmplitudeSiteSwitchEvent from '../../../amplitude/component/AmplitudeSiteSwitchEvent';
import { transientOptions } from '../../../styles/motions/transientOptions';
import { getMainSwitchVariants } from '../../../styles/motions/main/getMainSwitchVariants';
import { redirectTo } from '../../../reducers/page';
import { USER_MENU_PATH, getPageUrl } from '../../../constant';
import useSeasonalThemeWithEventConfig from '../../../hooks/useSeasonalThemeWithEventConfig';

const Container = styled(motion.div, transientOptions)<{ $backgroundColor: string }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  height: 28px;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  border-radius: 14px;
`;

const Switch = styled(motion.label)<{ color: string; selected: boolean }>`
  display: flex;
  justify-content: center;
  width: 100%;
  z-index: 1;
  color: ${({ color }) => color};
  font-size: 13px;
  font-weight: ${({ selected }) => (selected ? 600 : 400)};
  font-stretch: normal;
  font-style: normal;
  line-height: 1.69;
  letter-spacing: normal;
  padding: 0 10px 0 13px;
  word-break: keep-all;
  &:last-of-type {
    padding: 0 13px;
  }
  span {
    font-size: 13px;
    color: black;
  }
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
`;

const Slider = styled(motion.span, transientOptions)<{ site: MainSite; $backgroundColor: string; size: number }>`
  position: absolute;
  top: 0;
  left: ${({ site }) => (site === 'MARKET' ? '0px' : 'unset')};
  right: 0;
  bottom: 0;
  width: ${({ size }) => size}px;
  height: 28px;
  border-radius: 14px;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
`;

const FullSiteName: Record<MainSite, string> = {
  MARKET: '마켓컬리',
  BEAUTY: '뷰티컬리',
} as const;

const ShortSiteName: Record<MainSite, string> = {
  MARKET: '마켓',
  BEAUTY: '뷰티',
} as const;

const RESPONSIVE_WIDTH = 320;

interface Props {
  site: MainSite;
  changedSite: ChangedMainSite;
}

export default function MainSiteSwitch({ site, changedSite }: Props) {
  const { theme } = useSeasonalThemeWithEventConfig();
  const { backgroundColor, inactiveBackgroundColor, fontColor, inactiveFontColor } = theme[site].switch;
  const controls = useAnimation();

  const { width } = useWindowSize();
  const dispatch = useDispatch();

  const isSmallWidth = width > 0 && width <= RESPONSIVE_WIDTH;
  const siteName = isSmallWidth ? ShortSiteName : FullSiteName;
  const sliderSize = isSmallWidth ? 50 : 71;

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === 'BEAUTY') {
      dispatch(redirectTo({ url: getPageUrl(USER_MENU_PATH.beautyHome) }));
      return;
    }
    dispatch(redirectTo({ url: getPageUrl(USER_MENU_PATH.home) }));
  };

  const isMarket = site === 'MARKET';
  const isBeauty = site === 'BEAUTY';
  const { marketLabelVariant, beautyLabelVariant, sliderVariant, backgroundColorVariant } = getMainSwitchVariants(
    changedSite,
    isSmallWidth,
    theme,
  );

  useEffect(() => {
    if (changedSite === 'NOTCHANGED') return;
    void controls.start('animate');
  }, [changedSite, controls]);

  return (
    <Container
      initial="initial"
      animate={controls}
      $backgroundColor={inactiveBackgroundColor}
      variants={backgroundColorVariant}
    >
      <Switch selected={isMarket} color={isMarket ? fontColor : inactiveFontColor} variants={marketLabelVariant}>
        <AmplitudeSiteSwitchEvent site="MARKET" type={'top'}>
          <input checked={isMarket} type="radio" name="main-site-switch" value="MARKET" onChange={handleChange} />
        </AmplitudeSiteSwitchEvent>
        {siteName.MARKET}
      </Switch>
      <Switch selected={isBeauty} color={isBeauty ? fontColor : inactiveFontColor} variants={beautyLabelVariant}>
        <AmplitudeSiteSwitchEvent site="BEAUTY" type={'top'}>
          <input checked={isBeauty} type="radio" name="main-site-switch" value="BEAUTY" onChange={handleChange} />
        </AmplitudeSiteSwitchEvent>
        {siteName.BEAUTY}
      </Switch>
      <Slider
        className="main-site-switch-slider"
        site={site}
        $backgroundColor={backgroundColor}
        size={sliderSize}
        variants={sliderVariant}
      />
    </Container>
  );
}
