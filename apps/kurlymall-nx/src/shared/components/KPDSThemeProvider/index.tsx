import { ThemeProvider } from '@thefarmersfront/kpds-react';

import { useRouter } from 'next/router';

import { PropsWithChildrenOnly } from '../../interfaces';
import { checkIsKPDSPage } from '../../utils/check-kpds-pages';

export default function KPDSThemeProvider({ children }: PropsWithChildrenOnly) {
  const { pathname } = useRouter();

  if (checkIsKPDSPage(pathname)) {
    return <ThemeProvider>{children}</ThemeProvider>;
  }

  return <>{children}</>;
}
