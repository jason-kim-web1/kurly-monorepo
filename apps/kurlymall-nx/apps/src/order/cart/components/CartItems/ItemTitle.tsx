import styled from '@emotion/styled';
import { Typography } from '@thefarmersfront/kpds-react';
import { vars } from '@thefarmersfront/kpds-css';

import { memo } from 'react';

import { multiMaxLineText } from '../../../../shared/utils';
import ItemLink from './ItemLink';

const Title = styled(Typography)<{ disable: boolean }>`
  color: ${({ disable }) => (disable ? vars.color.text.$disabled : vars.color.text.$primary)};
  ${multiMaxLineText(3)};
`;

const SubTitle = styled(Typography)<{ disable: boolean }>`
  margin-top: ${vars.spacing.$4};
  color: ${({ disable }) => (disable ? vars.color.text.$disabled : vars.color.text.$tertiary)};
  ${multiMaxLineText(1)};
`;

const Wrapper = styled.div`
  position: relative;
  z-index: 1;
  margin-right: ${vars.spacing.$32};
`;

interface ItemTitleProps {
  title: string;
  subTitle: string;
  detailUrl?: string;
  disable?: boolean;
}

const ItemTitle = ({ title, subTitle, detailUrl, disable = false }: ItemTitleProps) => {
  return (
    <ItemLink detailUrl={detailUrl}>
      <Wrapper>
        <Title disable={disable} variant={`$xlargeRegular`}>
          {title}
        </Title>
        {subTitle && (
          <SubTitle disable={disable} variant={`$largeRegular`}>
            {subTitle}
          </SubTitle>
        )}
      </Wrapper>
    </ItemLink>
  );
};

export default memo(ItemTitle);
