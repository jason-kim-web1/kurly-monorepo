import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';
import { Typography } from '@thefarmersfront/kpds-react';
import { ReactNode } from 'react';

const Row = styled.div<{ justifyContent?: string }>`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: center;

  :not(:last-of-type) {
    margin-bottom: ${vars.spacing.$12};
  }
`;

const ColoredTypography = styled(Typography)<{ color: string; margin?: string }>`
  color: ${({ color }) => color};
  margin: ${({ margin }) => margin};
`;

interface Props {
  title: string;
  content: ReactNode;
  description?: ReactNode;
}

const RegularDetailRow = ({ title, content, description }: Props) => (
  <Row justifyContent="space-between">
    <ColoredTypography variant="$xlargeRegular" color={vars.color.text.$tertiary}>
      {title}
    </ColoredTypography>
    <Row>
      {description && (
        <ColoredTypography
          variant="$largeRegular"
          color={vars.color.text.$quaternary}
          margin={`0 ${vars.spacing.$8} 0 0`}
        >
          {description}
        </ColoredTypography>
      )}
      <ColoredTypography variant="$xlargeRegular" color={vars.color.text.$secondary}>
        {content}
      </ColoredTypography>
    </Row>
  </Row>
);

export default RegularDetailRow;
