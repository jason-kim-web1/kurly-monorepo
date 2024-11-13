import { fireEvent, screen, waitFor } from '@testing-library/react';

import MembershipOnlyProductAlert from '.';
import { amplitudeService } from '../../../amplitude';
import { SelectMembership } from '../../../amplitude/events/membership';
import {
  MEMBERSHIP_DIALOG_GUIDE_TEXT,
  MEMBERSHIP_DIALOG_TITLE,
  MEMBERSHIP_PURCHASE_ALERT_TYPE,
  PRODUCT_SELECT_USER_ACTION_TYPE,
} from './constants';
import type { MembershipPurchaseAlertInfo } from '../../../../product/detail/types';

const LOVERS_LABEL = {
  text: '러버스',
  textColor: '#5F0080',
  backgroundColor: '#FFFFFF',
  borderColor: '#5F0080',
};

const WHITE_LABEL = {
  ...LOVERS_LABEL,
  text: '화이트',
};

const THE_PURPLE_LABEL = {
  ...LOVERS_LABEL,
  text: '더퍼플',
};

const WHITE_MORE_LABEL = {
  ...LOVERS_LABEL,
  text: '화이트 이상',
};

const PURPLE_MORE_LABEL = {
  ...LOVERS_LABEL,
  text: '퍼플 이상',
};

const MEMBERS_PURCHASE_ALERT_INFO = {
  title: MEMBERSHIP_DIALOG_TITLE[PRODUCT_SELECT_USER_ACTION_TYPE.ONLY_MEMBERS_ERROR],
  text: MEMBERSHIP_DIALOG_GUIDE_TEXT[PRODUCT_SELECT_USER_ACTION_TYPE.ONLY_MEMBERS_ERROR],
  type: MEMBERSHIP_PURCHASE_ALERT_TYPE.MEMBERS_JOIN,
};

const getLoversPurchaseAlertInfo = (text: string): MembershipPurchaseAlertInfo => ({
  title: `${text} 전용상품`,
  text: `러버스 등급이 ${text}인 회원만 구매 가능한 상품입니다.`,
  type: MEMBERSHIP_PURCHASE_ALERT_TYPE.INFO,
});

const B2B_PURCHASE_ALERT_INFO = {
  title: '임직원 전용상품',
  text: '임직원만 구매가능한 상품입니다.',
  type: MEMBERSHIP_PURCHASE_ALERT_TYPE.INFO,
};

jest.mock('../../../amplitude', () => ({
  amplitudeService: {
    logEvent: jest.fn(),
    getWebviewReferrerEvent: jest.fn(),
  },
}));

describe('MembershipOnlyProductAlert test', () => {
  context('멤버스 전용 상품이면', () => {
    it('멤버십 가입 유도 alert 을 볼 수 있다.', async () => {
      MembershipOnlyProductAlert({
        membershipPurchaseAlertInfo: MEMBERS_PURCHASE_ALERT_INFO,
        onClickConfirm: () => {},
      });

      await waitFor(() => {
        expect(screen.getByRole('heading', { name: '컬리멤버스 전용상품 포함' })).toBeInTheDocument();
        expect(
          screen.getByText(
            '컬리멤버스 회원만 구매 가능한 상품이 포함되어 있습니다. 지금 가입하고 함께 주문하시겠어요?',
          ),
        ).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '컬리멤버스 혜택받기' })).toBeInTheDocument();
      });
    });

    it('"컬리멤버스 혜택받기" 버튼을 눌러 onClickConfirm 을 호출한다.', async () => {
      const handleOnClickConfirm = jest.fn();

      MembershipOnlyProductAlert({
        membershipPurchaseAlertInfo: MEMBERS_PURCHASE_ALERT_INFO,
        onClickConfirm: handleOnClickConfirm,
      });

      await waitFor(() => {
        const button = screen.getByRole('button', { name: '컬리멤버스 혜택받기' });

        fireEvent.click(button);

        expect(handleOnClickConfirm).toBeCalled();

        expect(amplitudeService.logEvent).toBeCalledWith(new SelectMembership({ selection_type: 'members_deal' }));
      });
    });
  });

  context('멤버스가 포함된 전용 상품이면', () => {
    it('멤버십 가입 유도 alert 을 볼 수 있다.', async () => {
      MembershipOnlyProductAlert({
        membershipPurchaseAlertInfo: MEMBERS_PURCHASE_ALERT_INFO,
        onClickConfirm: () => {},
      });

      await waitFor(() => {
        expect(screen.getByRole('heading', { name: '컬리멤버스 전용상품 포함' })).toBeInTheDocument();
        expect(
          screen.getByText(
            '컬리멤버스 회원만 구매 가능한 상품이 포함되어 있습니다. 지금 가입하고 함께 주문하시겠어요?',
          ),
        ).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '컬리멤버스 혜택받기' })).toBeInTheDocument();
      });
    });
  });

  context('러버스 전용 상품이면', () => {
    it.each`
      labels                             | text
      ${[LOVERS_LABEL]}                  | ${'러버스'}
      ${[WHITE_MORE_LABEL]}              | ${'화이트 이상'}
      ${[PURPLE_MORE_LABEL]}             | ${'퍼플 이상'}
      ${[WHITE_LABEL, THE_PURPLE_LABEL]} | ${'화이트, 더퍼플'}
    `('구매불가 alert($text) 을 볼 수 있다.', async ({ text }) => {
      MembershipOnlyProductAlert({
        membershipPurchaseAlertInfo: getLoversPurchaseAlertInfo(text),
        onClickConfirm: () => {},
      });

      await waitFor(() => {
        expect(screen.getByText(`러버스 등급이 ${text}인 회원만 구매 가능한 상품입니다.`)).toBeInTheDocument();
      });
    });
  });

  context('B2B 전용 상품이면', () => {
    it('임직원 전용 상품 alert 을 볼 수 있다.', async () => {
      MembershipOnlyProductAlert({
        membershipPurchaseAlertInfo: B2B_PURCHASE_ALERT_INFO,
        onClickConfirm: () => {},
      });

      await waitFor(() => {
        expect(screen.getByText(`임직원만 구매가능한 상품입니다.`)).toBeInTheDocument();
      });
    });
  });
});
