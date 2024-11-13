import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';
import { Typography } from '@thefarmersfront/kpds-react';
import { memo } from 'react';

const NoticeText = styled(Typography)`
  color: ${vars.color.main.$primary};
`;

const ExpiredDateNotice = ({ expiredDate }: { expiredDate?: string }) => {
  if (!expiredDate) {
    return null;
  }

  return (
    <NoticeText variant={`$largeSemibold`} as={'p'}>
      {expiredDate}까지 구매가능
    </NoticeText>
  );
};

export default memo(ExpiredDateNotice);
