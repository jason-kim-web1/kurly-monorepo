import styled from '@emotion/styled';

import { css } from '@emotion/react';

import Button, { ButtonProps } from './Button';

interface Props {
  contents: ButtonProps[];
  isFixed?: boolean;
  className?: string;
}

const Wrapper = styled.div<{ isFixed?: boolean }>`
  ${({ isFixed }) =>
    isFixed
      ? css`
          position: fixed;
          bottom: 0;
          @supports (padding-bottom: constant(safe-area-inset-bottom)) {
            bottom: constant(safe-area-inset-bottom);
          }
          @supports (padding-bottom: env(safe-area-inset-bottom)) {
            bottom: env(safe-area-inset-bottom);
          }
          left: 0;
          width: 100%;
          display: flex;
          align-content: space-between;
          padding: 8px 12px;
          box-sizing: border-box;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
          > button {
            height: 52px;
          }
          > button + button {
            margin-left: 8px;
            span: {
              font-weight: 600;
            }
          }
        `
      : css`
          display: flex;
          align-content: space-between;
          width: 100%;
          > button + button {
            margin-left: 8px;
            span {
              font-weight: 600;
            }
          }
        `}
`;

export default function ButtonGroup({ contents, isFixed = false, className }: Props) {
  return (
    <Wrapper isFixed={isFixed} className={className}>
      {contents.map((value) => (
        <Button key={`button-group-${value.text}`} {...value} radius={6} />
      ))}
    </Wrapper>
  );
}
