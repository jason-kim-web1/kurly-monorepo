import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { useReviewDialogActions } from '../../contexts/ReviewDialogContext';
import { QuestionMark } from '../../../../shared/icons';

const InstructionButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 17px;
  right: 20px;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: ${COLOR.kurlyGray450};
  gap: 3.7px;
`;

export default function WritingInstructions() {
  const { openInstructionDialog } = useReviewDialogActions();

  return (
    <InstructionButton onClick={() => openInstructionDialog()}>
      <span>작성 시 유의사항</span>
      <QuestionMark width={12.6} height={12.6} />
    </InstructionButton>
  );
}
