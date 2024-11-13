import styled from '@emotion/styled';

export const ButtonFooterWrapper = styled.div`
  display: flex;
  align-content: space-between;
  width: 100%;
  > button + button {
    margin-left: 8px;
    span {
      font-weight: 600;
    }
  }
  margin-bottom: 8px;
  @supports (padding-bottom: constant(safe-area-inset-bottom)) {
    margin-bottom: calc(8px + constant(safe-area-inset-bottom));
  }
  @supports (padding-bottom: env(safe-area-inset-bottom)) {
    margin-bottom: calc(8px + env(safe-area-inset-bottom));
  }
`;
