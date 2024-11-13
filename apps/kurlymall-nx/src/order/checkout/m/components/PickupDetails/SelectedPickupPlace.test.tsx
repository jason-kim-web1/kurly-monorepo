import { render } from '@testing-library/react';

import SelectedPickupPlace from './SelectedPickupPlace';

describe('SelectedPickupPlace', () => {
  given('contents', () => null);

  const renderSelectedPickupPlace = () => render(<SelectedPickupPlace contents={given.contents} />);

  context('contents가 없으면', () => {
    given('contents', () => null);

    it('아무것도 보이지 않는다.', () => {
      const { container } = renderSelectedPickupPlace();

      expect(container).toBeEmptyDOMElement();
    });
  });

  context('contents가 있으면', () => {
    given('contents', () => ({
      shopName: '[아티제] 타워팰리스점',
      shopAddress: '서울시 강남구 언주로30길 26 반트스포츠센타 1층',
      pickupPeriod: {
        start: '2022년 04월 20일',
        end: '04월 24일',
      },
      specialList: ['주말 휴무', '특이사항 공백 포함 최대19자 권장'],
    }));

    it.each([
      { title: '픽업지', text: '[아티제] 타워팰리스점' },
      { title: '픽업지', text: '서울시 강남구 언주로30길 26 반트스포츠센타 1층' },
      { title: '픽업일자', text: '2022년 04월 20일 - 04월 24일' },
      { title: '특이사항', text: '주말 휴무' },
      { title: '특이사항', text: '특이사항 공백 포함 최대19자 권장' },
      { title: '필수지참', text: '본인확인을 위해 신분증이 필요합니다' },
    ])('픽업지, 픽업일자, 필수지잠 title과 내용을 볼 수 있다.', ({ title, text }) => {
      const { container } = renderSelectedPickupPlace();

      expect(container).toHaveTextContent(title);
      expect(container).toHaveTextContent(text);
    });
  });
});
