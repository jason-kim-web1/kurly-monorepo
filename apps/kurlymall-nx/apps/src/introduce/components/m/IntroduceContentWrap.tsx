import styled from '@emotion/styled';

import { PropsWithChildrenOnly } from '../../../shared/interfaces';

const Container = styled.div`
  padding: 30px 18px 40px;
`;

export default function IntroduceContentWrap({ children }: PropsWithChildrenOnly) {
  return <Container>{children}</Container>;
}
