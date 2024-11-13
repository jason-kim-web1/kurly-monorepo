import { memo } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import SearchIcon from '../icons/SearchIcon';

const Button = styled.button`
  min-width: 30px;
  min-height: 30px;
  margin-right: 4px;
`;

const icon = css`
  width: 100%;
  height: 100%;
`;

interface Props {
  color?: string;
}

function SearchButton({ color }: Props) {
  return (
    <Button type="submit">
      <SearchIcon css={icon} color={color} />
    </Button>
  );
}

export default memo(SearchButton);
