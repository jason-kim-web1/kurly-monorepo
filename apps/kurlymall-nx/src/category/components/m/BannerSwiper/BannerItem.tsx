import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import Link from 'next/link';

import { CategoryBanner } from '../../../../shared/reducers/category';

interface Props extends Omit<CategoryBanner, 'mobileImageUrl'> {
  onClick: () => void;
}

const Container = styled.div`
  padding: ${vars.spacing.$20} ${vars.spacing.$16};
  height: 88px;
`;

const MainText = styled.p`
  font-size: ${vars.fontSize.$16};
  font-weight: ${vars.fontWeight.$semibold};
  line-height: ${vars.lineHeight.$16};
  color: ${vars.color.$white};
`;

const SubText = styled.p`
  margin-top: ${vars.spacing.$6};
  color: ${vars.color.$white};
  font-size: ${vars.fontSize.$13};
  font-weight: ${vars.fontWeight.$semibold};
  line-height: ${vars.lineHeight.$16};
  opacity: 0.5;
`;

const BannerItem = ({ mobileLink, title, subTitle, onClick }: Props) => {
  return (
    <Link href={mobileLink} passHref>
      <a href={mobileLink} onClick={onClick}>
        <Container>
          <MainText>{title}</MainText>
          <SubText>{subTitle}</SubText>
        </Container>
      </a>
    </Link>
  );
};

export { BannerItem };
