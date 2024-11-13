/**
 * Radio
 * @param { string | number } value radio 고유 값
 * @param { string | number } selectedValue 현재 radio 집합에서 선택된 radio 값 (checked 여부 판별)
 * @param { string | number } id radio의 id, label의 htmlFor 값
 * @param { string } name radio 집합 이름 (같은 radio 리스트 동일한 name 사용)
 * @param { ?number } buttonSize radio 버튼의 크기 (default: 16px)
 * @param { ?boolean } disabled radio 비활성화 여부
 * @param { ReactNode } label radio의 이름
 * @param { function } onChange button 클릭에 대한 콜백 (key를 parameter로 받음)
 */
import { ChangeEvent, ReactNode } from 'react';

import styled from '@emotion/styled';

import RadioIcon from '../icons/RadioIcon';

import COLOR from '../../constant/colorset';

const Label = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  padding: 12px 0 9px;
`;

const Input = styled.input`
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
  clip: rect(0, 0, 0, 0);
`;

const Text = styled.span`
  position: relative;
  font-size: 16px;
  margin-left: 12px;
`;

const Sub = styled.em`
  padding-left: 4px;
  font-style: normal;
  font-size: 12px;
  color: ${COLOR.kurlyGray350};
  line-height: 20px;
`;

interface Props {
  className?: string;
  value: string;
  selectedValue: string;
  id: string | number;
  name: string;
  label: ReactNode;
  disabled?: boolean;
  iconSize?: 'small' | 'normal';
  visibleIcon?: boolean;
  sub?: string | number;
  onChange(props: { name: string; value: string }): void;
}

export default function Radio({
  className,
  label,
  value,
  selectedValue,
  id,
  name,
  disabled = false,
  iconSize = 'normal',
  visibleIcon = true,
  sub,
  onChange,
}: Props) {
  const checked = value === selectedValue;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange({ name, value: event.target.value });
  };

  return (
    <Label className={className} htmlFor={id.toString()}>
      <Input
        data-testid={`radio-${value}`}
        id={id.toString()}
        name={name}
        disabled={disabled}
        value={value}
        onChange={handleChange}
        checked={checked}
        type="radio"
      />
      {visibleIcon && <RadioIcon checked={checked} disabled={disabled} iconSize={iconSize} />}
      <Text aria-labelledby={id.toString()}>{label}</Text>
      {sub && <Sub>{sub}</Sub>}
    </Label>
  );
}
