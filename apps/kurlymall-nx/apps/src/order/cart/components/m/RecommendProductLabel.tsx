import { isEmpty } from 'lodash';

import styled from '@emotion/styled';

import { Typography } from '@thefarmersfront/kpds-react';

import { MembershipLabel } from '../../../../shared/interfaces';
import StickerList, { STICKER_SIZE } from '../CartItems/StickerList';

const Wrapper = styled.ul`
  display: flex;
  align-items: center;
`;

const Text = styled(Typography)<{ textColor: string; backgroundColor: string }>`
  color: ${({ textColor }) => textColor};
  background-color: ${({ backgroundColor }) => backgroundColor};
  word-break: keep-all;
`;

interface Props {
  labels: MembershipLabel[];
}

export default function RecommendProductLabel({ labels }: Props) {
  if (isEmpty(labels)) {
    return null;
  }

  return (
    <Wrapper>
      <StickerList size={STICKER_SIZE.SMALL}>
        {labels.map((label, index) => (
          <Text key={`${label.text}-${index}`} variant={'$smallSemibold'} {...label}>
            {label.text}
          </Text>
        ))}
      </StickerList>
    </Wrapper>
  );
}
