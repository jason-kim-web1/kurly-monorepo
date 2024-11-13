import { memo, ReactElement } from 'react';

import Link from 'next/link';

interface ItemLinkProps {
  detailUrl?: string;
  children: ReactElement;
}

const ItemLink = ({ detailUrl, children }: ItemLinkProps) => {
  if (!detailUrl) {
    return <>{children}</>;
  }

  return (
    <Link href={detailUrl} prefetch={false}>
      <a href={detailUrl}>{children}</a>
    </Link>
  );
};

export default memo(ItemLink);
