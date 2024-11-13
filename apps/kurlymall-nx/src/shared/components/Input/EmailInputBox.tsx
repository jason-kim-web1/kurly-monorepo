import { InputHTMLAttributes, ReactNode, FocusEvent, useState, useRef, useMemo, useEffect } from 'react';
import styled from '@emotion/styled';

import COLOR from '../../constant/colorset';
import { ArrowDownFull } from '../../images';
import BottomSheet from '../BottomSheet/BottomSheet';
import { closeAlert } from '../Alert/Alert';
import { isPC } from '../../../../util/window/getDevice';

const Wrapper = styled.div`
  padding-bottom: 12px;
`;

const Star = styled.span`
  color: ${COLOR.pointText};
`;

const Label = styled.label`
  display: inline-block;
  padding: 8px 0 11px;
  font-size: 14px;
  font-weight: 500;
  line-height: 19px;
  color: #333;
`;

const InputWrapper = styled.div<{
  height?: number;
  isError: boolean;
  isSuccess: boolean;
  isFocus: boolean;
}>(({ height, isFocus, isError, isSuccess }) => {
  let borderColor = COLOR.lightGray;

  if (isError) borderColor = COLOR.invalidRed;
  else if (isSuccess) borderColor = '#0e851a';
  else if (isFocus) borderColor = COLOR.kurlyGray800;

  return `
    position: relative;
    height: ${height ? `${height}px` : '48px'};
    border-radius: 4px;
    border: 1px solid ${borderColor};

    display: flex;
    align-items: center;
  `;
});

const Input = styled.input<{
  height?: number;
}>(({ height }) => {
  return `
    width: 100%;
    flex: 1;
    height: ${height ? `${height}px` : '46px'};
    padding: 0 0 1px 15px;
    font-weight: 400;
    font-size: 16px;
    line-height: ${height ? `${height - 2}px` : '1.5'};
    color: ${COLOR.kurlyGray800};
    outline: none;
    box-sizing: border-box;
    border: 0;

    :placeholder {
      color: #ccc;
    };
    :focus {
      background: none;
    }
    :disabled{
      opacity: 1;
      background-color: ${COLOR.kurlyGray100};
      color: ${COLOR.kurlyGray450};
      :placeholder {
        color: ${COLOR.kurlyGray450};
      };
    }
  `;
});

const At = styled.div`
  padding: 0 4px;
`;

const DomainWrapper = styled.div`
  width: 136px;
  height: 100%;
  position: relative;

  &.pc {
    width: 143px;
  }

  display: flex;
  align-items: center;
  justify-content: space-between;

  .btn-text {
    text-align: left;

    font-weight: 400;
    font-size: 16px;
    line-height: 1.5;
    color: ${COLOR.kurlyGray800};

    &.empty {
      color: ${COLOR.kurlyGray450};
    }

    flex: auto;
  }

  .btn-select {
    width: 48px;

    &:focus {
      outline: none;
    }
  }

  .input-text {
    display: flex;
    flex: 1;

    input {
      width: 100%;
      padding-left: 0;
    }
  }
`;

const BottomSheetContent = styled.div`
  padding: 32px 20px 20px;

  display: flex;
  flex-direction: column;

  .title {
    font-size: 18px;
    font-weight: 600;
    line-height: 23px;
    margin: 0 0 16px 0;
    text-align: left;
  }

  .domains {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    &__item {
      border-radius: 3px;
      border: 1px solid ${COLOR.kurlyGray200};
      width: calc(50% - 4px);

      display: flex;
      height: 46px;
      align-items: center;
      justify-content: center;

      font-size: 14px;
      font-weight: 600;
      line-height: 19px;

      &:focus {
        border-color: ${COLOR.kurlyPurple};
        color: ${COLOR.kurlyPurple};
      }
    }
  }
`;

const DropDownMenu = styled.div`
  position: absolute;
  right: 0;
  width: 165px;
  top: 47px;
  background-color: ${COLOR.kurlyWhite};
  z-index: 100;
  border: 1px solid ${COLOR.lightGray};
  padding: 16px;

  display: flex;
  flex-direction: column;
  gap: 6px;

  .dropdown__item {
    font-size: 13px;
    font-weight: 400;
    letter-spacing: -0.5px;
    color: ${COLOR.kurlyGray500};
    height: 18px;

    &:focus {
      outline: none;
      color: ${COLOR.kurlyPurple};
    }
  }
`;

const SELF_INPUT = '직접 입력';

const DOMAIN_LIST = [
  'naver.com',
  'gmail.com',
  'hanmail.net',
  'kakao.com',
  'daum.net',
  'hotmail.com',
  'yahoo.co.kr',
  SELF_INPUT,
];

export interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onBlur'> {
  label?: string;
  denyPattern?: RegExp;
  isError?: boolean;
  isSuccess?: boolean;
  helperText?: ReactNode;
  height?: number;
  onFocus?(e: FocusEvent<HTMLInputElement>): void;
  onChange?(params: { name?: string; value: string }): void;
  onClick?(): void;
  onBlur?(params: { name?: string; value: string }): void;
}

