import { useState, useMemo, useEffect } from 'react';

import { Check } from '../../../../../shared/icons';
import rgbDataUrl from '../../../../../shared/utils/image/rgbDataUrl';

import type { ProductReview } from '../../ProductReview.service';
import { Dim, ReviewImageItem, ReviewImageList, ReviewImageWrapper, reviewImageFrame } from './styled-components';
import NextImage from '../../../../../shared/components/NextImage';

interface Props extends Pick<ProductReview, 'images'> {
  initialSelectedIndex?: number;
}

export default function ReviewModalImagContent({ images, initialSelectedIndex = 0 }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);
  const selectedImage = useMemo(() => images?.find((_, index) => index === selectedIndex), [images, selectedIndex]);
  const imagesTotalCount = images.length;

  const handleClickReviewImageItem = (index: number) => () => setSelectedIndex(index);

  useEffect(() => {
    setSelectedIndex(0);
  }, [images]);

  return (
    <ReviewImageWrapper>
      {!!selectedImage ? (
        <NextImage
          css={reviewImageFrame}
          src={selectedImage.url}
          alt={`review-${selectedImage.id}`}
          layout="fixed"
          width={375}
          height={488}
          objectFit="cover"
          placeholder="blur"
          blurDataURL={rgbDataUrl(224, 224, 224)}
          disableImageDrag
        />
      ) : null}
      {imagesTotalCount > 1 ? (
        <>
          <ReviewImageList>
            {images.map(({ id, url, reviewSquareSmallUrl }, index) => (
              <ReviewImageItem key={`${id}-${index}`} onClick={handleClickReviewImageItem(index)}>
                <NextImage
                  src={reviewSquareSmallUrl || url}
                  alt={`image-${id}`}
                  width={45}
                  height={45}
                  objectFit="cover"
                  disableImageDrag
                />
                {index === selectedIndex ? (
                  <Dim>
                    <Check />
                  </Dim>
                ) : null}
              </ReviewImageItem>
            ))}
          </ReviewImageList>
        </>
      ) : null}
    </ReviewImageWrapper>
  );
}
