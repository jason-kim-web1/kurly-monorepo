import { Fragment } from 'react';

import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

const Tags = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  padding: 10px 10px 0 0;
  cursor: default;
`;

const TagName = styled.span<{ isKurlyOnly: boolean }>`
  flex: 1 1 1;
  padding: 2px 6px 2px 6px;
  border-radius: 4px;
  background-color: ${COLOR.bg};
  font-weight: 600;
  font-size: 10px;
  color: ${({ isKurlyOnly }) => (isKurlyOnly ? COLOR.kurlyPurple : COLOR.kurlyGray600)};
  line-height: 16px;
`;

interface Props {
  tags: {
    name: string;
    type: string;
  }[];
}

export default function ProductCardTag({ tags }: Props) {
  return (
    <Tags>
      {tags.map((tag) => (
        <Fragment key={tag.name}>
          <TagName isKurlyOnly={tag.type === 'KURLY_ONLY'}>{tag.name}</TagName>
        </Fragment>
      ))}
    </Tags>
  );
}
