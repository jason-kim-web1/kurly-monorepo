import styled from '@emotion/styled';

import { ReactNode } from 'react';

import { SerializedStyles } from '@emotion/react';

import { isPC } from '../../../../../util/window/getDevice';
import { TableTermsHead } from './TableTermsHead';
import { TableTerms } from '../../../../shared/constant/checkout-terms';
import { TableTermsDescription } from './TableTermsDescription';

const Wrapper = styled.div`
  max-height: 50vh;

  ${isPC &&
  `
    max-height: 464px;
    max-width: 365px;
  `}
`;

const SubTitle = styled.div`
  font-size: 16px;
  font-weight: ${isPC ? 500 : 600};
  line-height: 21px;
  padding: 6px 0px 8px;
`;

const Table = styled.table`
  width: 100%;
  table-layout: fixed;

  > thead,
  th,
  tr,
  td {
    border: 1px solid #ddd;
    padding: 10px;
    letter-spacing: -0.5px;
    text-align: center;
  }
`;

interface Props {
  terms: TableTerms;
  contents: ReactNode;
  styles?: SerializedStyles;
}

export function TableTermsContent({ terms, contents, styles }: Props) {
  const { subTitle, tableHead, decsription } = terms;

  return (
    <Wrapper css={styles}>
      {subTitle && <SubTitle>{subTitle}</SubTitle>}
      <Table>
        <TableTermsHead tableHead={tableHead} />
        {contents}
      </Table>
      {decsription && <TableTermsDescription blackDesc={decsription.black} grayDesc={decsription.gray} />}
    </Wrapper>
  );
}
