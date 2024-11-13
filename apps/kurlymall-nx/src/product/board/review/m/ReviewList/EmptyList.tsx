import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';
import { MYPAGE_PATH, getPageUrl } from '../../../../../shared/constant';
import { redirectTo } from '../../../../../shared/reducers/page';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  gap: 24px;
  min-height: 360px;
`;

const Message = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  color: ${COLOR.kurlyGray400};
  align-self: center;
`;

const RouteButton = styled.button`
  width: 146px;
  height: 44px;
  border: 1px solid;
  border-radius: 22px;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: ${COLOR.kurlyPurple};
  align-self: center;
`;

export const EmptyList = () => {
  const dispatch = useDispatch();

  const handleClickRouteButton = () => {
    dispatch(
      redirectTo({
        url: getPageUrl(MYPAGE_PATH.review),
      }),
    );
  };

  return (
    <Wrap>
      <Message>따끈한 첫 후기를 기다리고 있어요.</Message>
      <RouteButton type="button" onClick={handleClickRouteButton}>
        작성 가능한 후기
      </RouteButton>
    </Wrap>
  );
};
