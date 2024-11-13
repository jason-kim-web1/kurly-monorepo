import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';

export const AboutReview = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  padding-bottom: 14px;
`;

export const Contents = styled.div`
  padding: 10px 0 14px;
  word-break: break-word;
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  color: ${COLOR.kurlyGray800};
  white-space: pre-wrap;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ReviewWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 4px;
  padding-bottom: 14px;
`;

export const RegistrationDate = styled.span`
  font-size: 12px;
  line-height: 16px;
  color: ${COLOR.kurlyGray400};
`;

export const Reviewer = styled.span`
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  vertical-align: middle;
  color: ${COLOR.kurlyGray800};
`;

export const View = styled.div`
  padding: 20px 0 11px;
  border-bottom: 1px solid ${COLOR.kurlyGray150};
`;
