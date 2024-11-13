import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { SelectionCriteria } from '../../../../shared/api/events/member/benefit.api';

const Container = styled.div`
  margin-bottom: 20px;
  padding: 11px 16px;
  border-radius: 10px;
  background-color: ${COLOR.mykurlyBg};

  .item {
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
    font-weight: 400;
    line-height: 20px;
    color: ${COLOR.mainSecondary};
  }
  .emph-txt {
    color: ${COLOR.kurlyBlack};
  }
`;

interface Props {
  selectionCriteria: SelectionCriteria[];
}

export default function VipSelectionCroteria({ selectionCriteria }: Props) {
  return (
    <Container>
      {selectionCriteria.map(({ title, text }) => (
        <div key={title} className="item">
          {title}
          <span className="emph-txt">{text}</span>
        </div>
      ))}
    </Container>
  );
}
