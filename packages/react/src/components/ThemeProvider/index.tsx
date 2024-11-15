import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { vars } from '@thefarmersfront/kpds-css';
import { OverlayProvider } from '@/internal/Overlay/store/OverlayProvider';

type Mode = 'light' | 'dark';

type ThemeContextState = {
  themeMode: Mode;
  setThemeMode(mode: Mode): void;
};

const initialState: ThemeContextState = {
  themeMode: 'light',
  setThemeMode: () => {},
};

export type ThemeProviderProps = {
  defaultMode?: Mode;
};

const themeModeAttribute = 'data-theme';
export const KPDS_PORTAL_ELEMENT_ID = 'kpds-portal';
const FontResource = 'https://res.kurly.com/fonts/pretendard/1.3.9/pretendard-subset.css';

const ThemeContext = createContext<ThemeContextState>(initialState);
export const ThemeProvider = ({ children, defaultMode = 'light' }: PropsWithChildren<ThemeProviderProps>) => {
  const [themeMode, setThemeMode] = useState<Mode>(defaultMode);
  const [isFontLoaded, setFontLoaded] = useState(false);

  const value = useMemo(
    () => ({
      themeMode,
      setThemeMode,
    }),
    [themeMode],
  );

  useEffect(() => {
    const root = document.querySelector(':root');
    if (root) {
      root.setAttribute(themeModeAttribute, themeMode);
    }
  }, [themeMode]);

  useEffect(() => {
    if (isFontLoaded) {
      return;
    }

    setFontLoaded(true);
    const linkElement = document.createElement('link');
    linkElement.setAttribute('rel', 'stylesheet');
    linkElement.setAttribute('type', 'text/css');
    linkElement.setAttribute('href', FontResource);
    document.head.appendChild(linkElement);
  }, []);

  return (
    <ThemeContext.Provider value={value}>
      <OverlayProvider>
        <div style={{ fontFamily: vars.font.body }}>
          <div style={{ zIndex: 1 }} id={KPDS_PORTAL_ELEMENT_ID} />
          {children}
        </div>
      </OverlayProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw Error('useTheme 는 ThemeContext 와 함께 사용되어야 합니다.');
  }
  return context;
};
