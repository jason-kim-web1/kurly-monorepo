import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { ContinuityMessageBasicStyle, ContinuityMessageReplaceStyle } from '../../shared/interfaces';
import Confirm from '../../../../shared/components/Alert/Confirm';
import ContinutyTextContent from './ContinutyTextContent';

const defaultFontWeight = {
  default: 400,
  bold: 500,
};

const Contents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px 0 0;
  white-space: pre-wrap;
`;

const Text = styled.p<{ color?: string; bold?: boolean }>`
  font-size: 18px;
  font-weight: ${({ bold }) => (bold ? defaultFontWeight.bold : defaultFontWeight.default)};
  line-height: 23px;
  color: ${({ color }) => (color ? color : COLOR.kurlyGray800)};
  text-align: center;
`;

const SubText = styled.p`
  width: 100%;
  background: #f9f6fc;
  border-radius: 3px;
  text-align: center;
  margin: 16px 0 8px;
  padding: 16px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: ${COLOR.loversLavender};
`;

const swalStyle = `
  .swal2-html-container {
    padding: 10px 30px;
  }

  .swal2-container {
    padding: 0 24px;
  }

  .swal2-popup {
    max-width: 440px;
    border-radius: 12px;
    padding: 0;
  }

  .swal2-content {
    padding: 0;
  }

  #swal2-content {
    > div:last-child {
      margin-top: 16px;
    }
  }

  .swal2-show {
    animation: none;
  }
`;

const buttonStyle = `
  .action-button {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    height: 56px;
    border-radius: 3px;

    &:nth-of-type(2) {
      margin-left: 8px;
    }

    > span {
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
    }
  }
`;

export default function ContinuityConfirm({
  message,
  subMessage,
  basicStyle,
  replaceStyles,
}: {
  message: string;
  subMessage?: string;
  basicStyle?: ContinuityMessageBasicStyle;
  replaceStyles?: ContinuityMessageReplaceStyle[];
}) {
  return Confirm({
    contents: (
      <Contents>
        <Text color={basicStyle?.color} bold={basicStyle?.bold}>
          <ContinutyTextContent message={message} basicStyle={basicStyle} replaceStyles={replaceStyles} />
        </Text>
        {subMessage && <SubText>{subMessage}</SubText>}
      </Contents>
    ),
    showRightButton: true,
    leftButtonText: '취소',
    rightButtonText: '결제하기',
    swalStyle,
    buttonStyle,
  });
}
