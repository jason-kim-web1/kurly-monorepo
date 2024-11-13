import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { PropsWithChildrenOnly } from '../../../../shared/interfaces';

const Title = styled.div`
  width: 130px;
  padding: 13px 0 13px 20px;
  background-color: #f7f5f8;
  border-top: 1px solid ${COLOR.bg};
  text-align: left;
  font-weight: 500;
`;

const Text = styled.div`
  padding-left: 25px;
  align-self: center;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid ${COLOR.bg};
`;

const HeaderTitle = ({ children }: PropsWithChildrenOnly) => {
  return <Title>{children}</Title>;
};

const HeaderText = ({ children }: PropsWithChildrenOnly) => {
  return <Text>{children}</Text>;
};

const HeaderMain = ({ children }: PropsWithChildrenOnly) => {
  return <HeaderWrapper>{children}</HeaderWrapper>;
};

export const Header = Object.assign(HeaderMain, { HeaderText, HeaderTitle });
