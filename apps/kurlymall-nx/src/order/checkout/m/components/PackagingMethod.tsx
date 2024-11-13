import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Radio from '../../../../shared/components/Input/Radio';

const RadioGroup = styled.div`
  padding: 16px 20px 20px;
`;

const radio = css`
  padding: 0;
  :not(:first-of-type) {
    margin-top: 24px;
  }
`;

interface Props {
  selectedValue: string;
  available: {
    kurlyBag: boolean;
    personalBag: boolean;
  };
  onChange(props: { name: string; value: string }): void;
}

export default function PackagingMethod({ selectedValue, available, onChange }: Props) {
  return (
    <RadioGroup>
      {available.kurlyBag && (
        <Radio
          css={radio}
          id="kurlyBag"
          name="select-bag"
          label="컬리 퍼플 박스"
          value="KURLY"
          selectedValue={selectedValue}
          onChange={onChange}
        />
      )}
      <Radio
        css={radio}
        id="paper"
        name="select-bag"
        label="종이 포장재"
        value="PAPER"
        selectedValue={selectedValue}
        onChange={onChange}
      />
      {available.personalBag && (
        <Radio
          css={radio}
          id="personalBag"
          name="select-bag"
          label="개인 보냉 박스"
          value="PERSONAL"
          selectedValue={selectedValue}
          onChange={onChange}
        />
      )}
    </RadioGroup>
  );
}
