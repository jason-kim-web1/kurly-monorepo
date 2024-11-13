import styled from '@emotion/styled';

import { Menu } from '../../content/total';

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 44px 0;
  border-bottom: 1px solid #eee;
  line-height: 1.5;

  &:first-of-type {
    border-top: 1px solid #eee;
  }
`;

const Link = styled.a`
  min-width: 260px;
  vertical-align: middle;
`;

const Title = styled.h3`
  display: block;
  font-weight: 600;
  font-size: 27px;
  letter-spacing: -1px;
  color: #282828;
`;

const Text = styled.p`
  margin: 1px 0 0 3px;
  font-size: 14px;
  color: #875eb3;
`;

const Icon = styled.img`
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-top: -2px;
  vertical-align: middle;
`;

const Info = styled.p`
  font-weight: 300;
  font-size: 16px;
  line-height: 28px;
  letter-spacing: -0.7px;
  word-break: keep-all;
  vertical-align: top;
`;

interface Props {
  menu: Menu;
}

export default function BenefitMenu({ menu }: Props) {
  const { title, text, icon, info } = menu;

  return (
    <Container>
      <Link href="#none">
        <Title>{title}</Title>
        <Text>
          {text}
          <Icon src={icon} alt="" />
        </Text>
      </Link>
      <Info>{info}</Info>
    </Container>
  );
}
