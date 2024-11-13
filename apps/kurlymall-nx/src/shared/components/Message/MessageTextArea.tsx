import {
  ChangeEvent,
  memo,
  ReactNode,
  useEffect,
  useRef,
  useState,
  ForwardedRef,
  useImperativeHandle,
  forwardRef,
} from 'react';

import styled from '@emotion/styled';

import GraphemeSplitter from 'grapheme-splitter';

import COLOR from '../../constant/colorset';

const splitter = new GraphemeSplitter();

export type Theme = {
  height?: number;
  textColor?: string;
  placeholderColor?: string;
  backgroundColor?: string;
  border?: string;
  borderFocus?: string;
};

interface Props {
  value: string;
  label?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  maxLength: number;
  theme?: Theme;
  showCount?: boolean;
  showCountText?: boolean; // 카운트에 '자' 글자를 추가하는 옵션
  disabled?: boolean;
  readOnly?: boolean;
  denyPattern?: RegExp;
  denyPatternEnterToSpace?: boolean;
  children?: ReactNode;
  className?: string;
  countEmojiDouble?: boolean;

  onChange(v: string, e: ChangeEvent): void;
}

const Wrapper = styled.div``;

const Placeholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 15px 15px 32px;
`;

const TextareaWrapper = styled.div<{
  theme: Theme;
  focus: boolean;
}>(({ theme, focus }) => {
  const border = focus ? theme.borderFocus : theme.border;

  return `
    position: relative;
    display: flex;
    flex-direction: column;
    height: ${theme.height}px;
    background-color: ${theme.backgroundColor};
    border: ${border};
    border-radius: 4px;
  `;
});

const Label = styled.label`
  display: block;
  padding: 8px 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 19px;
  color: ${COLOR.kurlyGray800};
`;

const Dim = styled.span`
  color: ${COLOR.kurlyGray450};
`;

const Text = styled.span<{ highlight: boolean }>`
  color: ${({ highlight }) => (highlight ? COLOR.kurlyGray800 : COLOR.kurlyGray450)};
`;

const Textarea = styled.textarea<{ theme: Theme }>`
  display: block;
  width: 100%;
  height: 100%;
  padding: 15px 16px;
  font-size: 16px;
  line-height: 21px;
  word-break: break-all;
  z-index: 1;
  background: none;
  border-radius: 4px;
  color: ${(props) => props.theme.textColor};
  ::placeholder {
    color: ${(props) => props.theme.placeholderColor};
  }
  outline: none;
  resize: none;
  border: none;
`;

const Tag = styled.span`
  padding: 0 16px 16px;
  font-size: 12px;
  text-align: right;
`;

const defaultTheme: Theme = {
  height: 95,
  textColor: COLOR.kurlyGray800,
  placeholderColor: COLOR.placeholder,
  backgroundColor: COLOR.kurlyWhite,
  border: `solid 1px ${COLOR.lightGray}`,
  borderFocus: `solid 1px ${COLOR.kurlyGray800}`,
};

function MessageArea(
  {
    id,
    label,
    placeholder,
    maxLength,
    value,
    onChange,
    disabled = false,
    theme = defaultTheme,
    showCount = true,
    showCountText = false,
    readOnly = false,
    denyPattern,
    denyPatternEnterToSpace = true,
    children,
    name,
    className,
    countEmojiDouble = false,
  }: Props,
  ref: ForwardedRef<HTMLTextAreaElement>,
) {
  const filteredRegex = (text: string, pattern?: RegExp) => {
    if (!pattern) {
      return text;
    }
    // 정규식에는 엔터를 포함하지 않지만, 엔터를 스페이스로 변경해야 하는 경우
    const filteredEnter = denyPatternEnterToSpace ? text.replace(/\s+/g, ' ') : text;
    return filteredEnter.replace(pattern, '');
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => textareaRef.current as HTMLTextAreaElement);

  const [focus, setFocus] = useState(false);

  const handleInputFocus = (focused: boolean) => {
    if (readOnly) {
      return;
    }
    setFocus(focused);
  };

  useEffect(() => {
    if (!textareaRef.current) {
      return;
    }

    if (focus) {
      textareaRef.current.focus();
      return;
    }

    textareaRef.current.blur();
  }, [focus]);

  const countMessage = (message: string) => {
    const emojiRegex =
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
    const splitValue = splitter.splitGraphemes(message);

    let countValue = splitter.countGraphemes(message);

    if (!countEmojiDouble) {
      return countValue;
    }

    splitValue.forEach((e) => {
      if (e.match(emojiRegex)) {
        countValue += 1;
      }
    });

    return countValue;
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const filteredValue: string = filteredRegex(e.target.value, denyPattern);
    const count: number = countMessage(filteredValue);

    if (maxLength && count > maxLength) {
      return;
    }

    onChange(filteredValue, e);
  };

  return (
    <Wrapper className={className}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <TextareaWrapper focus={focus} theme={theme} onClick={() => handleInputFocus(true)}>
        <Textarea
          id={id}
          placeholder={placeholder}
          value={value}
          theme={theme}
          inputMode="text"
          onChange={handleInputChange}
          aria-label="textarea-message"
          disabled={disabled}
          readOnly={readOnly}
          name={name}
          onFocus={() => handleInputFocus(true)}
          onBlur={() => handleInputFocus(false)}
          ref={textareaRef}
        />
        {value.length === 0 && !focus && <Placeholder className="placeholder">{children}</Placeholder>}
        <Tag className="content-length-counter">
          {showCount && (
            <span>
              <Text highlight={splitter.countGraphemes(value) > 0}>
                {`${countMessage(value)}${showCountText ? '자' : ''} `}
              </Text>
              <Dim>/{` ${maxLength}${showCountText ? '자' : ''}`}</Dim>
            </span>
          )}
        </Tag>
      </TextareaWrapper>
    </Wrapper>
  );
}

const ForwardedMessageArea = forwardRef(MessageArea);

export default memo(ForwardedMessageArea);
