import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

const Wrapper = styled.div`
  letter-spacing: -0.5px;
  padding-top: 8px;
`;

const BlackDescription = styled.p`
  padding-bottom: 16px;
`;

const GrayDescription = styled.p`
  font-size: 14px;
  color: ${COLOR.kurlyGray600};
  line-height: 19px;
`;

interface Props {
  blackDesc?: string[];
  grayDesc?: string[];
}

export function TableTermsDescription({ blackDesc, grayDesc }: Props) {
  return (
    <Wrapper>
      {blackDesc?.map((text) => {
        return <BlackDescription key={text}>{text}</BlackDescription>;
      })}
      {grayDesc?.map((text) => {
        return <GrayDescription key={text}>{text}</GrayDescription>;
      })}
    </Wrapper>
  );
}
