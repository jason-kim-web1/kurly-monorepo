import styled from '@emotion/styled';
import { concat } from 'lodash';

import COLOR from '../../../../shared/constant/colorset';
import { asset10x16C999 } from '../../../../shared/images';
import { REVIEW_INSTRUCTION_LIST, REVIEW_MODIFICATION_INSTRUCTION_LIST } from '../../constants';

export const Wrap = styled.ul`
  margin-top: 12px;
  padding: 0 20px 20px;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: ${COLOR.kurlyGray450};
`;

export const ReviewInstructionItem = styled.li`
  position: relative;
  padding-left: 12px;
  :before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 10px;
    height: 16px;
    background: url(${asset10x16C999}) no-repeat 50% 50%;
  }
`;

interface Props {
  isModification?: boolean;
}

export const ReviewInstructionList = ({ isModification = false }: Props) => {
  const instructionList = isModification
    ? concat(REVIEW_INSTRUCTION_LIST, REVIEW_MODIFICATION_INSTRUCTION_LIST)
    : REVIEW_INSTRUCTION_LIST;
  return (
    <Wrap>
      {instructionList.map((text, index) => (
        <ReviewInstructionItem key={`review-instruction-${index}`}>{text}</ReviewInstructionItem>
      ))}
    </Wrap>
  );
};
