import styled from '@emotion/styled';

import { css } from '@emotion/react';

import COLOR from '../../../../../shared/constant/colorset';
import { multiMaxLineText } from '../../../../../shared/utils';

export const ContentsProductName = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: ${COLOR.kurlyGray450};
  ${multiMaxLineText(1)}
`;

export const DealProductName = styled.span`
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  color: ${COLOR.kurlyGray800};
  ${multiMaxLineText(1)}
`;

export const Form = styled.form``;

export const FormContent = styled.div`
  position: relative;
  min-height: 411px;
  overflow: hidden;
  isolation: isolate;
`;

export const Label = styled.label<{ required?: boolean }>`
  position: relative;
  flex-shrink: 0;
  width: 70px;
  padding-top: 12px;
  line-height: 19px;
  color: ${COLOR.kurlyGray800};

  > span {
    position: absolute;
    top: 35px;
    left: 0;
    font-weight: 500;
    font-size: 11px;
    line-height: 13px;
    color: ${COLOR.kurlyGray350};
  }
`;

export const Product = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding-top: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${COLOR.bg};
`;

export const ProductName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ProductThumbnail = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 6px;
  object-fit: cover;
`;

export const InputField = styled.div`
  display: flex;
  gap: 30px;
  padding-top: 16px;

  :nth-of-type(1) {
    padding-top: 0;
  }
`;

export const defaultTextareaStyle = {
  height: 95,
  textColor: COLOR.kurlyGray800,
  placeholderColor: COLOR.placeholder,
  backgroundColor: COLOR.kurlyWhite,
  border: `solid 1px ${COLOR.lightGray}`,
  borderFocus: `solid 1px ${COLOR.kurlyGray800}`,
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '19px',
};

const Button = styled.button`
  width: 160px;
  height: 56px;
  padding: 0 10px;
  text-align: center;
  letter-spacing: 0;
  border-radius: 3px;
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
  margin-top: 14px;
`;

export const ButtonGroup = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  height: 106px;
  margin-top: 20px;
  border-top: 1px solid ${COLOR.bg};
  background-color: ${COLOR.kurlyWhite};
`;

export const CancelButton = styled(Button)`
  border: 1px solid ${COLOR.lightGray};
  background-color: white;
  color: ${COLOR.kurlyBlack};
`;

export const Description = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 7px;
`;

export const LoadingWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 40px;
  margin: auto;
`;

export const SubmitButton = styled(Button)<{ disabled?: boolean }>`
  color: ${COLOR.kurlyWhite};
  background-color: ${(props) => (props.disabled ? COLOR.lightGray : COLOR.kurlyPurple)};

  &[disabled] {
    background-color: ${COLOR.lightGray};
  }
`;

export const InstructionList = styled.ul`
  padding-left: 6px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: ${COLOR.kurlyGray450};
`;

export const InstructionItem = styled.li`
  line-height: 22px;
  list-style-type: '·';
  list-style-position: outside;
  padding-inline-start: 3px;
`;

export const ImageCounter = styled.span`
  font-weight: 500;
  font-size: 11px;
  line-height: 13px;
  color: ${COLOR.kurlyGray300};
`;

export const UploadCount = styled.span<{ isCount: boolean }>`
  ${({ isCount }) =>
    isCount &&
    css`
      color: ${COLOR.kurlyGray800};
    `}
`;
