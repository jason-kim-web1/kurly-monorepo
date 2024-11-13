import { ListboxButton, ListboxInput, ListboxList, ListboxOption, ListboxPopover } from '@reach/listbox';
import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';

const Button = styled(ListboxButton)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  color: ${COLOR.kurlyGray800};
  :focus-visible {
    outline: none;
  }
`;

const Input = styled(ListboxInput)`
  width: 104px;
`;

const List = styled(ListboxList)`
  :focus-visible {
    outline: none;
  }
`;

const Option = styled(ListboxOption)`
  height: 48px;
  padding: 15px 0 15px 16px;
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  text-align: left;
  color: ${COLOR.kurlyGray800};
  &[data-reach-listbox-option][data-current-selected] {
    font-weight: 600;
    color: ${COLOR.kurlyPurple};
  }
`;

const Popover = styled(ListboxPopover)`
  border-radius: 6px;
  background-color: ${COLOR.kurlyWhite};
  box-shadow: 2px 2px 10px 0 #0000001a;
`;

export {
  Button as ListboxButton,
  Input as ListboxInput,
  List as ListboxList,
  Option as ListboxOption,
  Popover as ListboxPopover,
};
