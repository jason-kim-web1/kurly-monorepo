import styled from '@emotion/styled';

import Arrow from '../../../../../shared/components/icons/Arrow';

const FoldButton = styled.button`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  padding: 4px 0;
  font-family: 'Noto Sans KR', serif;
  font-size: 12px;
  color: #999;
`;

const ArrowStyle = styled.span`
  margin-left: 3px;
  margin-top: -1px;
`;

interface Props {
  onClick(): void;
  folded: boolean;
}

export default function ShowMoreButton({ onClick, folded }: Props) {
  return (
    <FoldButton type="button" onClick={onClick}>
      {folded ? '더보기' : '접기'}
      <ArrowStyle>
        <Arrow isOpen={!folded} width={15} height={15} />
      </ArrowStyle>
    </FoldButton>
  );
}
