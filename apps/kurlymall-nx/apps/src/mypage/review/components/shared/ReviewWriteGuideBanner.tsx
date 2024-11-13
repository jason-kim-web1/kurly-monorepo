import styled from '@emotion/styled';

import { isPC } from '../../../../../util/window/getDevice';
import COLOR from '../../../../shared/constant/colorset';
import InfoIcon from '../../../../shared/components/icons/InfoIcon';
import useDealPreviouslyReviewed from '../../../../product/board/review/hooks/useDealPreviouslyReviewed';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: ${isPC ? '50px' : '42px'};
  background-color: ${COLOR.kurlyGray100};
  border-radius: 6px;
  padding: 0 20px;
  margin-top: ${isPC ? '16px' : '0'};
`;

const Text = styled.p`
  font-size: 13px;
  line-height: 18px;
  color: ${COLOR.kurlyGray500};
  margin-left: 6px;
`;

interface Props {
  dealProductNo: number;
}

export default function ReviewWriteGuideBanner({ dealProductNo }: Props) {
  const { data, isLoading } = useDealPreviouslyReviewed(dealProductNo, { enabled: !!dealProductNo });

  const { status, message } = data;
  const isAlreadyReviewed = status === 'ALREADY';

  if (isLoading || !isAlreadyReviewed) {
    return null;
  }

  return isAlreadyReviewed && !!message ? (
    <Wrapper>
      <InfoIcon color={COLOR.kurlyGray500} />
      <Text>{message}</Text>
    </Wrapper>
  ) : null;
}
