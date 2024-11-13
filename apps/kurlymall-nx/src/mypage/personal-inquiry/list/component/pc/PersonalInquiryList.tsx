import { isEmpty } from 'lodash';
import styled from '@emotion/styled';

import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { css } from '@emotion/react';

import PersonalInquiryNotices from './PersonalInquiryNotices';
import PersonalInquiries from './PersonalInquiries';
import Button from '../../../../../shared/components/Button/Button';
import { BoardList } from '../../../../../board/components/pc/List';

import { AppState } from '../../../../../shared/store';
import { loadPersonalInquiryItems, modifyPagination } from '../../slice';
import PersonalInquiryListPagination from './PersonalInquiryListPagination';
import { SelectMyKurlyPersonalInquiryChannel } from '../../../../../shared/amplitude/events/mypage';
import { amplitudeService } from '../../../../../shared/amplitude';
import { INQUIRY_PATH, getPageUrl } from '../../../../../shared/constant';
import { redirectTo } from '../../../../../shared/reducers/page';

const USER_INQUIRY_PAGE_SIZE = 10;

const Footer = styled.div`
  position: relative;
  min-height: 44px;
  margin-top: 20px;
  text-align: center;
  > button {
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;

const button = css`
  span {
    font-size: 13px;
  }
`;

export default function PersonalInquiryList() {
  const listState = useSelector((app: AppState) => app.personalInquiryList);
  const { items, loading, error, pagination } = listState;
  const { pageNo, isFullyLoaded } = pagination;
  const dispatch = useDispatch();

  const handlePrev = () => {
    const pageNumber = pageNo - 1;
    dispatch(
      modifyPagination({
        pageNo: pageNumber <= 1 ? 1 : pageNumber,
      }),
    );
  };

  const handleNext = () => {
    const pageNumber = pageNo + 1;

    if (!isFullyLoaded) {
      dispatch(loadPersonalInquiryItems(pageNumber, USER_INQUIRY_PAGE_SIZE));
    }

    dispatch(
      modifyPagination({
        pageNo: pageNumber,
      }),
    );
  };

  const handleCreate = async () => {
    amplitudeService.logEvent(new SelectMyKurlyPersonalInquiryChannel({ selectionType: 'kurly_one_by_one' }));

    dispatch(
      redirectTo({
        url: getPageUrl(INQUIRY_PATH.form),
      }),
    );
  };

  useEffect(() => {
    dispatch(loadPersonalInquiryItems(1, USER_INQUIRY_PAGE_SIZE));
  }, [dispatch]);

  const startIndex = (pageNo - 1) * USER_INQUIRY_PAGE_SIZE;
  const personalInquiryNoticeItems = items.filter((item) => item.type === 'NOTICE');
  const personalInquiryItems = items
    .filter((item) => item.type === 'NORMAL')
    .slice(startIndex, startIndex + USER_INQUIRY_PAGE_SIZE);

  return (
    <>
      <BoardList>
        <BoardList.Header>
          <BoardList.Header.Row grow={1}>제목</BoardList.Header.Row>
          <BoardList.Header.Row width={100}>작성일</BoardList.Header.Row>
          <BoardList.Header.Row width={100}>답변상태</BoardList.Header.Row>
        </BoardList.Header>
        <BoardList.Contents isLoading={loading} isError={error} isEmpty={isEmpty(items)}>
          <PersonalInquiryNotices items={personalInquiryNoticeItems} />
          <PersonalInquiries items={personalInquiryItems} loading={loading} />
        </BoardList.Contents>
      </BoardList>
      <Footer>
        <PersonalInquiryListPagination
          listState={listState}
          onClickPrevious={handlePrev}
          onClickNext={handleNext}
          pageSize={USER_INQUIRY_PAGE_SIZE}
        />
        <Button onClick={handleCreate} text="문의하기" width={120} height={44} radius={3} css={button} />
      </Footer>
    </>
  );
}
