import styled from '@emotion/styled';

import { Banner } from '../../content/total';
import { useLink } from '../../../../shared/hooks/useLink';

const Container = styled.a<{ backgroundColor: string }>`
  display: block;
  margin-bottom: 12px;
  padding: 18px 0 27px;
  font-weight: 300;
  font-size: 14px;
  color: #fff;
  background-color: ${(props) => (props.backgroundColor === 'purple' ? '#3c0b49' : '#1d1d1d')};
  text-align: center;
  cursor: pointer;
`;

const Title = styled.strong`
  display: block;
  padding: 0 0 4px 20px;
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
`;

const ArrowIcon = styled.span`
  display: inline-block;
  width: 32px;
  height: 32px;
  margin-top: -4px;
  background: url('https://res.kurly.com/images/event/fixed/common/ico-arr-w.svg') no-repeat;
  vertical-align: middle;
`;

interface Props {
  banner: Banner;
}

export default function BenefitBanner({ banner }: Props) {
  const { title, text, backgroundColor, link } = banner;
  const redirect = useLink();
  const handleLink = (url: string) => {
    redirect(url);
  };

  return (
    <Container onClick={() => handleLink(link)} backgroundColor={backgroundColor}>
      <Title>
        {title}
        <ArrowIcon />
      </Title>
      {text}
    </Container>
  );
}
