import { ComponentProps, Fragment, PropsWithChildren, Ref, useContext, useMemo } from 'react';
import { RadioStyles, TextVariants } from '@thefarmersfront/kpds-css';
import clsx from 'clsx';
import { RadioGroupContext } from '@/internal/RadioGroupBase';
import { Text } from '@/components/Text';

export type RadioBaseProps = {
  className?: string;
};

export const RadioBase = ({ children, className }: PropsWithChildren<RadioBaseProps>) => {
  return <label className={clsx(className, RadioStyles.root)}>{children}</label>;
};

export type RadioIconProps = {
  value: string | number;
  disabled?: boolean;
  ref?: Ref<HTMLInputElement>;
  inputProps?: Omit<ComponentProps<'input'>, 'className' | 'defaultChecked' | 'disabled'>;
};

const Icon = ({ value, disabled, inputProps, ref }: RadioIconProps) => {
  const { name, selectedValue, onChange } = useContext(RadioGroupContext);

  const checked = useMemo(() => selectedValue === value, [selectedValue, value]);

  return (
    <Fragment>
      <input
        type="radio"
        className={RadioStyles.input}
        checked={checked}
        disabled={disabled}
        name={name}
        value={value}
        onChange={onChange}
        ref={ref}
        {...inputProps}
      />
      <div
        className={RadioStyles.icon({
          checked,
          disabled,
        })}
      />
    </Fragment>
  );
};

const getDefaultLabelText = (variant?: TextVariants): TextVariants => {
  const baseVariant: TextVariants = {
    size: variant?.size ?? '$16',
    lineHeight: variant?.lineHeight ?? '$22',
    weight: variant?.weight ?? 'regular',
  };

  if (!variant) {
    return baseVariant;
  }

  return {
    ...baseVariant,
    ...variant,
  };
};

export type RadioLabelProps = {
  ellipsis?: boolean;
  disabled?: boolean;
  label?: string;
  className?: string;
  textProps?: TextVariants;
};

const Label = ({ className, label, ellipsis, disabled, textProps }: RadioLabelProps) => {
  const showLabel = !!label;

  return (
    <Text
      as={'p'}
      className={clsx(className, RadioStyles.label({ ellipsis, disabled, label: showLabel }))}
      {...getDefaultLabelText(textProps)}
    >
      {showLabel ? label : ''}
    </Text>
  );
};

RadioBase.Icon = Icon;
RadioBase.Label = Label;
