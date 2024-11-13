import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import Info from '../../../../shared/icons/Info';

const Container = styled.div<{ paddingTop: number }>`
  display: flex;
  padding-top: ${({ paddingTop }) => paddingTop}px;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  text-align: left;
  word-break: keep-all;
  color: ${COLOR.kurlyGray600};

  > svg {
    margin: 3px 7px 0 3px;
  }
`;

interface Props {
  text: string;
  paddingTop: number;
}

export default function CautionText({ text, paddingTop }: Props) {
  return (
    <Container paddingTop={paddingTop}>
      <Info width={12} height={12} />
      {text}
    </Container>
  );
}
