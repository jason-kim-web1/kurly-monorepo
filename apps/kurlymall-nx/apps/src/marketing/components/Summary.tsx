import { memo } from 'react';

import BlindText from './BlindText';
import Images from './Images';
import { ContentBody } from '../shared/type';
import { WrappedSummary } from '../shared/styled';

type SummaryProps = { benefits?: ContentBody['list']; images?: ContentBody['images']; styles?: ContentBody['styles'] };

function Summary({ benefits, images, styles }: SummaryProps) {
  return (
    <WrappedSummary backgroundColor={styles?.backgroundColor}>
      {benefits?.map((benefit) => (
        <BlindText key={benefit} text={benefit} />
      ))}
      <Images images={images} />
    </WrappedSummary>
  );
}

export default memo(Summary);
