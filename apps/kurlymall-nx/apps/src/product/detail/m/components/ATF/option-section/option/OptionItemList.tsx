import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

import { GroupMemberSubOption } from '../../../../../types';

import COLOR from '../../../../../../../shared/constant/colorset';

import OptionButton from './OptionButton';
import { ChangeOptionItemProps, SelectedOptionType } from '../../../../../hooks/useGroupProduct';

const Title = styled.div`
  overflow: hidden;
  width: 100%;
  padding: 24px 16px 16px;
  font-weight: bold;
  font-size: 16px;
  color: ${COLOR.kurlyGray800};
  line-height: 21px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const List = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  overflow-x: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

export interface Option {
  id: number;
  value: string;
  name: string;
  disabled: boolean;
  imageUrl?: string;
}

interface Props {
  title: string;
  descriptionType: string;
  options: GroupMemberSubOption[];
  optionLength: number;
  selectedOption: SelectedOptionType;
  changeOptionItem({ option, optionPosition, optionsType }: ChangeOptionItemProps): void;
}

export default function OptionItemList({
  title,
  descriptionType,
  options,
  optionLength,
  selectedOption,
  changeOptionItem,
}: Props) {
  if (isEmpty(options)) {
    return null;
  }

  return (
    <>
      <Title>
        {title}({optionLength})
      </Title>
      <List>
        {options.map((option, index) => (
          <OptionButton
            key={index}
            type={descriptionType}
            description={option.description}
            imageUrl={option.imageUrl ?? ''}
            disabled={(option.isSoldOut ?? false) || !(option.isPurchaseStatus ?? true)}
            selected={option.description === selectedOption.description}
            onClickOptionItem={() => changeOptionItem({ option, optionPosition: index, optionsType: title })}
          />
        ))}
      </List>
    </>
  );
}
