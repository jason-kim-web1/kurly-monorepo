import styled from '@emotion/styled';

import ScreenOut from './ScreenOut';

const Button = styled.button`
  width: 44px;
  height: 44px;
  padding: 0;
  margin: 0;
  border: 0;
  cursor: pointer;
  background-color: transparent;
  background-image: url('https://res.kurly.com/kurly/ico/2021/paging-prev-activated.svg');
  background-repeat: no-repeat;
  background-size: cover;

  &:hover {
    background-image: url('https://res.kurly.com/kurly/ico/2021/paging-prev-hover.svg');
  }

  &:disabled {
    background-image: url('https://res.kurly.com/kurly/ico/2021/paging-prev-disabled.svg');
    cursor: default;
  }
`;

interface Props {
  disabled: boolean;
  onClick(): void;
}

export default function PreviousButton({ disabled = false, onClick }: Props) {
  return (
    <Button disabled={disabled} onClick={onClick} type="button">
      <ScreenOut>이전</ScreenOut>
    </Button>
  );
}
