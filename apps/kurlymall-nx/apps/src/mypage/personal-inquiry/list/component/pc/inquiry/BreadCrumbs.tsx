import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { isEmpty } from 'lodash';

import ArrowRight from '../../../../../../shared/components/icons/ArrowRight';
import COLOR from '../../../../../../shared/constant/colorset';

const Container = styled.div`
  display: flex;
  align-items: center;
  line-height: 20px;
  letter-spacing: -0.075em;
  margin-bottom: 20px;
`;

const Text = styled.span`
  font-size: 14px;
  font-family: 'Noto Sans KR', serif;
  color: ${COLOR.kurlyGray450};
`;

const arrowStyle = css`
  margin: 0 5px;
`;

interface Props {
  category: string;
  subCategory: string;
  className?: string;
}

export default function BreadCrumbs({ category, subCategory, className }: Props) {
  return (
    <Container className={className}>
      <Text>{category}</Text>
      {!isEmpty(subCategory) && (
        <>
          <ArrowRight css={arrowStyle} />
          <Text>{subCategory}</Text>
        </>
      )}
    </Container>
  );
}
