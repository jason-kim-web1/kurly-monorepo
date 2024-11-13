import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';
import { ExclamationMark } from '../../../../../shared/icons';
import { FallbackView } from './FallbackView';
import { MYPAGE_PATH, getPageUrl } from '../../../../../shared/constant';
import { redirectTo } from '../../../../../shared/reducers/page';

const EmptyFallback = styled(FallbackView)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const EmptyText = styled.p`
  margin-top: 15px;
  margin-bottom: 28px;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  color: ${COLOR.kurlyGray400};
`;

const ReviewableButton = styled.button`
  width: 138px;
  height: 44px;
  border-radius: 22px;
  background-color: ${COLOR.kurlyPurple};
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: ${COLOR.kurlyWhite};
`;

export default function EmptyReviewList() {
  const dispatch = useDispatch();

  return (
    <EmptyFallback>
      <ExclamationMark />
      <EmptyText>따끈한 첫 후기를 기다리고 있어요.</EmptyText>
      <ReviewableButton
        onClick={() => {
          dispatch(
            redirectTo({
              url: getPageUrl(MYPAGE_PATH.review),
            }),
          );
        }}
      >
        작성 가능 후기
      </ReviewableButton>
    </EmptyFallback>
  );
}
