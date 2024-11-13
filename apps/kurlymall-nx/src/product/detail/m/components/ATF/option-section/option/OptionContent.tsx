import styled from '@emotion/styled';

import { GroupKey, GroupMember } from '../../../../../types';
import useGroupProduct from '../../../../../hooks/useGroupProduct';

import OptionItemList from './OptionItemList';

const Container = styled.div`
  padding-bottom: 24px;
`;

interface Props {
  productNo: number;
  groupKeys: GroupKey[];
  groupMembers: GroupMember[];
}

export default function OptionContent({ productNo, groupKeys, groupMembers }: Props) {
  const { optionList, changeOptionItem } = useGroupProduct({ productNo, groupKeys, groupMembers });

  return (
    <Container>
      {optionList.map(({ title, descriptionType, options, selectedOption }, i) => (
        <OptionItemList
          key={i}
          title={title}
          descriptionType={descriptionType}
          options={options}
          optionLength={options.length}
          selectedOption={selectedOption}
          changeOptionItem={changeOptionItem}
        />
      ))}
    </Container>
  );
}
