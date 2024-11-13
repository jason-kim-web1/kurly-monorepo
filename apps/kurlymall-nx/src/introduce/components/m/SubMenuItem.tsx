import { useMemo } from 'react';

import { useRouter } from 'next/router';

import Link from 'next/link';

import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';

import { DEFAULT_ACTIVE_NAME } from '../../constants';
import { SubMenuLists } from '../../interfaces';

const MenuItem = styled.div`
  margin-top: 20px;

  &:first-of-type {
    margin-top: 15px;
  }
`;

const InnerLink = styled.a`
  &:hover > :not(.active) {
    border-bottom: 1px solid ${COLOR.kurlyPurple};
    color: ${COLOR.kurlyPurple};
  }
`;

const Text = styled.span`
  &::before {
    display: inline-block;
    padding-right: 2px;
    content: '-';
  }
  &.active {
    margin-left: -8px;
    padding: 4px 8px;
    border-radius: 10px;
    font-weight: 700;
    background-color: ${COLOR.gradeToolTipBorder};
    color: ${COLOR.kurlyPurple};
  }
`;

interface Props {
  items: SubMenuLists[];
  onClick: (name: string) => void;
}

export default function SubMenuItem({ items, onClick }: Props) {
  const router = useRouter();

  const activeName = useMemo(() => {
    const activeOption = items.find((it) => router.pathname.startsWith(`/m${it.url}`));

    if (!activeOption) {
      return DEFAULT_ACTIVE_NAME;
    }
    return activeOption.name;
  }, [items, router.pathname]);

  return (
    <>
      {items.map(({ name, url }) => (
        <MenuItem key={name}>
          <Link href={url} passHref>
            <InnerLink href={url} onClick={() => onClick(name)}>
              <Text className={activeName === name ? 'active' : ''}>{name}</Text>
            </InnerLink>
          </Link>
        </MenuItem>
      ))}
    </>
  );
}
