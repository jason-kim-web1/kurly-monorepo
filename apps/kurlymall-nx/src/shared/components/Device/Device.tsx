import { ReactNode } from 'react';

import { isWebview } from '../../../../util/window/getDevice';

interface Props {
  children({ webview }: { webview: boolean }): ReactNode;
}
export default function Device({ children }: Props) {
  return <>{children({ webview: isWebview() })}</>;
}
