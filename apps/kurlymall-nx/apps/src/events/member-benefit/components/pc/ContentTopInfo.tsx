import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import LoversInfoBox from '../shared/LoversInfoBox';

const Container = styled.div`
  width: 780px;
  margin: 0 auto;
  padding: 65px 0 50px;
`;

const Title = styled.h2`
  margin-bottom: 15px;
  font-weight: 500;
  font-size: 31px;
  color: ${COLOR.kurlyGray800};
  letter-spacing: -1.5px;
`;

const Text = styled.p`
  font-weight: 300;
  font-size: 17px;
  line-height: 28px;
  letter-spacing: -0.7px;
`;

interface Props {
  title: string;
  text: string;
}

export default function ContentTopInfo({ title, text }: Props) {
  return (
    <Container>
      <Title>{title}</Title>
      <Text>{text}</Text>
      <LoversInfoBox />
    </Container>
  );
}
