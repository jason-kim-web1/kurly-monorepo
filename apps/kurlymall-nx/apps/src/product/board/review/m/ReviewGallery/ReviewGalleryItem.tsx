import { MouseEvent } from 'react';

import styled from '@emotion/styled';

import NextImage from '../../../../../shared/components/NextImage';
import rgbDataUrl from '../../../../../shared/utils/image/rgbDataUrl';
import COLOR from '../../../../../shared/constant/colorset';

const ShowMore = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  background-color: hsla(0, 0%, 0%, 0.4);
  font-weight: 500;
  font-size: 12px;
  line-height: 19px;
  color: ${COLOR.kurlyWhite};
`;

interface Props {
  onClick: () => void;
  imageSrc: string;
  imageAlt?: string;
  isShowMoreBlock: boolean;
  onClickShowMore: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function ReviewGalleryItem({ onClick, imageSrc, imageAlt, isShowMoreBlock, onClickShowMore }: Props) {
  return (
    <span>
      <button onClick={onClick}>
        <NextImage
          src={imageSrc}
          alt={imageAlt || ''}
          priority={true}
          objectFit="cover"
          layout="fill"
          placeholder="blur"
          blurDataURL={rgbDataUrl(224, 224, 224)}
        />
      </button>
      {isShowMoreBlock ? <ShowMore onClick={onClickShowMore}>+ 더보기</ShowMore> : null}
    </span>
  );
}
