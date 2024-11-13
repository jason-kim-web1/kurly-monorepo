import { render } from '@testing-library/react';

import { useSelector } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import { getDefaultMiddleware } from '@reduxjs/toolkit';

import InquiryBoardItem from './InquiryBoardItem';

jest.mock('react-redux');

describe('InquiryBoardItem', () => {
  let store: MockStoreEnhanced<unknown>;

  const mockStore = configureStore(getDefaultMiddleware());

  beforeEach(() => {
    store = mockStore(() => ({
      productDetail: {
        // contentProductNo: 1234,
      },
      productList: {
        queryId: 'fsdfs23fdgg',
      },
    }));
    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
  });

  given('subject', () => '무야호');
  given('memberName', () => '무*호');
  given('contents', () => '무야호무야호');
  given('createdAt', () => '2022-02-21T03:49:20.000Z');
  given('comments', () => []);
  given('commentsCount', () => 0);
  given('isSecret', () => false);
  given('toggleSelected', () => false);

  const tbody = document.createElement('tbody');

  const handleClickItem = jest.fn();

  const renderInquiryBoardItem = () =>
    render(
      <InquiryBoardItem
        type="POST"
        id={1234}
        subject={given.subject}
        memberName={given.memberName}
        contents={given.contents}
        createdAt={given.createdAt}
        comments={given.comments}
        commentsCount={given.commentsCount}
        isSecret={given.isSecret}
        toggleSelected={given.toggleSelected}
        isMyPost={false}
        onClick={handleClickItem}
      />,
      { container: document.body.appendChild(tbody) },
    );

  context('when post is secret', () => {
    given('isSecret', () => true);

    it('render secret subject text', () => {
      const { container } = renderInquiryBoardItem();

      expect(container).toHaveTextContent('비밀글입니다.');
    });
  });

  context('when comments are empty', () => {
    given('commentsCount', () => 0);

    it('render prepare status', () => {
      const { container } = renderInquiryBoardItem();

      expect(container).toHaveTextContent('답변대기');
    });
  });

  context('when comments have more than one item', () => {
    given('commentsCount', () => 1);

    it('render complete status', () => {
      const { container } = renderInquiryBoardItem();

      expect(container).toHaveTextContent('답변완료');
    });
  });

  context('when toggle selected is true', () => {
    given('toggleSelected', () => true);

    it('render contents', () => {
      const { getByText } = renderInquiryBoardItem();

      const element = getByText(given.contents);

      expect(element).toBeInTheDocument();
    });
  });

  context('when toggle selected is false', () => {
    given('toggleSelected', () => false);

    it('does not render contents', () => {
      const { queryByText } = renderInquiryBoardItem();
      const element = queryByText(given.contents);

      expect(element).not.toBeInTheDocument();
    });
  });
});
