import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { vars } from '@thefarmersfront/kpds-css';

const Item = styled.div<{ isUsing: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .name {
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color: ${vars.color.text.$primary};
  }

  .date {
    font-weight: 400;
    line-height: 20px;
    color: ${vars.color.text.$quaternary};
  }

  .tag {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 72px;
    height: 36px;
    font-weight: 600;
    line-height: 20px;
    border-radius: 100px;

    ${({ isUsing }) =>
      isUsing
        ? css`
            background-color: ${vars.color.$mint100};
            color: ${vars.color.$mint950};
          `
        : css`
            background-color: ${vars.color.background.$background3};
            color: ${vars.color.text.$tertiary};
          `}
  }
`;

interface Props {
  name: string;
  startedAt: string;
  endedAt: string;
  status: string;
}

export default function FreeTicketItem({ name, startedAt, endedAt, status }: Props) {
  return (
    <Item isUsing={status === '사용중'}>
      <div>
        <div className="name">{name}</div>
        <div className="date">{`${startedAt} - ${endedAt}`}</div>
      </div>
      <div className="tag">{status}</div>
    </Item>
  );
}
