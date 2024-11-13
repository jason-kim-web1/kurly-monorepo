interface Decsription {
  black?: string[];
  gray?: string[];
}

export interface TableTerms {
  title: string;
  subTitle?: string;
  tableHead: string[];
  decsription?: Decsription;
}

export const THIRD_PARTY_DYNAMIC_TERMS: TableTerms = {
  title: '개인정보 제 3자 제공 동의(필수)',
  subTitle: '개인정보 제3자 제공 동의',
  tableHead: ['제공받는 자', '제공 항목', '제공 목적', '보유 및 이용 기간'],
  decsription: {
    black: [
      '※ 원활한 서비스 제공을 위해 해당 상품 구매 및 제3자 제공 동의하신 경우에만 개인정보가 제공됩니다.',
      '※ 구매자와 수취인이 다른 경우에는 입력하신 수취인의 정보가 제공될 수 있습니다.',
    ],
    gray: [
      '서비스 제공을 위해서 필요한 최소한의 개인정보입니다. 동의를 해 주셔야 서비스를 이용하실 수 있으며, 동의하지 않으실 경우 서비스에 제한이 있을 수 있습니다.',
    ],
  },
};

export const PERSONAL_CUSTOM_CODE_TERMS: TableTerms = {
  title: '개인통관고유부호 수집·이용 동의 (필수)',
  subTitle: '',
  tableHead: ['수집 항목', '이용 목적', '보유 기간'],
  decsription: {
    gray: [
      '회원은 본 서비스 이용 동의에 대한 거부를 할 수 있으며, 미동의 시 관세청 통관 처리 필요 상품 구매에 제한이 있을 수 있습니다.',
    ],
  },
};
