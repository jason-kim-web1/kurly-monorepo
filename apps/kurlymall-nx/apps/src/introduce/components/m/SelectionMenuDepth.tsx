import styled from '@emotion/styled';

import { SubMenuInfo } from '../../interfaces';
import SubMenuItem from './SubMenuItem';

const Container = styled.div`
  display: flex;
  padding-bottom: 10px;
`;

const SubMenuList = styled.div`
  padding: 0 10px 20px 24px;
  min-width: 50%;
  font-size: 14px;
`;

const Title = styled.div`
  padding-top: 5px;
`;

interface Props {
  subMenuInfo: SubMenuInfo[];
  onClick: (name: string) => void;
}

export default function SelectionMenuDepth({ subMenuInfo, onClick }: Props) {
  return (
    <Container>
      {subMenuInfo.map(({ id, title, lists }) => (
        <SubMenuList key={id}>
          {title && <Title>{title}</Title>}
          {lists && <SubMenuItem items={lists} onClick={onClick} />}
        </SubMenuList>
      ))}
    </Container>
  );
}
