import {
  ChangeEvent,
  ComponentProps,
  createElement,
  FocusEvent,
  Fragment,
  memo,
  MouseEvent,
  PropsWithChildren,
  Ref,
  useEffect,
} from 'react';
import clsx from 'clsx';
import { TextFieldStyles } from '@thefarmersfront/kpds-css';
import { Text } from '@/components/Text';
import { Typography } from '@/components/Typography';
import { useTextFieldContext } from '@/internal/TextFieldBase/context/TextFieldContext';
import { TextFieldProps } from '@/internal/TextFieldBase';
import { TextFieldAddedText } from '@/internal/TextFieldBase/components/TextFieldAddedText';
import useControlled from '@/hooks/useControlled';
import { textFieldInputMaxLengthVariants } from '@thefarmersfront/kpds-css/src/components/textfield.css';

export type TextFieldBaseProps = Pick<
  TextFieldProps,
  'disabled' | 'required' | 'error' | 'infoText' | 'errorText' | 'label' | 'as'
> & {
  className?: string;
  direction?: 'column' | 'row';
};

export const TextFieldBase = ({
  children,
  className,
  infoText,
  errorText,
  label,
  as = 'input',
}: PropsWithChildren<TextFieldBaseProps>) => {
  return (
    <Label label={label}>
      <div className={clsx(className, TextFieldStyles.root({ as }))}>{children}</div>
      <TextFieldAddedText infoText={infoText} errorText={errorText} />
    </Label>
  );
};

type InputProps = {
  className?: string;
  ref: Ref<HTMLInputElement | HTMLTextAreaElement>;
} & Pick<
  TextFieldProps,
  | 'placeholder'
  | 'value'
  | 'maxLength'
  | 'as'
  | 'autoHeight'
  | 'inputProps'
  | 'onFocus'
  | 'onBlur'
  | 'onClick'
  | 'onChange'
>;

const defaultProps = {
  input: {
    type: 'text',
  },
  textarea: {
    rows: 3,
  },
};

const Input = ({
  as = 'input',
  placeholder,
  value,
  maxLength,
  autoHeight,
  inputProps,
  onClick,
  onFocus,
  onBlur,
  onChange,
  className,
  ref,
}: InputProps) => {
  const { disabled, required, focused, error, setFocused, setCount } = useTextFieldContext();
  const [inputValue, setInputValue] = useControlled({
    controlled: value,
    default: '',
    name: 'TextField',
  });

  const handleFocus = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFocused(true);
    if (onFocus) {
      onFocus(event);
    }
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFocused(false);
    if (onBlur) {
      onBlur(event);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const eventValue = event.target.value;
    // uncontrolled 상태에서 maxLength 설정시 count 설정
    setCount(eventValue.length);

    if (autoHeight && as === 'textarea') {
      event.target.style.height = 'auto';
      event.target.style.height = event.target.scrollHeight + 'px';
    }

    setInputValue(eventValue);

    if (onChange) {
      onChange(event);
    }
  };

  const handleClick = (event: MouseEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onClick) {
      onClick(event);
    }
  };

  const InputComponent = createElement(as, {
    className: clsx(
      className,
      TextFieldStyles.input,
      TextFieldStyles.textFieldInputVariants({ disabled, error, focused, as }),
    ),
    ref,
    disabled,
    value: inputValue,
    required,
    placeholder,
    maxLength,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: handleChange,
    onClick: handleClick,
    spellCheck: false,
    ...defaultProps[as],
    ...(inputProps as ComponentProps<typeof as>),
  });

  useEffect(() => {
    // controller 모드에서 입력된 값 있을경우 처음에 count 설정
    if (value) {
      setCount(value.length);
    }
  }, []);

  return (
    <Fragment>
      <div
        className={TextFieldStyles.textFieldInputBorderVariants({
          focused,
          disabled,
          error,
          as,
        })}
      />
      {InputComponent}
    </Fragment>
  );
};

const Label = ({ children, label }: PropsWithChildren<Pick<TextFieldProps, 'label'>>) => {
  const { required, disabled } = useTextFieldContext();

  return (
    <label>
      {label && (
        <Typography variant={'$largeSemibold'} className={clsx(TextFieldStyles.textFieldLabelVariants)}>
          {label}
          {required && (
            <span className={TextFieldStyles.textFieldLabelRequiredVariants({ disabled: disabled })}>&nbsp;*</span>
          )}
        </Typography>
      )}
      {children}
    </label>
  );
};

const Slot = ({ children, className }: PropsWithChildren<{ className?: string }>) => {
  return <div className={clsx(TextFieldStyles.slot, className)}>{children}</div>;
};

export type CounterProps = {
  className?: string;
} & Pick<TextFieldProps, 'maxLength' | 'minLength' | 'as'>;

const MinLengthText = ({ minLength }: Pick<CounterProps, 'minLength'>) => {
  return <>최소 {minLength}자</>;
};

const MaxLengthText = ({ maxLength }: Pick<CounterProps, 'maxLength'>) => {
  const { error, focused, count } = useTextFieldContext();

  return (
    <>
      <span
        className={TextFieldStyles.textFieldInputCounterVariants({
          error: !count && error && !focused,
          hasCount: !!count,
        })}
      >
        {count}
      </span>
      <span
        className={TextFieldStyles.textFieldInputMaxLengthVariants({
          error: !count && error,
          focused,
        })}
      >
        /{maxLength}
      </span>
    </>
  );
};

const CounterText = ({ maxLength, minLength, as }: Pick<CounterProps, 'maxLength' | 'minLength' | 'as'>) => {
  const { count } = useTextFieldContext();

  // Input인 경우는 MaxLength 만 노출
  if (as === 'input') {
    if (maxLength) {
      return <MaxLengthText maxLength={maxLength} />;
    }

    return null;
  }

  // minLength 만 있는 경우
  if (minLength && !maxLength) {
    return <MinLengthText minLength={minLength} />;
  }

  // maxLength만 있는 경우
  if (maxLength && !minLength) {
    return <MaxLengthText maxLength={maxLength} />;
  }

  // 둘다 있는 경우
  return count > 0 ? <MaxLengthText maxLength={maxLength} /> : <MinLengthText minLength={minLength} />;
};

const Counter = ({ maxLength, minLength, className, as }: CounterProps) => {
  const { error, focused } = useTextFieldContext();

  if (!maxLength && !minLength) {
    return null;
  }

  return (
    <Text
      as={'p'}
      size={'$14'}
      weight={'regular'}
      className={clsx(
        className,
        TextFieldStyles.textFieldCounterVariants({
          error,
          focused,
          as,
        }),
      )}
    >
      <CounterText maxLength={maxLength} minLength={minLength} as={as} />
    </Text>
  );
};

TextFieldBase.Input = memo(Input);
TextFieldBase.Slot = memo(Slot);
TextFieldBase.Counter = memo(Counter);
