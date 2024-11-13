import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';
import { Typography } from '@thefarmersfront/kpds-react';
import { ReactNode } from 'react';

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  :not(:last-of-type) {
    margin-bottom: ${vars.spacing.$12};
  }
`;

interface Props {
  title: string;
  content: ReactNode;
}

const BoldDetailRow = ({ title, content }: Props) => (
  <Row>
    <Typography variant="$xlargeSemibold">{title}</Typography>
    <Typography variant="$xlargeSemibold">{content}</Typography>
  </Row>
);

export default BoldDetailRow;
