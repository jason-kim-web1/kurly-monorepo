import { useRef, useEffect } from 'react';

import { css } from '@emotion/react';

import { isDefined } from '../../../../../shared/utils/lodash-extends';
import { JOIN_ORDER_DESCRIPTIONS, APP_ONLY_TITLE } from '../../../../product.constant';
import Alert from '../../../../../shared/components/Alert/Alert';

const alertContentStyles = css`
  .popup-title {
    line-height: 23px;
    letter-spacing: -0.5px;
  }
  .popup-content {
    padding-bottom: 24px;
    text-align: left;
    line-height: 21px;
  }
  .popup-footer {
    > button {
      font-weight: 500;
      line-height: 21px;
    }
  }
`;

interface Props {
  productNo: number;
  joinOrderCode?: string;
}

export const JoinOrderDialog = ({ productNo, joinOrderCode }: Props) => {
  const previousNotified = useRef(false);
  const isJoinOrderCodeProvided = isDefined(joinOrderCode);
  const description = isJoinOrderCodeProvided
    ? JOIN_ORDER_DESCRIPTIONS.DESKTOP.JOIN_LINK
    : JOIN_ORDER_DESCRIPTIONS.DESKTOP.APP_ONLY;

  useEffect(() => {
    if (previousNotified.current) {
      return;
    }
    Alert({
      title: APP_ONLY_TITLE,
      text: description,
      contentsStyle: alertContentStyles.styles,
    });
    previousNotified.current = true;
    return () => {
      previousNotified.current = false;
    };
  }, [productNo, joinOrderCode]);

  return null;
};
