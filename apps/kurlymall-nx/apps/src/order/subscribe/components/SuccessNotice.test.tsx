import { screen, render } from '@testing-library/react';

import { RESULT_NOTICE } from '../constants';
import SuccessNotice from './SuccessNotice';

describe('SuccessNotice', () => {
  it.each(RESULT_NOTICE)('신청 성공에 대한 유의사항을 볼 수 있다.', (text) => {
    render(<SuccessNotice />);

    expect(screen.queryByText(text)).toBeInTheDocument();
  });
});
