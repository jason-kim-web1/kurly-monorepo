import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useCompleteRequest, usePersonalBox } from '../../shared/hooks/usePersonalBoxQuery';
import { usePersonalBoxDataFixture, usePersonalBoxFixture } from '../../shared/fixtures/fixtures';
import FormContainer from './FormContainer';

const queryClient = new QueryClient();
jest.mock('../../shared/hooks/usePersonalBoxQuery');

describe('KurlyPurpleBoxFormContainer', () => {
  const handleClosePersonalBoxForm = jest.fn();

  given('usePersonalBox', () => ({
    data: usePersonalBoxDataFixture,
  }));
  given('useCompleteRequest', () => false);

  beforeEach(() => {
    (usePersonalBox as jest.Mock).mockImplementation(() => given.usePersonalBox);
    (useCompleteRequest as jest.Mock).mockImplementation(() => given.useCompleteRequest);
  });

  const renderFormContainer = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <FormContainer handleClosePersonalBoxForm={handleClosePersonalBoxForm} />
      </QueryClientProvider>,
    );

  it('개인보냉박스를 신청한적이 있으면 결과 컴포넌트를 렌더링 한다', () => {
    const { container } = renderFormContainer();

    expect(container).toHaveTextContent('개인 보냉박스 신청 결과 닫기');
  });

  context('개인보냉박스를 신청한적이 없으면', () => {
    given('usePersonalBox', () => ({
      data: usePersonalBoxFixture.data,
    }));

    it('신청 컴포넌트를 렌더링 한다', () => {
      const { container } = renderFormContainer();

      expect(container).toHaveTextContent('개인 보냉박스 신청 닫기');
    });
  });
});
