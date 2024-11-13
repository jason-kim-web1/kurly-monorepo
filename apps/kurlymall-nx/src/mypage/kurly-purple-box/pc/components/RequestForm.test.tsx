import { fireEvent, render, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { usePersonalBoxFixture } from '../../shared/fixtures/fixtures';
import { usePersonalBox } from '../../shared/hooks/usePersonalBoxQuery';
import RequestForm from './RequestForm';
import usePersonalBoxAlertText from '../../shared/hooks/usePersonalBoxAlertText';
import {
  ERROR_MESSAGE,
  REQUEST_NEW_PERSONAL_BOX_TEXT,
  REQUEST_PERSONAL_BOX_TEXT,
  TERMS_OF_REQUEST,
} from '../../shared/constants/requestConstant';
import useImageFileUploader from '../../../../shared/hooks/useImageFileUploader';
import usePersonalBoxRequest from '../../shared/hooks/usePersonalBoxRequest';
import { ICON_CAMERA } from '../../shared/constants/imageUrl';
import Alert from '../../../../shared/components/Alert/Alert';
import { updatePersonalBox } from '../../../../shared/services/kurlyPurpleBox.service';

const queryClient = new QueryClient();

jest.mock('../../shared/hooks/usePersonalBoxQuery');
jest.mock('../../shared/hooks/usePersonalBoxAlertText');
jest.mock('../../../../shared/hooks/useImageFileUploader');
jest.mock('../../shared/hooks/usePersonalBoxRequest');
jest.mock('../../../../shared/components/Alert/Alert');
jest.mock('../../../../shared/services/kurlyPurpleBox.service');

const AlertFixture = {
  showCancelButton: true,
  allowOutsideClick: false,
};

describe('KurlyPurpleRequestForm', () => {
  const handleClosePersonalBoxForm = jest.fn();
  const handleChangeResultForm = jest.fn();
  const handleOpenZoomImageLayer = jest.fn();

  given('usePersonalBox', () => ({
    data: usePersonalBoxFixture.data,
  }));
  given('usePersonalBoxAlertText', () => REQUEST_PERSONAL_BOX_TEXT);
  given('isOpen', () => false);
  given('hasImage', () => false);
  given('isChecked', () => false);
  given('imageSrc', () => '');

  beforeEach(() => {
    (usePersonalBox as jest.Mock).mockImplementation(() => given.usePersonalBox);
    (usePersonalBoxAlertText as jest.Mock).mockImplementation(() => ({
      message: given.usePersonalBoxAlertText,
    }));
    (useImageFileUploader as jest.Mock).mockImplementation(() => ({
      images: [],
      uploadImage: jest.fn(),
      clearImages: jest.fn(),
    }));
    (usePersonalBoxRequest as jest.Mock).mockImplementation(() => ({
      hasImage: given.hasImage,
      isOpen: given.isOpen,
      toggle: jest.fn(),
      isChecked: given.isChecked,
      handleChangeTermState: jest.fn(),
      imageSrc: given.imageSrc,
      uploadImageFile: '',
      handleOpenZoomImageLayer: handleOpenZoomImageLayer,
    }));
    (Alert as jest.Mock).mockImplementation(() => ({
      isConfirmed: true,
    }));
  });

  const renderRequestForm = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <RequestForm
          handleClosePersonalBoxForm={handleClosePersonalBoxForm}
          handleChangeResultForm={handleChangeResultForm}
        />
      </QueryClientProvider>,
    );

  it('보냉기능이 있는 박스 사진을 등록해주세요. 라는 문구를 확인할 수 있다', () => {
    const { container } = renderRequestForm();

    expect(container).toHaveTextContent('보냉기능이 있는');
    expect(container).toHaveTextContent('박스 사진을 등록해주세요.');
  });

  it('보냉박스 등록 가이드 문구를 확인할 수 있다', () => {
    const { container } = renderRequestForm();

    expect(container).toHaveTextContent('용량 45L 이상 보냉 포장재 이용을 권장합니다.');
    expect(container).toHaveTextContent(
      '보냉 기능이 없는 비닐봉투, 종이 박스, 리빙 박스, 바구니, 여행 가방 등의 포장재는 이용할 수 없어요.',
    );
    expect(container).toHaveTextContent('캡처된 사진을 등록하는 경우 승인이 거절될 수 있습니다.');
    expect(container).toHaveTextContent('15MB 미만의 이미지 등록을 권장합니다.');
  });

  it('개인 책임 안내 동의 체크박스를 확인할 수 있다', () => {
    const { getByLabelText } = renderRequestForm();

    expect(getByLabelText('개인 책임 안내 동의')).toBeInTheDocument();
  });

  it('신선도 유지에 대한 안내 문구를 확인할 수 있다', () => {
    const { container } = renderRequestForm();

    expect(container).toHaveTextContent(TERMS_OF_REQUEST);
  });

  it('비활성화 상태인 신청하기 버튼을 볼 수 있다', () => {
    const { getByRole } = renderRequestForm();

    expect(getByRole('button', { name: '신청하기' })).toBeDisabled();
  });

  it('사진 등록하기 버튼을 볼 수 있다', () => {
    const { container } = renderRequestForm();

    expect(container).toHaveTextContent('사진 등록');
  });

  context('미리보기 이미지를 클릭하면', () => {
    it('zoom image팝업 컴포넌트을 렌더링 하는 함수가 호출된다', () => {
      const { getByTestId } = renderRequestForm();

      fireEvent.click(getByTestId('upload-image'));

      expect(handleOpenZoomImageLayer).toBeCalled();
    });
  });

  context('isOpen이 true가 되면', () => {
    given('isOpen', () => true);

    it('zoom Image 를 보여주는 컴포넌트가 렌더링 된다', () => {
      const { container } = renderRequestForm();

      expect(container).toHaveTextContent('줌인 이미지 닫기');
    });
  });

  context('사진을 등록하면', () => {
    given('imageSrc', () => ICON_CAMERA);
    given('hasImage', () => true);

    it('미리보기 이미지가 나타난다', () => {
      const { getByTestId } = renderRequestForm();

      expect(getByTestId('upload-image')).toHaveStyle(`background-image:url(${ICON_CAMERA})`);
    });

    it('미리보기 이미지에 zoom-in 마우스커서가 생긴다', () => {
      const { getByTestId } = renderRequestForm();

      expect(getByTestId('upload-image')).toHaveStyle('cursor:zoom-in');
    });

    it('사진 편집 버튼이 나타난다', () => {
      const { container } = renderRequestForm();

      expect(container).toHaveTextContent('사진 편집');
    });
  });

  context('사진이 등록되고 개인 책임 안내 동의가 체크되면', () => {
    given('hasImage', () => true);
    given('isChecked', () => true);

    it('신청하기 버튼이 활성화 된다', () => {
      const { getByRole } = renderRequestForm();

      expect(getByRole('button', { name: '신청하기' })).toBeEnabled();
    });
  });

  context('신규 등록인 경우 신청하기 버튼을 클릭하면', () => {
    given('hasImage', () => true);
    given('isChecked', () => true);

    it(`${REQUEST_PERSONAL_BOX_TEXT}라고 Alert를 띄운다`, async () => {
      const { getByText } = renderRequestForm();

      fireEvent.click(getByText('신청하기'));

      await waitFor(() => {
        expect(Alert).toBeCalledWith({
          text: REQUEST_PERSONAL_BOX_TEXT,
          ...AlertFixture,
        });
      });
    });
  });

  context('재등록인 경우 신청하기 버튼을 클릭하면', () => {
    given('hasImage', () => true);
    given('isChecked', () => true);
    given('usePersonalBoxAlertText', () => REQUEST_NEW_PERSONAL_BOX_TEXT);

    it(`${REQUEST_NEW_PERSONAL_BOX_TEXT}라고 Alert를 띄운다`, async () => {
      const { getByText } = renderRequestForm();

      fireEvent.click(getByText('신청하기'));

      await waitFor(() => {
        expect(Alert).toBeCalledWith({
          text: REQUEST_NEW_PERSONAL_BOX_TEXT,
          ...AlertFixture,
        });
      });
    });
  });

  context('이미지 업로드에 성공하면', () => {
    given('hasImage', () => true);
    given('isChecked', () => true);
    beforeEach(() => {
      (updatePersonalBox as jest.Mock).mockResolvedValue({});
    });

    // 추가예정
    // it('개인 보냉박스 신청 여부 데이터를 refetch 한다', async () => {
    //   const { getByText } = renderRequestForm();
    //
    //   fireEvent.click(getByText('신청하기'));
    //
    //   await waitFor(() => {});
    // });
    //
    // it('신청완료 데이터를 true로 변경한다', async () => {
    //   const { getByText } = renderRequestForm();
    //
    //   fireEvent.click(getByText('신청하기'));
    //
    //   await waitFor(() => {});
    // });

    it('신청결과 페이지로 변경하는 함수를 호출한다', async () => {
      const { getByText } = renderRequestForm();

      fireEvent.click(getByText('신청하기'));

      await waitFor(() => {
        expect(handleChangeResultForm).toBeCalledWith(true);
      });
    });
  });

  context('이미지 업로드에 실패하면', () => {
    given('hasImage', () => true);
    given('isChecked', () => true);
    (updatePersonalBox as jest.Mock).mockRejectedValue(new Error());

    it(`${ERROR_MESSAGE}를 Alert로 띄운다`, async () => {
      const { getByText } = renderRequestForm();

      fireEvent.click(getByText('신청하기'));

      await waitFor(() => {
        expect(Alert).toBeCalledWith({
          text: ERROR_MESSAGE,
        });
      });
    });
  });
});
