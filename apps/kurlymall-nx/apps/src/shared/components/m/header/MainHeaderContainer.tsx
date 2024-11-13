import styled from '@emotion/styled';

import { motion, useAnimation } from 'framer-motion';

import { useEffect, useState } from 'react';

import MainSiteSwitch from './MainSiteSwitch';
import { useAppSelector } from '../../../store';
import DeliveryLocationContainer from '../../../../header/containers/m/DeliveryLocationContainer';
import HeaderButtons from '../../layouts/HeaderButtons';
import HeaderLogo from './HeaderLogo';
import CartButtonContainer from '../../../containers/m/CartButtonContainer';
import { mainHeaderVariants } from '../../../styles/motions/main/header';
import { transientOptions } from '../../../styles/motions/transientOptions';
import { mainSiteThemeMap } from '../../../../main/theme';
import { MainSite } from '../../../../main/interfaces/MainSection.interface';
import useSeasonalThemeWithEventConfig from '../../../hooks/useSeasonalThemeWithEventConfig';
import SeasonalLogo from './SeasonalLogo';

const Container = styled(motion.div, transientOptions)<{ $backgroundColor: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  padding-left: 16px;
  min-height: 44px;
`;

const Logo = styled.div`
  display: flex;
  width: 21%;
`;

const Buttons = styled(HeaderButtons)`
  position: relative;
  display: flex;
  justify-content: end;
  width: 26%;
`;

type IconColor = 'white' | 'black';

const mainSiteColorMap: {
  [key in MainSite]: {
    logoColor: string;
    iconColor: IconColor;
  };
} = {
  MARKET: {
    logoColor: mainSiteThemeMap.MARKET.logoColor,
    iconColor: 'white',
  },
  BEAUTY: {
    logoColor: mainSiteThemeMap.BEAUTY.logoColor,
    iconColor: 'black',
  },
};

export default function MainHeaderContainer() {
  const { site, theme, changedSite } = useAppSelector(({ main }) => ({
    site: main.site,
    theme: main.theme,
    changedSite: main.changedSite,
  }));
  const { theme: seasonalTheme } = useSeasonalThemeWithEventConfig();

  const controls = useAnimation();

  const [logoColor, setLogoColor] = useState<string>();
  const [iconColor, setIconColor] = useState<IconColor>();

  const { primaryColor } = theme;
  const { backgroundColorVariant } = mainHeaderVariants[changedSite];
  const seasonalLogo = seasonalTheme[site].logo;

  const setColor = (siteMap: MainSite) => {
    setLogoColor(mainSiteColorMap[siteMap].logoColor);
    setIconColor(mainSiteColorMap[siteMap].iconColor);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (changedSite === 'NOTCHANGED') {
      setColor(site);
    } else {
      const changedBeauty = changedSite === 'BEAUTY';

      setColor(changedBeauty ? 'MARKET' : 'BEAUTY');
      timeout = setTimeout(() => {
        setColor(changedBeauty ? 'BEAUTY' : 'MARKET');
      }, 300);
    }

    return () => clearTimeout(timeout);
  }, [changedSite, site]);

  useEffect(() => {
    if (changedSite === 'NOTCHANGED') return;
    void controls.start('animate');
  }, [changedSite, controls]);

  return (
    <Container initial="initial" animate={controls} $backgroundColor={primaryColor} variants={backgroundColorVariant}>
      <Logo>
        {seasonalLogo ? (
          <SeasonalLogo type={seasonalLogo.type} url={seasonalLogo.url} />
        ) : (
          <HeaderLogo color={logoColor} />
        )}
      </Logo>
      <MainSiteSwitch site={site} changedSite={changedSite} />
      {iconColor && (
        <Buttons position="right">
          <DeliveryLocationContainer color={iconColor} />
          <CartButtonContainer color={iconColor} />
        </Buttons>
      )}
    </Container>
  );
}
