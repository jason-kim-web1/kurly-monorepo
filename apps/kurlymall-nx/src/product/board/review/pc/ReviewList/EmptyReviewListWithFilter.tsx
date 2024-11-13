import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';
import { useFilters } from '../../context/ReviewSearchOptionContext';
import { Reset } from '../../../../../shared/icons';
import { CautionIcon } from '../../../../../shared/components/icons/svg/CautionIcon';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 60px;
`;

const CautionIconWrap = styled.div`
  margin-bottom: 18px;
`;

const Message = styled.p`
  line-height: 20px;
  margin-bottom: 24px;
  font-size: 16px;
  color: ${COLOR.kurlyGray400};
`;

const ResetFilterButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 20px;
  gap: 10px;
  background: ${COLOR.kurlyPurple};
  border-radius: 22px;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: ${COLOR.kurlyWhite};
`;

export const EmptyListWithFilter = () => {
  const [, { resetFilters }] = useFilters();
  return (
    <Wrap>
      <CautionIconWrap>
        <CautionIcon />
      </CautionIconWrap>
      <Message>선택하신 필터와 일치하는 후기가 없습니다.</Message>
      <ResetFilterButton type="button" onClick={resetFilters}>
        <Reset width={12.8} height={12.8} stroke={COLOR.kurlyWhite} />
        <span>필터 초기화</span>
      </ResetFilterButton>
    </Wrap>
  );
};
