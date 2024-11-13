import { ReactElement, ReactNode } from 'react';

import styled from '@emotion/styled';

import { MainSection } from '../../../interfaces/MainSection.interface';
import Contents from '../../shared/section/SectionContents';

const Container = styled(Contents)`
  width: 1050px;
  margin: 0 auto;
  padding: 40px 0;
`;

interface Props {
  section: MainSection<unknown>;
  children?: ReactNode;
  loadingLayer?: ReactElement;
  className?: string;
}

export default function SectionContents({ section, children, loadingLayer, className }: Props) {
  return (
    <Container className={className} section={section} loadingLayer={loadingLayer}>
      {children}
    </Container>
  );
}
