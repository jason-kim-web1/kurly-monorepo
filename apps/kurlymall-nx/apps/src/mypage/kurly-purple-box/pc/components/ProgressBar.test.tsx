import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { usePersonalBox } from '../../shared/hooks/usePersonalBoxQuery';
import { usePersonalBoxDataFixture } from '../../shared/fixtures/fixtures';
import { COMPLETED, REQUESTED } from '../../shared/constants/requestConstant';
import ProgressBar from './ProgressBar';
import useProgressBar from '../../shared/hooks/useProgressBar';
import COLOR from '../../../../shared/constant/colorset';
import { RequestState } from '../../shared/types/requestStateType';

const queryClient = new QueryClient();
jest.mock('../../shared/hooks/usePersonalBoxQuery');
jest.mock('../../shared/hooks/useProgressBar');

describe('KurlyPurpleBoxProgressBar', () => {
  given('usePersonalBox', () => ({
    data: usePersonalBoxDataFixture,
  }));
  given('progressBarWidth', () => REQUESTED);

  beforeEach(() => {
    (usePersonalBox as jest.Mock).mockImplementation(() => given.usePersonalBox);
    (useProgressBar as jest.Mock).mockImplementation(() => ({
      progressBarWidth: given.progressBarWidth,
      progressBarAnimation: jest.fn(),
    }));
  });

  const renderProgressBar = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <ProgressBar />
      </QueryClientProvider>,
    );

  it(`확인중 상태의 경우 상태바의 길이가 ${REQUESTED}으로 보여진다`, () => {
    const { getByTestId } = renderProgressBar();
    expect(getByTestId('state-bar')).toHaveStyle(`width:${REQUESTED}%`);
  });

  it(`확인중 상태의 경우 확인중의 텍스트의 컬러가 ${COLOR.kurlyWhite}, 배경이 ${COLOR.kurlyPurple}이다`, () => {
    const { getByTestId } = renderProgressBar();
    expect(getByTestId('progressed')).toHaveStyle(`color:${COLOR.kurlyWhite}`);
    expect(getByTestId('progressed')).toHaveStyle(`background:${COLOR.kurlyPurple}`);
  });

  context('승인완료/승인거절 상태인 경우,', () => {
    given('progressBarWidth', () => COMPLETED);

    it(`상태바의 길이가 ${COMPLETED}으로 변경된다`, () => {
      const { getByTestId } = renderProgressBar();
      expect(getByTestId('state-bar')).toHaveStyle(`width:${COMPLETED}%`);
    });
  });

  context('승인완료 상태인 경우,', () => {
    given('usePersonalBox', () => ({
      data: {
        apply: false,
        imageUrl: '',
        requestState: RequestState.APPROVED,
        reason: '',
      },
    }));
    it(`완료의 텍스트의 컬러가 ${COLOR.kurlyWhite}, 배경이 ${COLOR.kurlyPurple}이다`, () => {
      const { getByTestId } = renderProgressBar();
      expect(getByTestId('completed')).toHaveStyle(`color:${COLOR.kurlyWhite}`);
      expect(getByTestId('completed')).toHaveStyle(`background:${COLOR.kurlyPurple}`);
    });
  });

  context('승인거절 상태인 경우,', () => {
    given('usePersonalBox', () => ({
      data: {
        apply: false,
        imageUrl: '',
        requestState: RequestState.REJECTED,
        reason: '',
      },
    }));
    it(`완료의 텍스트의 컬러가 ${COLOR.kurlyWhite}, 배경이 ${COLOR.kurlyPurple}이다`, () => {
      const { getByTestId } = renderProgressBar();
      expect(getByTestId('completed')).toHaveStyle(`color:${COLOR.kurlyWhite}`);
      expect(getByTestId('completed')).toHaveStyle(`background:${COLOR.kurlyPurple}`);
    });
  });
});
