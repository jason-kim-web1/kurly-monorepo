import { useAppSelector } from '../../../shared/store';
import { JOIN_ORDER_STATUS } from '../../../shared/interfaces';

export default function useSuccessMessage() {
  const { requiredPeopleCount, joinedPeopleCount, isLastJoin } = useAppSelector(({ payments }) => ({
    requiredPeopleCount: payments.paymentsResult.joinOrderMeta?.requiredPeopleCount,
    joinedPeopleCount: payments.paymentsResult.joinOrderMeta?.joinedPeopleCount,
    isLastJoin: payments.paymentsResult.joinOrderMeta?.status === JOIN_ORDER_STATUS.COMPLETED,
  }));

  if (!requiredPeopleCount || !joinedPeopleCount) {
    return { title: '', description: '' };
  }

  //마지막 참여자
  if (isLastJoin) {
    return {
      title: '함께구매에 성공하였습니다.',
      description: '참여자 모두에게 배송이 시작됩니다.',
    };
  }

  //생성자, 중간참여자
  const peopleCount = requiredPeopleCount - joinedPeopleCount;
  return {
    title: '친구에게 참여 링크를 공유해보세요.',
    description: `${peopleCount}명을 더 모집하면 배송이 시작됩니다.`,
  };
}