export default function EmailInputBox({
  className,
  id,
  name,
  label,
  readOnly = false,
  placeholder,
  denyPattern,
  type = 'text',
  disabled = false,
  required = false,
  isError = false,
  isSuccess = false,
  helperText,
  value,
  height,
  autoComplete,
  onClick,
  onFocus,
  onChange,
  onBlur,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const idRef = useRef<HTMLInputElement>(null);
  const domainRef = useRef<HTMLInputElement>(null);

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    if (readOnly || disabled) {
      return;
    }

    setIsFocused(true);
    onFocus?.(e);
  };

  const createEmailValue = (domainData: string) => {
    const emailId = idRef.current?.value;
    const domain = domainData === SELF_INPUT ? domainRef.current?.value : domainData;

    const text = `${emailId || ''}${!emailId && !domain ? '' : '@'}${domain || ''}`;
    const filteredValue = denyPattern ? text.replace(denyPattern, '') : text;

    return filteredValue;
  };

  const handleBlur = () => {
    if (readOnly || disabled) {
      return;
    }

    setIsFocused(false);
    onBlur?.({
      name,
      value: createEmailValue(selectedDomain),
    });
  };

  const handleInputChange = () => {
    if (readOnly || disabled) {
      return;
    }

    onChange?.({
      name,
      value: createEmailValue(selectedDomain),
    });
  };

  const onClickDomain = (domain: string, callback: () => void) => () => {
    setSelectedDomain(domain);

    const resultEmail = createEmailValue(domain);

    onChange?.({
      name,
      value: resultEmail,
    });

    onBlur?.({
      name,
      value: resultEmail,
    });

    callback();
  };

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const openDomainList = async () => {
    if (isPC) {
      handleDropdown();
      return;
    }

    await BottomSheet({
      headerBar: false,
      showCancelButton: false,
      showConfirmButton: false,
      contentsStyle: `
        .swal2-popup { padding: 0; }
      `,
      contents: (
        <BottomSheetContent>
          <div className="title">이메일 주소 선택</div>
          <div className="domains">
            {DOMAIN_LIST.map((domain) => (
              <button type="button" key={domain} className="domains__item" onClick={onClickDomain(domain, closeAlert)}>
                {domain}
              </button>
            ))}
          </div>
        </BottomSheetContent>
      ),
    });
  };

  const { emailId, emailDomain } = useMemo(() => {
    if (!value) {
      return {
        emailId: '',
        emailDomain: '',
      };
    }

    const [eId, eDomain] = (value as string).split('@');

    return {
      emailId: eId,
      emailDomain: eDomain,
    };
  }, [value]);

  useEffect(() => {
    if (emailDomain) {
      const selected = DOMAIN_LIST.find((domain) => domain === emailDomain);
      setSelectedDomain(selected || SELF_INPUT);
    }
  }, [emailDomain]);

  return (
    <Wrapper className={className}>
      {label && (
        <>
          <Label htmlFor={id}>{label}</Label>
          {required && <Star>*</Star>}
        </>
      )}
      <InputWrapper height={height} isError={isError} isSuccess={isSuccess} isFocus={isFocused}>
        <input id={id} type="hidden" name={name} value={value} />
        <Input
          id={`${id}Id`}
          name={`${name}Id`}
          value={emailId}
          disabled={disabled}
          placeholder={placeholder}
          type={type}
          readOnly={readOnly}
          required={required}
          height={height}
          autoComplete={autoComplete}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleInputChange}
          onClick={onClick}
          ref={idRef}
        />
        <At>@</At>
        <DomainWrapper className={isPC ? 'pc' : 'mobile'}>
          {selectedDomain === SELF_INPUT ? (
            <div className="input-text">
              <Input
                id={`${id}Domain`}
                name={`${name}Domain`}
                type="text"
                value={emailDomain}
                placeholder={SELF_INPUT}
                onBlur={handleBlur}
                onChange={handleInputChange}
                disabled={disabled}
                readOnly={readOnly}
                ref={domainRef}
              />
            </div>
          ) : (
            <button type="button" onClick={openDomainList} className={`btn-text ${selectedDomain ? '' : 'empty'}`}>
              {selectedDomain || '선택하기'}
            </button>
          )}
          <button type="button" className="btn-select" onClick={openDomainList}>
            <img src={ArrowDownFull} alt="arrow-down" />
          </button>
          {showDropdown && (
            <DropDownMenu>
              {DOMAIN_LIST.map((domain) => (
                <button
                  type="button"
                  key={domain}
                  className="dropdown__item"
                  onClick={onClickDomain(domain, handleDropdown)}
                >
                  {domain}
                </button>
              ))}
            </DropDownMenu>
          )}
        </DomainWrapper>
      </InputWrapper>
      {helperText}
    </Wrapper>
  );
}
