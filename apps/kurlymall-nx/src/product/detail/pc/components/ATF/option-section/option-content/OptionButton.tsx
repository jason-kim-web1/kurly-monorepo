import styled from '@emotion/styled';

import COLOR from '../../../../../../../shared/constant/colorset';

import { getPCOptionButtonOfType } from './optionButtonBuilder';

const ImageContent = styled.span<{ thumbUrl: string; bgColor: string; disabled: boolean }>`
  width: 100%;
  height: 100%;
  background: ${(props) => props.bgColor} url(${(props) => props.thumbUrl}) no-repeat 50% 50%;
  background-size: cover;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  border-radius: 6px;
`;

const TextContent = styled.span<{ selected: boolean; disabled: boolean }>`
  display: inline-block;
  overflow: hidden;
  max-width: ${({ selected }) => (selected ? 'auto' : '100px')};
  font-size: 13px;
  color: ${COLOR.kurlyGray800};
  letter-spacing: -0.5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 12px;
  ${({ selected }) => selected && `color: ${COLOR.kurlyPurple}; font-weight: 500;`};
  ${({ disabled }) => disabled && `color: ${COLOR.kurlyGray350}; font-weight: 400;`};
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
  const Button = getPCOptionButtonOfType(type);

  return (
    <Button selected={selected} onClick={onClickOptionItem} isDisabled={disabled}>
      {type === 'TEXT' && (
        <TextContent selected={selected} disabled={disabled}>
          {description}
        </TextContent>
      )}
      {type === 'IMAGE' && <ImageContent thumbUrl={imageUrl} bgColor={COLOR.kurlyGray200} disabled={disabled} />}
    </Button>
  );
}
