export type RequestStateType = 'REQUESTED' | 'APPROVED' | 'REJECTED';

export const RequestState: Record<RequestStateType, RequestStateType> = {
  REQUESTED: 'REQUESTED',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};

type TextType = 'complete' | 'request' | 'approved' | 'rejected';

interface TextTypeOption {
  title: string;
  message: string;
}

export const textMap: Record<Partial<TextType>, TextTypeOption> = {
  complete: {
    title: '신청 완료되었습니다.',
    message: '승인 후 이용 가능합니다.\n영업일 기준 최대 3일 소요될 수 있습니다.',
  },
  request: {
    title: '사진 확인중입니다.',
    message: '영업일 기준 최대 3일 소요될 수 있습니다.',
  },
  approved: {
    title: '승인 완료되었습니다.',
    message: '개인 보냉 박스 이용이 가능합니다.',
  },
  rejected: {
    title: '승인 거절되었습니다.',
    message: '가이드에 맞는 사진을 다시 등록해주세요.',
  },
};
