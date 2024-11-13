import { HTMLAttributes } from 'react';

import styled from '@emotion/styled';

import { QuestionRound } from '../../images';

const Img = styled.img`
  width: 20px;
  height: 20px;
`;

export default function QuestionIcon(props: HTMLAttributes<HTMLImageElement>) {
  return <Img src={QuestionRound} alt="questionIcon" {...props} />;
}
