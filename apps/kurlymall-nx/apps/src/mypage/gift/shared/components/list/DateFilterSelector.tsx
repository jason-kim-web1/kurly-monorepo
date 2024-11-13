import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';

const DateButton = styled.button`
  width: 100%;
  height: 40px;
  padding: 11px 12px 10px;
  margin-right: 6px;
  border-radius: 3px;
  border: solid 1px rgba(221, 221, 221, 0.5);
  background-color: ${COLOR.kurlyWhite};
  text-align: center;
  color: ${COLOR.kurlyGray600};

  &.active {
    border: solid 1px ${COLOR.kurlyPurple};
    color: ${COLOR.kurlyPurple};
    font-weight: 500;
  }
`;

interface Props {
  text: string;
  active: boolean;
  onClick(): void;
}

export default function DateFilterSelector({ text, active, onClick }: Props) {
  return (
    <DateButton className={active ? 'active' : ''} onClick={onClick}>
      {text}
    </DateButton>
  );
}
