import styled from '@emotion/styled';

import { INTRODUCE_IMAGE_URL } from '../../constants';

import NextImage from '../../../shared/components/NextImage';

const Icon = styled.span`
  position: relative;
  margin-left: 7px;
`;

export default function RecruitIcon() {
  return (
    <Icon>
      <NextImage src={INTRODUCE_IMAGE_URL.icoRecruit} width={14} height={15} alt={'새창 열기'} />
    </Icon>
  );
}
