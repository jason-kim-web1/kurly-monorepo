import { ChangeEvent, ComponentProps, Fragment, PropsWithChildren, Ref, useCallback } from 'react';
import clsx from 'clsx';
import { CheckboxStyles, TextVariants } from '@thefarmersfront/kpds-css';
import { Text } from '@/components/Text';
import useControlled from '@/hooks/useControlled';

export type CheckboxBaseProps = {
  className?: string;
};

export const CheckboxBase = ({ children, className }: PropsWithChildren<CheckboxBaseProps>) => {
  return <label className={clsx(className, CheckboxStyles.root)}>{children}</label>;
};

export type CheckboxIconProps = {
  type?: 'box' | 'line';
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  ref?: Ref<HTMLInputElement>;
  inputProps?: Omit<ComponentProps<'input'>, 'onChange'>;
  onChange?(checked: boolean): void;
};

const Icon = ({
  type = 'box',
  checked: checkState,
  defaultChecked,
  disabled,
  ref,
  inputProps,
  onChange,
}: CheckboxIconProps) => {
  const [checked, setChecked] = useControlled({
    controlled: checkState,
    default: Boolean(defaultChecked),
    name: 'Checkbox',
    state: 'checked',
  });

  const handleCheckboxClick = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (disabled) {
        return;
      }

      const newChecked = event.target.checked;

      setChecked(newChecked);

      if (onChange) {
        onChange(newChecked);
      }
    },
    [setChecked, onChange, disabled],
  );

  return (
    <Fragment>
      <input
        type="checkbox"
        className={CheckboxStyles.input}
        checked={checkState}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={handleCheckboxClick}
        ref={ref}
        {...inputProps}
      />
      <div
        className={CheckboxStyles.icon({
          type,
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

export type CheckboxLabelProps = {
  ellipsis?: boolean;
  disabled?: boolean;
  label?: string;
  className?: string;
  textProps?: TextVariants;
};

const Label = ({ className, label, ellipsis, disabled, textProps }: CheckboxLabelProps) => {
  const showLabel = !!label;

  return (
    <Text
      as={'p'}
      className={clsx(className, CheckboxStyles.label({ ellipsis, disabled, label: showLabel }))}
      {...getDefaultLabelText(textProps)}
    >
      {showLabel ? label : ''}
    </Text>
  );
};

CheckboxBase.Icon = Icon;
CheckboxBase.Label = Label;
