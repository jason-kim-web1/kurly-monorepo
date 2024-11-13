import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { Menu } from '../interfaces';
import COLOR from '../../../shared/constant/colorset';
import MainTitle from '../components/MainTitle';
import MenuInfo from '../components/MenuInfo';
import { isPC } from '../../../../util/window/getDevice';
import { useMenuActive } from '../hooks/useMenuActive';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: ${isPC ? '12px 0 16px' : '16px 0 17px'};
  border-top: 1px solid ${COLOR.kurlyGray200};

  ${!isPC &&
  css`
    &:first-of-type {
      border-top: 0;
    }
  `}
`;

interface Props {
  mainTitle?: string;
  menu: Menu[];
  isKurlyPayFailure?: boolean;
}

export default function MenuInfoSection({ mainTitle, menu, isKurlyPayFailure }: Props) {
  const { activeName } = useMenuActive(menu);

  if (!menu || menu.length <= 0) {
    return null;
  }

  return (
    <Container>
      {mainTitle && <MainTitle title={mainTitle} />}
      {menu.map(({ title, text, link, badge }) => (
        <MenuInfo
          key={title}
          title={title}
          text={text}
          link={link}
          badge={badge}
          isKurlyPayFailure={isKurlyPayFailure}
          isActive={isPC ? activeName === title : false}
        />
      ))}
    </Container>
  );
}
