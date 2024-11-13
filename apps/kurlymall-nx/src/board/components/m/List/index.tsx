import { ReactNode } from 'react';

import { Contents } from '../Contents';

interface BoardListProps {
  children?: ReactNode;
}

const ListMain = ({ children }: BoardListProps) => {
  return <>{children}</>;
};

export const BoardList = Object.assign(ListMain, {
  Contents,
});
