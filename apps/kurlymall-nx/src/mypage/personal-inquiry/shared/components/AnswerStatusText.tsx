import styled from '@emotion/styled';

import { PersonalInquiryListItemState } from '../../list/types';

const statuses = {
  COMPLETE: {
    color: '#5f0080',
    text: '답변완료',
  },
  PENDING: {
    color: '#999',
    text: '답변대기',
  },
  NONE: {
    color: '#999',
    text: '-',
  },
};

const Text = styled.span(({ color }) => ({
  color,
}));

interface Props {
  status: PersonalInquiryListItemState;
}

export default function AnswerStatusText({ status }: Props) {
  const { color, text } = statuses[status];

  return <Text color={color}>{text}</Text>;
}
