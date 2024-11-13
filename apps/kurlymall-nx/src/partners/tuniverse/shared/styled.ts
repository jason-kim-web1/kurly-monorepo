import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  @media screen and (max-height: 558px) {
    align-items: flex-start;
    position: static;
    padding: 30px 0;
  }
`;

export const BridgeContent = styled.div`
  margin: 0;
  max-width: 414px;
  padding: 0 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 28px;
`;

export const WrapLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .center-icon {
    margin: 0 10px 0 12px;
  }
`;

export const HeaderText = styled.div`
  font-size: 24px;
  font-weight: 400;
  line-height: 1.25;
  text-align: center;

  b {
    font-weight: 600;
  }
`;

export const WrapImg = styled.div`
  width: 100%;
  position: relative;
  height: 136px;

  span {
    border-radius: 8px;
  }
`;

export const Notice = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  .item {
    display: flex;
    align-items: flex-start;

    font-size: 14px;
    font-weight: 400;
    line-height: 19px;

    b {
      font-weight: 600;
      color: ${COLOR.kurlyPurple};
    }
  }
`;

export const AlertContent = styled.div`
  h3 {
    font-size: 18px;
    font-weight: 600;
    line-height: 23px;
    padding-bottom: 16px;
  }

  p {
    font-weight: 400;
    color: ${COLOR.kurlyGray600};
    padding-bottom: 20px;
  }

  .buttons {
    display: flex;
    gap: 8px;
    margin: 0 -8px;
    padding: 8px 0 16px;
  }
`;

export const AlertSuccessContent = styled(AlertContent)`
  p {
    padding-bottom: 16px;
  }

  .buttons {
    flex-direction: column;
    gap: 12px;
  }
`;

export const ButtonArea = styled.div`
  margin: 0 18px;
`;
