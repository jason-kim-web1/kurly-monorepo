import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import { Menu } from '../interfaces';

export const useMenuActive = (menu: Menu[]) => {
  const { pathname } = useRouter();

  const [activeName, setActiveName] = useState('');

  useEffect(() => {
    const activeOption = menu.find((it) => {
      if (it.link) {
        return pathname.startsWith(it.link);
      }
      return false;
    });

    if (activeOption) {
      setActiveName(activeOption.title);
    }
  }, [menu, pathname]);

  return { activeName };
};
