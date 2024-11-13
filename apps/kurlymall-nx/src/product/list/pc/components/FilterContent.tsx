import styled from '@emotion/styled';
import { useState } from 'react';

import COLOR from '../../../../shared/constant/colorset';
import { CheckBoxActive, CheckBoxInactive, RadioButtonActive, RadioButtonInActive } from '../../../../shared/icons';
import { multiMaxLineText } from '../../../../shared/utils';
import type { FilterTemplate } from '../../types';
import { FILTER_TEMPLATE } from '../../types';

const FilterContentWrapper = styled.div<{ isIcon: boolean }>`
  display: flex;
  align-items: center;
  ${({ isIcon }) =>
    isIcon &&
    `
    margin: -3px 0 -4px;
  `}
`;

const FilterName = styled.span`
  margin-right: 4px;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: ${COLOR.kurlyGray800};
  ${multiMaxLineText(2)};
  &:hover {
    color: ${COLOR.loversLavender};
  }
`;

const ValueCount = styled.span`
  flex-shrink: 0;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${COLOR.kurlyGray350};
`;

const CheckBoxButton = styled.button`
  display: flex;
  align-items: center;
  margin-right: 8px;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 4px;
  border-radius: 50%;
  vertical-align: -6px;
  object-fit: cover;
`;

interface Props {
  template: FilterTemplate;
  isActive: boolean;
  name: string;
  productCounts: number;
  iconUrl: string | null;
}

const CheckBox = ({ isActive }: { isActive: boolean }) => {
  return isActive ? <CheckBoxActive /> : <CheckBoxInactive />;
};

const RadioButton = ({ isActive }: { isActive: boolean }) => {
  return isActive ? (
    <RadioButtonActive fillWhite={COLOR.kurlyWhite} fillPurple={COLOR.kurlyPurple} />
  ) : (
    <RadioButtonInActive />
  );
};

export default function FilterContent({ template, isActive, name, productCounts, iconUrl }: Props) {
  const [hasIcon, setHasIcon] = useState(iconUrl);

  return (
    <FilterContentWrapper isIcon={!!hasIcon}>
      <CheckBoxButton>
        {template === FILTER_TEMPLATE.CHECKBOX ||
        template === FILTER_TEMPLATE.SORTED_CHECKBOX ||
        template === FILTER_TEMPLATE.PROMOTION ? (
          <CheckBox isActive={isActive} />
        ) : null}
        {template === FILTER_TEMPLATE.RADIO_BUTTON ? <RadioButton isActive={isActive} /> : null}
      </CheckBoxButton>
      <FilterName>
        {hasIcon ? <Icon src={hasIcon} alt="아이콘" onError={() => setHasIcon('')} /> : null}
        {name}
      </FilterName>
      {productCounts > 0 && <ValueCount>{productCounts}</ValueCount>}
    </FilterContentWrapper>
  );
}
