import { ComponentProps, forwardRef, Ref } from 'react';
import { CheckboxBase } from '@/internal/CheckboxBase';
import { TextVariants } from '@thefarmersfront/kpds-css';

export type Props = {
  ellipsis?: boolean;
  type?: 'box' | 'line';
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?(checked: boolean): void;
  inputProps?: Omit<ComponentProps<'input'>, 'onChange'>;
  textProps?: TextVariants;
};

export const Checkbox = forwardRef(
  (
    {
      className,
      type = 'box',
      label,
      checked,
      defaultChecked,
      ellipsis,
      disabled,
      onChange,
      inputProps,
      textProps,
    }: Props,
    ref: Ref<HTMLInputElement>,
  ) => {
    return (
      <CheckboxBase className={className}>
        <CheckboxBase.Icon
          type={type}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          ref={ref}
          onChange={onChange}
          inputProps={inputProps}
        />
        <CheckboxBase.Label label={label} ellipsis={ellipsis} disabled={disabled} textProps={textProps} />
      </CheckboxBase>
    );
  },
);
