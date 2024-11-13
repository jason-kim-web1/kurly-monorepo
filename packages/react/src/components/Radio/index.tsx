import { ComponentProps, forwardRef, Ref } from 'react';
import { RadioBase } from '@/internal/RadioBase';
import { TextVariants } from '@thefarmersfront/kpds-css';

export type Props = {
  className?: string;
  label?: string;
  ellipsis?: boolean;
  value: string | number;
  disabled?: boolean;
  inputProps?: Omit<ComponentProps<'input'>, 'className' | 'defaultChecked' | 'checked' | 'disabled'>;
  textProps?: TextVariants;
};

export const Radio = forwardRef(
  ({ className, label, value, ellipsis, disabled, inputProps, textProps }: Props, ref: Ref<HTMLInputElement>) => {
    return (
      <RadioBase className={className}>
        <RadioBase.Icon disabled={disabled} value={value} ref={ref} inputProps={inputProps} />
        <RadioBase.Label label={label} disabled={disabled} ellipsis={ellipsis} textProps={textProps} />
      </RadioBase>
    );
  },
);

Radio.displayName = 'Radio';
