import styled from '@emotion/styled';

import { RECOMMEND_MESSAGE_SEARCH } from '../../../../search/shared/constants';

import COLOR from '../../../../shared/constant/colorset';
import { QuestionMark } from '../../../../shared/icons';
import { zIndex } from '../../../../shared/styles';
import { RECOMMEND_MESSAGE } from '../../shared/constants';

const RecommendWrap = styled.div`
  height: 20px;
  margin-left: 5px;

  &:hover {
    div {
      display: block;
    }
  }
`;

const RecommendDetail = styled.div`
  display: none;
  position: absolute;
  top: 36px;
  left: -6px;
  z-index: ${zIndex.productDetailListFilter};
  max-width: 272px;
  padding: 14px;
  border: 1px solid ${COLOR.kurlyGray800};
  border-radius: 3px;
  background: ${COLOR.kurlyWhite};
  color: ${COLOR.kurlyGray600};
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0;
`;

interface Props {
  section: string;
}

export default function RecommendView({ section }: Props) {
  return (
    <RecommendWrap>
      <QuestionMark height={20} stroke={COLOR.kurlyGray350} fill={COLOR.kurlyGray350} />
      <RecommendDetail>{section === 'search' ? RECOMMEND_MESSAGE_SEARCH : RECOMMEND_MESSAGE}</RecommendDetail>
    </RecommendWrap>
  );
}
