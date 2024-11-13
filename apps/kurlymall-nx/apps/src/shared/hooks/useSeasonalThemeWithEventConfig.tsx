import { mainSiteThemeMap } from '../../main/theme';
import { Asset } from '../interfaces/EventConfig';
import convertWebHexColorCode from '../utils/convert-web-hex-color-code';
import { useEventConfigQuery } from './useEventConfigQuery';

interface SwitchTheme {
  backgroundColor: string;
  inactiveBackgroundColor: string;
  fontColor: string;
  inactiveFontColor: string;
}

interface Theme {
  logo: Asset | null;
  switch: SwitchTheme;
}

export interface SeasonalEventConfigTheme {
  MARKET: Theme;
  BEAUTY: Theme;
}

/**
 *
 * @returns eventConfig API을 조회하여 시즈널 이벤트 리소스 값이 있으면 그 값을 반환하고, 없으면 default theme값을 반환합니다.
 */
const useSeasonalThemeWithEventConfig = () => {
  const result = useEventConfigQuery();
  const { data } = result;
  const marketSwitch = mainSiteThemeMap.MARKET.mainSwitch;
  const beautySwitch = mainSiteThemeMap.BEAUTY.mainSwitch;

  const getThemeColorOrDefault = (eventTheme: string | undefined, defaultTheme: string): string => {
    return (eventTheme && convertWebHexColorCode(eventTheme)) || defaultTheme;
  };

  const theme: SeasonalEventConfigTheme = {
    //현재 사이트가 마켓일때 사용하는 theme
    MARKET: {
      logo: data?.seasonalEvents?.logo?.marketAsset || null,
      switch: {
        backgroundColor: getThemeColorOrDefault(
          data?.seasonalEvents?.segmentedControl?.marketControlBackgroundColor,
          marketSwitch.switchColor,
        ),
        inactiveBackgroundColor: getThemeColorOrDefault(
          data?.seasonalEvents?.segmentedControl?.marketBackgroundColor,
          marketSwitch.switchBackgroundColor,
        ),
        fontColor: getThemeColorOrDefault(
          data?.seasonalEvents?.segmentedControl?.marketSelectedFontColor,
          marketSwitch.activeFontColor,
        ),
        inactiveFontColor: getThemeColorOrDefault(
          data?.seasonalEvents?.segmentedControl?.marketDeselectedFontColor,
          marketSwitch.inactiveFontColor,
        ),
      },
    },
    //현재 사이트가 뷰티일때 사용하는 theme
    BEAUTY: {
      logo: data?.seasonalEvents?.logo?.beautyAsset || null,
      switch: {
        backgroundColor: getThemeColorOrDefault(
          data?.seasonalEvents?.segmentedControl?.beautyControlBackgroundColor,
          beautySwitch.switchColor,
        ),
        inactiveBackgroundColor: getThemeColorOrDefault(
          data?.seasonalEvents?.segmentedControl?.beautyBackgroundColor,
          beautySwitch.switchBackgroundColor,
        ),
        fontColor: getThemeColorOrDefault(
          data?.seasonalEvents?.segmentedControl?.beautySelectedFontColor,
          beautySwitch.activeFontColor,
        ),
        inactiveFontColor: getThemeColorOrDefault(
          data?.seasonalEvents?.segmentedControl?.beautyDeselectedFontColor,
          beautySwitch.inactiveFontColor,
        ),
      },
    },
  };

  return { theme, ...result };
};

export default useSeasonalThemeWithEventConfig;
