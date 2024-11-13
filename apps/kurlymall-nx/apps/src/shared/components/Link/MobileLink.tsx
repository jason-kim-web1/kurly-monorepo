import Link from 'next/link';

import { ReactNode } from 'react';

import { getReplaceUrl } from '../../../../util/window/getDevice';

interface Props {
  url: string;
  passHref?: boolean;
  children: ReactNode;
}

export const MobileLink = ({ url, children, passHref }: Props) => (
  <Link href={url} as={getReplaceUrl(url)} passHref={passHref} prefetch={false}>
    {children}
  </Link>
);
