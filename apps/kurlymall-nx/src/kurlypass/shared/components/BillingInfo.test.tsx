import { render } from '@testing-library/react';
import { format } from 'date-fns';

import BillingInfo from './BillingInfo';

const formattedDate = (date: string | number, dateFormat?: string) =>
  format(new Date(date), dateFormat ? dateFormat : 'yy.MM.dd');

describe('BillingInfo 테스트', () => {
  context.each([{ isPC: true }, { isPC: false }])('디바이스 타입에 따라', ({ isPC }) => {
    const renderBillingInfo = () => render(<BillingInfo currentKurlyPass={given.currentKurlyPass} isPC={isPC} />);

    given('currentKurlyPass', () => undefined);

    context('컬리패스 정보가 없으면', () => {
      given('currentKurlyPass', () => null);

      it('아무 것도 반환하지 않는다.', () => {
        const { container } = renderBillingInfo();

        expect(container).toBeEmptyDOMElement();
      });
    });

    context('현재 사용 중인 컬리패스 정보가 있으면', () => {
      given('currentKurlyPass', () => ({
        startDate: 1656514800000,
        endDate: 1659236400000,
        isExpired: false,
        expiredDate: 1659193200000,
      }));

      it('사용기간을 보여준다.', () => {
        const { container } = renderBillingInfo();

        const { startDate, endDate } = given.currentKurlyPass;

        expect(container).toHaveTextContent(`사용기간 ${formattedDate(startDate)} - ${formattedDate(endDate)}`);
      });

      it('결제예정일을 보여준다.', () => {
        const { container } = renderBillingInfo();

        const { endDate } = given.currentKurlyPass;

        expect(container).toHaveTextContent(`(결제예정일 ${formattedDate(endDate, 'yyyy.MM.dd')})`);
      });
    });

    context('만료 예정인 컬리패스 정보가 있으면', () => {
      given('currentKurlyPass', () => ({
        startDate: 1656514800000,
        endDate: 1659236400000,
        isExpired: true,
        expiredDate: 1659193200000,
      }));

      it('만료일을 보여준다.', () => {
        const { container } = renderBillingInfo();

        const { expiredDate } = given.currentKurlyPass;

        expect(container).toHaveTextContent(`${formattedDate(expiredDate)} 만료`);
      });
    });
  });
});
