import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';

import { addComma } from '../../../shared/services';

const TotalProductsCount = styled.div`
  font-size: 14px;
  align-self: center;
  color: ${COLOR.kurlyGray800};
  white-space: nowrap;
`;

interface Props {
  totalProductsCount: number;
}

export default function SearchProductsCount({ totalProductsCount }: Props) {
  return <TotalProductsCount>{`총 ${addComma(totalProductsCount)}개`}</TotalProductsCount>;
}
