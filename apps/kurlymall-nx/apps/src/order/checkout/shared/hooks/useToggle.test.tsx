import { renderHook, act } from '@testing-library/react-hooks';

import useToggle from './useToggle';

import { amplitudeService } from '../../../../shared/amplitude';
import { SelectExpandButton } from '../../../../shared/amplitude/events';

jest.mock('../../../../shared/amplitude', () => ({
  amplitudeService: {
    logEvent: jest.fn(),
    getWebviewReferrerEvent: jest.fn(),
  },
}));

describe('useToggle Test', () => {
  given('isOpen', () => false);

  const renderUseToggle = () => renderHook(() => useToggle(given.isOpen));

  describe('비활성화 상태일때', () => {
    it('toggle 하면 활성화 된다', () => {
      const { result } = renderUseToggle();

      act(() => {
        result.current.toggle();
      });

      expect(result.current.isOpen).toBe(true);
    });
  });

  describe('활성화 상태일때', () => {
    given('isOpen', () => true);

    it('toggle 하면 비활성화 된다', () => {
      const { result } = renderUseToggle();

      act(() => {
        result.current.toggle();
      });

      expect(result.current.isOpen).toBe(false);
    });
  });

  it('close 하면 비활성화 된다.', () => {
    const { result } = renderUseToggle();

    act(() => {
      result.current.close();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it('open 하면 활성화 된다.', () => {
    const { result } = renderUseToggle();

    act(() => {
      result.current.open();
    });

    expect(result.current.isOpen).toBe(true);
  });

  it('amplitude toggle을 하면 amplitude를 호출하고 활성화 시킨다.', async () => {
    const { result } = renderUseToggle();

    act(() => {
      result.current.toggleWithAmplitude('결제 수단');
    });

    expect(result.current.isOpen).toBe(true);

    expect(amplitudeService.logEvent).toBeCalledWith(
      new SelectExpandButton({
        section: '결제 수단',
      }),
    );
  });
});
