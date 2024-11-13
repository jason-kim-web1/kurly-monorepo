import { forwardRef } from 'react';

import styled from '@emotion/styled';

import SelectUnstyled from '@mui/base/SelectUnstyled';
import { OptionUnstyled, PopperUnstyled } from '@mui/base';

import COLOR from '../../../../shared/constant/colorset';
import { SelectArrowImg, SelectArrowDisabledImg } from '../../../../shared/images';

const Container = styled.div`
  position: relative;
  width: 276px;
`;

const Button = styled.button`
  width: 100%;
  height: 44px;
  padding-left: 15px;
  border: 1px solid ${COLOR.lightGray};
  font-size: 14px;
  text-align: left;
  background: ${COLOR.kurlyWhite} url(${SelectArrowImg}) no-repeat center right 14px;
  background-size: 12px 8px;

  &:disabled {
    background: ${COLOR.kurlyGray100} url(${SelectArrowDisabledImg}) no-repeat 248px 50%;
    color: ${COLOR.kurlyGray350};
  }
`;

const Option = styled(OptionUnstyled)<{ hidden?: boolean }>`
  padding: 2px 0 2px 15px;
  list-style: none;
  font-size: 13px;
  color: ${COLOR.kurlyGray500};
  line-height: 20px;
  cursor: pointer;
  :hover {
    background-color: ${COLOR.bgLightGray};
  }
`;

const Listbox = styled.div`
  padding: 12px 0;
  border: 1px solid ${COLOR.lightGray};
  background-color: ${COLOR.kurlyWhite};
  border-top-width: 0;
  .Mui-selected {
    font-weight: 500;
    color: #570080;
  }
`;

const Popper = styled(PopperUnstyled)`
  width: 100%;
  z-index: 1;
  transform: translate3d(0, 99, 0);
  &[data-popper-placement='top-start'] {
    .MuiSelectUnstyled-listbox {
      border-width: 1px 1px 0 1px;
    }
  }
`;

// eslint-disable-next-line react/display-name
const CustomSelect = forwardRef((props: any, ref: any) => {
  const components = {
    Root: Button,
    Listbox,
    Popper,
    ...props.components,
  };

  return <SelectUnstyled {...props} ref={ref} components={components} />;
});

interface Props<T = string> {
  className?: string;
  placeholder: string;
  disabled?: boolean;
  value?: {
    name: string;
    value: T;
  } | null;
  options: {
    name: string;
    value: T;
  }[];
  onChange: (value: { name: string; value: T }) => void;
}

export default function Select({ className, disabled = false, placeholder, options, value, onChange }: Props) {
  return (
    <Container className={className}>
      <CustomSelect
        value={value ?? null}
        renderValue={() => value?.name ?? placeholder}
        disabled={disabled}
        onChange={onChange}
      >
        {options.map((it) => (
          <Option key={it.value} value={it}>
            {it.name}
          </Option>
        ))}
      </CustomSelect>
    </Container>
  );
}
