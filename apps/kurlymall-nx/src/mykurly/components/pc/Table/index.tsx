import { PropsWithChildrenOnly } from '../../../../shared/interfaces';
import { Header } from './Header';
import { List } from './List';

const TableMain = ({ children }: PropsWithChildrenOnly) => {
  return <>{children}</>;
};

export const MyKurlyTable = Object.assign(TableMain, {
  Header,
  List,
});
