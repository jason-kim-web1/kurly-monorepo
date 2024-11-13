import styled from '@emotion/styled';

import { INTRODUCE_IMAGE_URL } from '../../constants';

import NextImage from '../../../shared/components/NextImage';

const Icon = styled.span`
  position: relative;
  margin-left: 7px;
`;

export default function ArrowIcon() {
  return (
    <Icon>
      <NextImage src={INTRODUCE_IMAGE_URL.icoArrowPurple} width={7} height={10} alt={''} />
    </Icon>
  );
}
