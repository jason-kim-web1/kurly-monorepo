import { isNull } from 'lodash';

import styled from '@emotion/styled';

import { useAppSelector } from '../../../shared/store';
import UserWithPlusIcon from '../../../shared/icons/UserWithPlusIcon';
import COLOR from '../../../shared/constant/colorset';
import { JOIN_ORDER_TYPE, JoinOrderMeta } from '../../../shared/interfaces';

const Wrapper = styled.div`
  padding: 20px 34px 16px;
  font-weight: 600;
  border-bottom: 8px solid ${COLOR.bg};
`;

const HeaderTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  font-size: 16px;
  margin-bottom: 8px;
  color: ${COLOR.joinOrderPeopleColor};
`;

const Contents = styled.div`
  color: ${COLOR.kurlyGray450};
  white-space: pre-wrap;
  font-size: 12px;
  text-align: center;
  line-height: 16px;
`;

const informationText = (joinOrder: JoinOrderMeta) => {
  const { type, joinedPeopleCount, requiredPeopleCount } = joinOrder;

  if (type === JOIN_ORDER_TYPE.CREATED) {
    return {
      title: '함께구매 모집을 시작합니다.',
      content: `결제를 마치고 참여 링크를 공유해주세요.\n${requiredPeopleCount}명이 모집되면 배송이 시작됩니다.`,
    };
  }

  return {
    title: '함께구매에 참여합니다.',
    content: `함께구매 성공까지 ${
      requiredPeopleCount - joinedPeopleCount
    }명 남았어요.\n성공하면 참여자 모두에게 배송이 시작됩니다.`,
  };
};

export default function JoinOrderInformation() {
  const joinOrder = useAppSelector(({ checkout }) => checkout.joinOrder);

  if (isNull(joinOrder)) {
    return null;
  }

  const { title, content } = informationText(joinOrder);

  return (
    <Wrapper>
      <HeaderTitle>
        <UserWithPlusIcon />
        {title}
      </HeaderTitle>
      <Contents>{content}</Contents>
    </Wrapper>
  );
}
