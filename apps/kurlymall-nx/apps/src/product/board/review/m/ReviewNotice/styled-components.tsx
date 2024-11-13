import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';

export const NoticeBadge = styled.div`
  display: inline-block;
  width: 30px;
  height: 20px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 600;
  line-height: 20px;
  text-align: center;
  color: ${COLOR.kurlyGray800};
  background-color: ${COLOR.kurlyGray150};
`;

export const NoticeContents = styled.p`
  width: 100vw;
  padding: 16px 16px;
  margin-left: -16px;
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  text-align: left;
  background-color: ${COLOR.kurlyGray100};
  white-space: pre-line;
`;

export const NoticeListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 12px;
`;

export const NoticeRowHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 36px;
`;

export const NoticeTitle = styled.button`
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
`;
