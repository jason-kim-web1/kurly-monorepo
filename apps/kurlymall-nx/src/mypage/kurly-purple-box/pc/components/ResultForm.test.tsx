import { fireEvent, render } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ResultForm from './ResultForm';
import { usePersonalBoxDataFixture } from '../../shared/fixtures/fixtures';
import { useCompleteRequest, usePersonalBox } from '../../shared/hooks/usePersonalBoxQuery';
import useRequestState from '../../shared/hooks/useRequestState';
import useToggle from '../../../../order/checkout/shared/hooks/useToggle';
import { RequestState, textMap } from '../../shared/types/requestStateType';
import { ICON_CAMERA } from '../../shared/constants/imageUrl';
import COLOR from '../../../../shared/constant/colorset';

const queryClient = new QueryClient();
jest.mock('../../shared/hooks/usePersonalBoxQuery');
jest.mock('../../../../order/checkout/shared/hooks/useToggle');
jest.mock('../../shared/hooks/useRequestState');

const Fixture = {
  apply: true,
  imageUrl: ICON_CAMERA,
  reason: '',
};

describe('KurlyPurpleResultForm', () => {
  const handleClosePersonalBoxForm = jest.fn();
  const handleChangeResultForm = jest.fn();
  const handleToggle = jest.fn();
  const handleClose = jest.fn();

  given('usePersonalBox', () => ({
    data: usePersonalBoxDataFixture,
  }));
  given('isOpen', () => false);
  given('useCompleteRequest', () => ({
    data: false,
  }));
  given('title', () => textMap.request.title);
  given('message', () => textMap.request.message);

  beforeEach(() => {
    (usePersonalBox as jest.Mock).mockImplementation(() => given.usePersonalBox);
    (useCompleteRequest as jest.Mock).mockImplementation(() => given.useCompleteRequest);
    (useToggle as jest.Mock).mockImplementation(() => ({
      isOpen: given.isOpen,
      toggle: handleToggle,
      close: handleClose,
    }));
    (useRequestState as jest.Mock).mockImplementation(() => ({
      title: given.title,
      message: given.message,
    }));
  });

  const renderResultForm = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <ResultForm
          handleClosePersonalBoxForm={handleClosePersonalBoxForm}
          handleChangeResultForm={handleChangeResultForm}
        />
      </QueryClientProvider>,
    );

  it('신청가이드 문구를 확인할 수 있다', () => {
    const { container } = renderResultForm();

    expect(container).toHaveTextContent('확인해주세요');
    expect(container).toHaveTextContent('관리자 승인이 완료되면 다음 주문 시부터 보냉 박스를 이용 선택할 수 있어요.');
    expect(container).toHaveTextContent(
      '신청 사진의 상품 보관 적합 여부에 따라 승인이 거절될 수 있으며 관리자 승인은 개인 보냉 박스의 신선도 유지력을 보장하지 않습니다.',
    );
  });

  it('신청한 이미지를 미리보기로 볼 수 있다', () => {
    const { queryByRole } = renderResultForm();

    expect(queryByRole('img')).toHaveAttribute('src', ICON_CAMERA);
  });

  context('확인 중 상태인 경우 ', () => {
    it('확인중 관련 문구를 확인할 수 있다', () => {
      const { container } = renderResultForm();

      expect(container).toHaveTextContent(`${textMap.request.title}`);
      expect(container).toHaveTextContent(`${textMap.request.message}`);
    });

    it('프로그래스 바 컴포넌트가 렌더링 된다', () => {
      const { getByTestId } = renderResultForm();

      expect(getByTestId('state-bar')).toBeInTheDocument();
    });

    it('다시 신청하기 버튼을 볼 수 있다', () => {
      const { getByRole } = renderResultForm();

      expect(getByRole('button', { name: '다시 신청하기' })).toBeInTheDocument();
    });
  });

  context('신청 완료 상태인 경우 ', () => {
    given('useCompleteRequest', () => ({
      data: true,
    }));
    given('title', () => textMap.complete.title);
    given('message', () => textMap.complete.message);

    it('신청완료 관련 문구를 확인할 수 있다', () => {
      const { container } = renderResultForm();

      expect(container).toHaveTextContent(`${textMap.complete.title}`);
      expect(container).toHaveTextContent('승인 후 이용 가능합니다. 영업일 기준 최대 3일 소요될 수 있습니다.');
    });

    it('프로그래스 바 컴포넌트가 렌더링 되지 않는다', () => {
      const { queryByTestId } = renderResultForm();

      expect(queryByTestId('state-bar')).not.toBeInTheDocument();
    });

    it('신청 상세보기 버튼을 볼 수 있다', () => {
      const { getByRole } = renderResultForm();

      expect(getByRole('button', { name: '신청 상세보기' })).toBeInTheDocument();
    });
  });

  context('승인완료 상태인 경우 ', () => {
    given('useCompleteRequest', () => ({
      data: false,
    }));
    given('usePersonalBox', () => ({
      data: {
        ...Fixture,
        requestState: RequestState.APPROVED,
      },
    }));
    given('title', () => textMap.approved.title);
    given('message', () => textMap.approved.message);

    it('승인완료 관련 문구를 확인할 수 있다', () => {
      const { container } = renderResultForm();

      expect(container).toHaveTextContent(`${textMap.approved.title}`);
      expect(container).toHaveTextContent(`${textMap.approved.message}`);
    });

    it('프로그래스 바 컴포넌트가 렌더링 된다', () => {
      const { getByTestId } = renderResultForm();

      expect(getByTestId('state-bar')).toBeInTheDocument();
    });

    it('다시 신청하기 버튼을 볼 수 있다', () => {
      const { getByRole } = renderResultForm();

      expect(getByRole('button', { name: '다시 신청하기' })).toBeInTheDocument();
    });
  });

  context('승인거절 상태인 경우 ', () => {
    given('useCompleteRequest', () => ({
      data: false,
    }));
    given('usePersonalBox', () => ({
      data: {
        ...Fixture,
        requestState: RequestState.REJECTED,
      },
    }));
    given('title', () => textMap.rejected.title);
    given('message', () => textMap.rejected.message);

    it('승인거절 관련 문구를 확인할 수 있다', () => {
      const { container } = renderResultForm();

      expect(container).toHaveTextContent(`${textMap.rejected.title}`);
      expect(container).toHaveTextContent(`${textMap.rejected.message}`);
    });

    it(`타이틀의 컬러가 ${COLOR.invalidRed}로 나타난다`, () => {
      const { getByTestId } = renderResultForm();
      expect(getByTestId('title')).toHaveStyle(`color:${COLOR.invalidRed}`);
    });

    it('프로그래스 바 컴포넌트가 렌더링 된다', () => {
      const { getByTestId } = renderResultForm();

      expect(getByTestId('state-bar')).toBeInTheDocument();
    });

    it('다시 신청하기 버튼을 볼 수 있다', () => {
      const { getByRole } = renderResultForm();

      expect(getByRole('button', { name: '다시 신청하기' })).toBeInTheDocument();
    });
  });

  context('미리보기 이미지를 클릭하면', () => {
    it('toggle 함수가 호출된다', () => {
      const { getByAltText } = renderResultForm();

      fireEvent.click(getByAltText('Upload Image'));

      expect(handleToggle).toBeCalled();
    });
  });

  context('isOpen이 true가 되면', () => {
    given('isOpen', () => true);

    it('zoom Image 를 보여주는 컴포넌트가 렌더링 된다', () => {
      const { container } = renderResultForm();

      expect(container).toHaveTextContent('줌인 이미지 닫기');
    });
  });
});
