import styled from '@emotion/styled';
import { ReactNode } from 'react';

export interface Props {
  status: 'normal' | 'success' | 'error';
  text: ReactNode;
}

const style = {
  normal: {
    color: '#666',
    ':before': {
      display: 'inline-block',
      margin: '0 4px',
      content: '"\u00B7"',
    },
  },
  success: {
    color: '#0e851a',
    ':before': {
      display: 'inline-block',
      margin: '0 1px 0 0',
      fontSize: '12px',
      content: '"\u2713"',
    },
  },
  error: {
    color: '#b3130b',
    ':before': {
      display: 'inline-block',
      margin: '0 2px 0 0',
      fontSize: '12px',
      content: '"\u2715"',
    },
  },
};

const Text = styled.p<Pick<Props, 'status'>>(({ status }) => ({
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '19px',
  paddingTop: '8px',
  ...style[status],
}));

export default function HelperText({ status, text }: Props) {
  return (
    <Text key={`helper-text-${text}`} status={status}>
      {text}
    </Text>
  );
}
