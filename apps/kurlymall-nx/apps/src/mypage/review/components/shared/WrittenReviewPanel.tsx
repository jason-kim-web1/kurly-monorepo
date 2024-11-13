import styled from '@emotion/styled';
import { eq } from 'lodash';

import SkeletonLoading from '../../../../shared/components/Loading/SkeletonLoading';

import { useWrittenReviewCount } from '../../hooks';
import { useTabState } from '../../contexts/TabContext';
import { PanelFlex, TotalNumber } from './styled-components';
import WrittenReviewList from './WrittenReviewList';
import { addComma } from '../../../../shared/services';
import { isPC } from '../../../../../util/window/getDevice';
import WritingInstructions from '../pc/WritingInstructions';

const Wrapper = styled.section`
  position: relative;
  height: 100%;
  padding: 16px 20px;
`;

export default function WrittenReviewPanel() {
  const selectedTabIndex = useTabState();
  const { writtenReviewCount, isLoading, isSuccess } = useWrittenReviewCount();

  const renderWrittenReviewCount = () => {
    if (isLoading) {
      return <SkeletonLoading width={40} height={18} />;
    }
    if (isSuccess && eq(writtenReviewCount, 0)) {
      return null;
    }
    return (
      <>
        <TotalNumber>총 {addComma(writtenReviewCount)}개</TotalNumber>
        {isPC && <WritingInstructions />}
      </>
    );
  };

  return selectedTabIndex ? (
    <PanelFlex isPC={isPC}>
      <Wrapper>
        {renderWrittenReviewCount()}
        <WrittenReviewList />
      </Wrapper>
    </PanelFlex>
  ) : null;
}
