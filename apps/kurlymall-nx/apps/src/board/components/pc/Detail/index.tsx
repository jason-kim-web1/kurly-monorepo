import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { Header } from './Header';
import View from './View';
import BackButton from './BackButton';
import { PropsWithChildrenOnly } from '../../../../shared/interfaces';

const DetailWrapper = styled.div`
  margin-top: 20px;
  border-top: 2px solid ${COLOR.kurlyGray800};
  color: ${COLOR.kurlyGray800};
`;

const DetailMain = ({ children }: PropsWithChildrenOnly) => {
  return <DetailWrapper>{children}</DetailWrapper>;
};

export const BoardDetail = Object.assign(DetailMain, {
  Header,
  View,
  BackButton,
});
