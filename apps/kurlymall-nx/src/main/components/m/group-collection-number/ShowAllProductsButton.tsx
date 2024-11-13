import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { MobileLink } from '../../../../shared/components/Link/MobileLink';
import { multiMaxLineText } from '../../../../shared/utils';
import { ArrowRight } from '../../../../shared/icons';

const Container = styled.div`
  margin-top: 16px;
  padding: 0 16px;
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
  color: ${COLOR.benefitGray};
`;

const Name = styled.span`
  position: relative;
  max-width: 110px;
  ${multiMaxLineText(1)}
`;

const Text = styled.span`
  margin: 0 8px 0 5px;
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
          <Name>{name}</Name>
          <Text>전체보기</Text>
          <ArrowRight stroke={COLOR.kurlyBlack} width={18} height={18} />
        </LinkMore>
      </MobileLink>
    </Container>
  );
}
