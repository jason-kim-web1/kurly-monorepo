import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

import COLOR from '../../../../../../../shared/constant/colorset';

import { ChangeOptionItemProps, SelectedOptionType } from '../../../../../hooks/useGroupProduct';
import { GroupMemberSubOption } from '../../../../../types';

import OptionButton from './OptionButton';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 17px 0;
  border-top: 1px solid ${COLOR.bg};
  line-height: 19px;
`;

const Title = styled.dt`
  width: 128px;
  font-size: 14px;
  color: ${COLOR.kurlyGray600};
  letter-spacing: -0.5px;
`;

const SelectBlock = styled.dd`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
`;

const SelectedItemName = styled.div`
  color: ${COLOR.kurlyGray800};
  margin-bottom: 12px;
  letter-spacing: -0.5px;
`;

const SelectItemsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

interface Props {
  title: string;
  descriptionType: string;
  options: GroupMemberSubOption[];
  selectedOption: SelectedOptionType;
  changeOptionItem({ option, optionPosition, optionsType }: ChangeOptionItemProps): void;
}

export default function OptionItemList({ title, descriptionType, options, selectedOption, changeOptionItem }: Props) {
  if (isEmpty(options)) {
    return null;
  }

  return (
    <Container>
      <Title>{title}</Title>
      <SelectBlock>
        <SelectedItemName>{selectedOption.description}</SelectedItemName>
        <SelectItemsWrapper>
          {options.map((option, index) => (
            <OptionButton
              key={index}
              type={descriptionType}
              description={option.description}
              imageUrl={option.imageUrl ?? ''}
              selected={option.description === selectedOption.description}
              disabled={(option.isSoldOut ?? false) || (!option.isPurchaseStatus ?? true)}
              onClickOptionItem={() =>
                changeOptionItem({
                  option,
                  optionPosition: index,
                  optionsType: title,
                })
              }
            />
          ))}
        </SelectItemsWrapper>
      </SelectBlock>
    </Container>
  );
}
