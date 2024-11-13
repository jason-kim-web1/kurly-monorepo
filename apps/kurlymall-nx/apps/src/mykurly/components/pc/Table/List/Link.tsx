import { PropsWithChildren } from 'react';
import Link from 'next/link';

interface TableLinkProps {
  href: string;
}

export default function TableLink({ children, href }: PropsWithChildren<TableLinkProps>) {
  return (
    <Link href={href} passHref>
      <a href={href}>{children}</a>
    </Link>
  );
}
