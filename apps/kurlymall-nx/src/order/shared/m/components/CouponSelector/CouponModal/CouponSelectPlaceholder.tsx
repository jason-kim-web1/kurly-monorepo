import { css } from '@emotion/react';
import styled from '@emotion/styled';

import DropArrow from '../../../../../../shared/components/icons/DropArrow';

const dimmedStyle = css`
  background-color: #fafafa;
  color: #ccc;
`;

const icon = css`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
`;

const SelectBox = styled.button`
  width: 100%;
  height: 48px;
  padding: 11px 16px;
  font-size: 16px;
  font-weight: normal;
  border: solid 1px #ddd;
  border-radius: 4px;
  text-align: left;
  position: relative;
`;

interface Props {
  placeholder: string;
  disable?: boolean;
  dimmed?: boolean;
  onClick(): void;
}

export default function CouponSelectPlaceholder({ placeholder, disable = false, dimmed = false, onClick }: Props) {
  const handleClickSelector = () => {
    if (disable) return;

    onClick();
  };

  return (
    <SelectBox onClick={handleClickSelector} css={(dimmed || disable) && dimmedStyle}>
      {placeholder}
      <DropArrow css={icon} dimmed={dimmed || disable} />
    </SelectBox>
  );
}
