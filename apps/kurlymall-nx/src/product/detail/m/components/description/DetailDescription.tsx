import styled from '@emotion/styled';

import type { PartnersContent } from '../../../types';
import KurlyDescription from './KurlyDescription';
import PartnersContents from '../../../shared/PartnersContents';

const Container = styled.div`
  width: 100%;
  padding: 0 6px;
`;

interface Props {
  legacyContent: string;
  partnersContent: PartnersContent;
}

export default function DetailDescription({ legacyContent, partnersContent }: Props) {
  return (
    <Container>
      {!!legacyContent ? <KurlyDescription contents={legacyContent} /> : null}
      {partnersContent ? <PartnersContents partnersContent={partnersContent} blockType="BODY" isPC={false} /> : null}
    </Container>
  );
}
