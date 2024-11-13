import React from 'react';
import Link, { LinkProps } from 'next/link';

import { checkPhpResource } from '../../utils/checkPhpResource';

export default function NextLink(props: React.PropsWithChildren<LinkProps>) {
  const { href, children } = props;
  const hrefStr = href.toString();
  const isPhpResource = checkPhpResource(hrefStr);
  if (isPhpResource) {
    return <a href={hrefStr}>{children}</a>;
  }
  return <Link {...props}>{children}</Link>;
}
