import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';

const Divider = styled.div<{ width: string; height: string; margin?: string; color?: string }>`
  min-width: ${({ width }) => width};
  min-height: ${({ height }) => height};
  margin: ${({ margin }) => margin ?? 0};
  background-color: ${({ color }) => color ?? vars.color.line.$line1};
`;

export default Divider;
