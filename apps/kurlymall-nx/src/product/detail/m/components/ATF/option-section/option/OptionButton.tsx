import styled from '@emotion/styled';

import COLOR from '../../../../../../../shared/constant/colorset';

import { getMWOptionButtonOfType } from './optionButtonBuilder';

const OptionText = styled.span<{ selected: boolean; disabled: boolean }>`
  display: inline-block;
  overflow: hidden;
  min-width: 70px;
  max-width: ${({ selected }) => (selected ? 'auto' : '82px')};
  font-size: 14px;
  line-height: 19px;
  color: ${COLOR.kurlyGray800};
  vertical-align: top;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${({ selected }) => selected && `color: ${COLOR.kurlyPurple}; font-weight: 600`};
  ${({ disabled }) => disabled && `color: ${COLOR.kurlyGray350}; background-color: ${COLOR.kurlyGray100};`};
`;

const OptionImage = styled.span<{ thumbUrl: string; bgColor: string; disabled: boolean }>`
  overflow: hidden;
  width: 100%;
  height: 90px;
  border-radius: 8px 8px 0 0;
  background: ${(props) => props.bgColor} url(${(props) => props.thumbUrl}) no-repeat 50% 50%;
  background-size: cover;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
`;

const OptionTextWithImage = styled.span<{ selected: boolean; disabled: boolean }>`
  display: inline-block;
  padding: 7px 8px;
  width: 88px;
  font-size: 13px;
  color: ${COLOR.kurlyGray800};
  ${({ selected }) => selected && `color: ${COLOR.kurlyPurple}; font-weight: 600;`};
  ${({ disabled }) => disabled && `color: ${COLOR.kurlyGray350}; background-color: ${COLOR.kurlyGray100}`};
  border-radius: 0 0 8px 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 auto;
`;

interface Props {
  type: string;
  description: string | null;
  imageUrl?: string;
  selected: boolean;
  disabled: boolean;
  onClickOptionItem(): void;
}

export default function OptionButton({
  type,
  description,
  imageUrl = '',
  selected,
  disabled,
  onClickOptionItem,
}: Props) {
  const Button = getMWOptionButtonOfType(type);

  return (
    <Button selected={selected} isDisabled={disabled} onClick={onClickOptionItem}>
      {type === 'TEXT' && (
        <OptionText selected={selected} disabled={disabled}>
          {description}
        </OptionText>
      )}
      {type === 'IMAGE' && (
        <>
          {imageUrl && <OptionImage thumbUrl={imageUrl} bgColor={COLOR.kurlyGray200} disabled={disabled} />}
          <OptionTextWithImage selected={selected} disabled={disabled}>
            {description}
          </OptionTextWithImage>
        </>
      )}
    </Button>
  );
}
