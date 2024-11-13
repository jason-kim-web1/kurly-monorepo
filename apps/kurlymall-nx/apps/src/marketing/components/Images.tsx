import { memo } from 'react';

import { StyledImagesWrapper } from '../shared/styled';
import { isPC } from '../../../util/window/getDevice';
import { ContentBody } from '../shared/type';
import { handleLinkAction } from '../shared/utils';

function Images({ images }: { images?: ContentBody['images'] }) {
  if (!images || images.length === 0) return null;

  return (
    <>
      {images.map(({ pcImageUrl, moWebImageUrl, id, webLink, appLink }) => {
        const url = isPC ? pcImageUrl : moWebImageUrl;

        return (
          <StyledImagesWrapper
            key={id}
            className={isPC ? 'pc' : 'mobile'}
            onClick={() => handleLinkAction({ webLink, appLink })}
          >
            <img src={url} alt="VVIP 전용관 이미지" />
          </StyledImagesWrapper>
        );
      })}
    </>
  );
}

export default memo(Images);
