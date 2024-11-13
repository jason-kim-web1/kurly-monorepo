import { fireEvent, render } from '@testing-library/react';

import PackagingMethod from './PackagingMethod';

describe('PackagingMethod 테스트', () => {
  const handleChange = jest.fn();

  given('selectedValue', () => 'PAPER');
  given('available', () => ({
    kurlyBag: false,
    personalBag: false,
  }));

  const renderPackagingMethod = () =>
    render(<PackagingMethod selectedValue={given.selectedValue} available={given.available} onChange={handleChange} />);

  context('컬리 퍼플 박스나 개인 보냉 박스를 사용할 수 있으면', () => {
    given('available', () => ({
      kurlyBag: true,
      personalBag: true,
    }));

    context('포장 방법을 선택했을 때', () => {
      it('handleChange handler를 호출한다', () => {
        const { getByLabelText } = renderPackagingMethod();

        fireEvent.click(getByLabelText('컬리 퍼플 박스'));

        expect(handleChange).toBeCalled();
      });
    });
  });
});
