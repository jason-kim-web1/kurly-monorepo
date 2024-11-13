import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { MobileLink } from '../../../../shared/components/Link/MobileLink';

const Container = styled.div`
  padding: 0 16px;
  margin-top: 8px;
`;

const LinkMore = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: 48px;
  border: 1px solid ${COLOR.mykurlyBg};
  border-radius: 4px;
  background-color: ${COLOR.mykurlyBg};
  text-align: center;
  span {
    position: relative;
    &:after {
      position: absolute;
      content: '';
      background: url('https://res.kurly.com/mobile/service/main/1903/ico_more_link.png') no-repeat 100%; // TODO svg 적용
      background-size: 18px 18px;
      width: 18px;
      height: 16px;
    }
  }
`;

interface Props {
  href: string;
  name: string;
  selectMore(): void;
}

export default function ShowAllProductsButton({ href, name, selectMore }: Props) {
  return (
    <Container>
      <MobileLink url={href} passHref>
        <LinkMore href={href} onClick={() => selectMore()}>
          <span>{name}</span>
        </LinkMore>
      </MobileLink>
    </Container>
  );
}
