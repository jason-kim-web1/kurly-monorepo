import { memo } from 'react';

import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';

import { css } from '@emotion/react';

import NextImage from '../../../../shared/components/NextImage';
import { THUMBNAIL_HEIGHT } from '../../constants/Thumbnail';
import ItemLink from './ItemLink';

const Wrapper = styled.div<{ disable: boolean }>`
  height: ${THUMBNAIL_HEIGHT}px;
  overflow: hidden;
  border-radius: ${vars.spacing.$8};
  margin-right: ${vars.spacing.$16};
  flex-shrink: 0;

  ${({ disable }) =>
    disable &&
    css`
      opacity: 0.4;
    `}
`;

interface ThumbnailProps {
  imageUrl: string;
  detailUrl?: string;
  disable?: boolean;
}

const Thumbnail = ({ imageUrl, detailUrl, disable = false }: ThumbnailProps) => {
  return (
    <ItemLink detailUrl={detailUrl}>
      <Wrapper disable={disable}>
        <NextImage src={imageUrl} width={64} height={THUMBNAIL_HEIGHT} objectFit="cover" />
      </Wrapper>
    </ItemLink>
  );
};

export default memo(Thumbnail);
