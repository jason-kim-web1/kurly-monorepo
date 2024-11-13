import styled from '@emotion/styled';

import SkeletonLoading from '../../../shared/components/Loading/SkeletonLoading';

const PageTitle = styled.div<{ isPcStyle: boolean }>`
  ${({ isPcStyle }) =>
    isPcStyle &&
    `
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1050px;
  margin: 0 auto;
  padding: 51px 0 20px;
  font-weight: 500;
  font-size: 28px;
  line-height: 35px;
  text-align: center;
`}
`;

interface Props {
  title?: string;
  width?: number;
  height?: number;
  isPC?: boolean;
  isLoading: boolean;
  isError: boolean;
}

export default function MainSubPageTitle({ title, width, height, isLoading, isError, isPC = false }: Props) {
  if (isError) {
    return null;
  }
  return (
    <PageTitle isPcStyle={isPC}>{isLoading ? <SkeletonLoading width={width} height={height} /> : title}</PageTitle>
  );
}
