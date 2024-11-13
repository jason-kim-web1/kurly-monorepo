import { isEmpty } from 'lodash';
import styled from '@emotion/styled';
import { Typography } from '@thefarmersfront/kpds-react';
import { vars } from '@thefarmersfront/kpds-css';

const Tag = styled(Typography)`
  background-color: ${vars.color.background.$background2};
  color: ${vars.color.text.$quaternary};
  margin-top: ${vars.spacing.$8};
`;

export default function Tags({ tagNames }: { tagNames: string[] }) {
  if (isEmpty(tagNames)) {
    return null;
  }

  return (
    <>
      {tagNames?.map((sticker) => {
        return (
          <Tag key={sticker} variant={`$smallSemibold`}>
            {sticker}
          </Tag>
        );
      })}
    </>
  );
}
