import styled from '@emotion/styled';

import { MdChoicesOption } from '../../../interfaces/MainSection.interface';
import COLOR from '../../../../shared/constant/colorset';

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
`;

const Button = styled.button`
  display: block;
  padding: 10px 20px;
  border-radius: 22px;
  margin: 0 5px 20px 5px;
  font-size: 14px;
  height: 40px;
  line-height: 16px;
  background-color: ${COLOR.bgLightGray};
  color: ${COLOR.kurlyGray800};
  &:hover {
    background-color: #f7f3f8;
    color: ${COLOR.kurlyPurple};
  }
  &.selected {
    background-color: ${COLOR.kurlyPurple};
    color: ${COLOR.kurlyWhite};
  }
`;

interface Props {
  options: MdChoicesOption[];
  selectedOption?: MdChoicesOption;
  onClickOption(code: string): void;
}

export default function MdOptionList({ options, selectedOption, onClickOption }: Props) {
  return (
    <List>
      {options.map(({ code, name }) => (
        <li key={code}>
          <Button
            type="button"
            onClick={() => onClickOption(code)}
            className={code === selectedOption?.code ? 'selected' : ''}
          >
            {name}
          </Button>
        </li>
      ))}
    </List>
  );
}
