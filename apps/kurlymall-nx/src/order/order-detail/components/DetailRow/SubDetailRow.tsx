import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';
import { Typography } from '@thefarmersfront/kpds-react';
import { ReactNode } from 'react';

const Row = styled.div<{ justifyContent?: string; margin?: string }>`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent};
  margin: ${({ margin }) => margin};
  align-items: center;
`;

const ColoredTypography = styled(Typography)<{ color: string; margin?: string }>`
  color: ${({ color }) => color};
  margin: ${({ margin }) => margin};
`;

/**TODO_ORDER 아이콘 추후 이관 필요 */
const MoreInfo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4.6665 10H11.3332V11.3333H4.6665V10Z" fill="#BCC4CC" />
    <path d="M6 4.66669L6 11.3334L4.66667 11.3334L4.66667 4.66669L6 4.66669Z" fill="#BCC4CC" />
  </svg>
);

interface Props {
  title: string;
  content: ReactNode;
  margin?: string;
}

const SubDetailRow = ({ title, content, margin }: Props) => (
  <Row justifyContent="space-between" margin={margin}>
    <Row>
      <MoreInfo />
      <ColoredTypography variant="$xlargeRegular" color={vars.color.text.$quaternary}>
        {title}
      </ColoredTypography>
    </Row>
    <ColoredTypography variant="$xlargeRegular" color={vars.color.text.$tertiary}>
      {content}
    </ColoredTypography>
  </Row>
);

export default SubDetailRow;
