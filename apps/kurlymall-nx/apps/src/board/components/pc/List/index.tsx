import { PropsWithChildrenOnly } from '../../../../shared/interfaces';
import { Contents } from '../Contents';
import { Header } from './ListHeader';

const ListMain = ({ children }: PropsWithChildrenOnly) => {
  return <>{children}</>;
};

export const BoardList = Object.assign(ListMain, {
  Header,
  Contents,
});
