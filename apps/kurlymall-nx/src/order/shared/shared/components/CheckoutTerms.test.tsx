import { fireEvent, screen } from '@testing-library/react';

import Terms from './CheckoutTerms';
import useCheckoutTerms from '../../../checkout/shared/hooks/useCheckoutTerms';
import { renderWithProviders } from '../../../../../util/testutil';
import { MEMBER_CARD_WITH_KURLYPAY } from '../constants/terms';

jest.mock('../../../checkout/shared/hooks/useCheckoutTerms');

describe('Terms component', () => {
  const onClickTerms = jest.fn();

  const renderTerms = () => renderWithProviders(<Terms />);

  beforeEach(() => {
    (useCheckoutTerms as jest.Mock).mockReturnValue({
      terms: MEMBER_CARD_WITH_KURLYPAY,
      onClickTerms,
    });
  });

  context('약관동의 항목이 있으면', () => {
    it('약관동의 항목을 볼 수 있다.', () => {
      renderTerms();

      MEMBER_CARD_WITH_KURLYPAY.forEach(({ subject }) => {
        expect(screen.queryByText(subject)).toBeInTheDocument();
      });
    });
  });

  context('약관동의 항목 "보기" 를 클릭하면', () => {
    it('onClickTerms 가 호출된다.', () => {
      renderTerms();

      const firstTerm = screen.getAllByText('보기')[0];

      fireEvent.click(firstTerm);

      expect(onClickTerms).toBeCalledWith(
        MEMBER_CARD_WITH_KURLYPAY[0].code,
        MEMBER_CARD_WITH_KURLYPAY[0].url,
        MEMBER_CARD_WITH_KURLYPAY[0].key,
      );
    });
  });
});
