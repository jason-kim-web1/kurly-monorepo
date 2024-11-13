import { ReactNode } from 'react';

import dynamic from 'next/dynamic';

const Device = dynamic(() => import('./Device'), { ssr: false });

interface Props {
  children({ webview }: { webview: boolean }): ReactNode;
}

export default function WebviewWrapper({ children }: Props) {
  return <Device>{({ webview }) => children({ webview })}</Device>;
}
