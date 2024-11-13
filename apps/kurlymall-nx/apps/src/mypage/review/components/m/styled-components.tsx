import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { multiMaxLineText } from '../../../../shared/utils';

export const DealProductName = styled.h2`
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  color: ${COLOR.kurlyGray800};
  ${multiMaxLineText(1)}
`;

export const ImageRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: flex-start;
  gap: 10px;
  padding: 0 20px;
`;

export const InstructionButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3.7px;
  font-weight: 600;
  font-size: 13px;
  line-height: 19px;
  color: ${COLOR.kurlyGray450};
`;

export const ProductInfo = styled.div`
  position: relative;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 12px;
  padding: 12px 26px 12px 20px;
  border-bottom: 8px solid ${COLOR.bg};
`;

export const ProductName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ContentsProductName = styled.h3`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${COLOR.kurlyGray450};
`;

export const Form = styled.form`
  padding: 0 20px 16px;
`;

export const FormTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
`;

export const FormTitle = styled.h4`
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  color: ${COLOR.kurlyGray800};
`;

export const FormPlaceholder = styled.div`
  font-weight: 400;
  font-size: 15px;
  line-height: 21px;
  color: ${COLOR.kurlyGray350};
`;

export const SubmitButton = styled.button`
  width: 100%;
  max-width: 360px;
  height: 52px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
  color: ${COLOR.kurlyWhite};
  background-color: ${COLOR.kurlyPurple};

  &[disabled] {
    background-color: ${COLOR.lightGray};
  }
`;
