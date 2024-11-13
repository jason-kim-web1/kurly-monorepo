import { ReactNode } from 'react';

import { Header } from './Header';
import View from './View';

interface BoardListProps {
  children?: ReactNode;
}

const DetailMain = ({ children }: BoardListProps) => {
  return <div>{children}</div>;
};

export const BoardDetail = Object.assign(DetailMain, {
  Header,
  View,
});
