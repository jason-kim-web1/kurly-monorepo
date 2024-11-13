import styled from '@emotion/styled';

import { isArray } from 'lodash';

import { SellerType, TermsInfo, ThirdPartTermsContentType } from '../../../../shared/interfaces/UserTerms';
import {
  AIRLINE_CONTENT,
  ALCOHOL_DEFAULT_CONTENT,
  ALCOHOL_CONTENT,
  AS_CONTENT,
  CULTURE_CONTENT,
  PICKUP_CONTENT,
  SHIPPING_CONTENT,
  STORAGE_PERIOD,
  TRAVEL_CONTENT,
} from '../../../checkout/shared/constants/terms';
import { isPC } from '../../../../../util/window/getDevice';

const UnderLineText = styled.td`
  font-size: 15px;
  font-weight: ${isPC ? 500 : 600};
  line-height: 20px;
  text-decoration: underline;
  vertical-align: middle;
`;

const SmallText = styled.td`
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
`;

type ThirdPartTermsType = {
  [key in SellerType]: ThirdPartTermsContentType;
};

const ThirdPartTerms: ThirdPartTermsType = {
  ALCOHOL_DEFAULT: ALCOHOL_DEFAULT_CONTENT,
  ALCOHOL: ALCOHOL_CONTENT,
  SHIPPING: SHIPPING_CONTENT,
  TRAVEL: TRAVEL_CONTENT,
  AIRLINE: AIRLINE_CONTENT,
  CULTURE: CULTURE_CONTENT,
  PICKUP: PICKUP_CONTENT,
  AS: AS_CONTENT,
};

export function ThirdPartyTableCell({ type, names }: TermsInfo) {
  return (
    <tr>
      <UnderLineText>{isArray(names) ? names.join(',') : names}</UnderLineText>
      <SmallText>
        {ThirdPartTerms[type].type}
        <br />
        {ThirdPartTerms[type].items.map((item, index) => {
          return <div key={`${type}-${item}-${index}`}>{item}</div>;
        })}
      </SmallText>
      <UnderLineText>{ThirdPartTerms[type].purpose}</UnderLineText>
      <UnderLineText>{STORAGE_PERIOD}</UnderLineText>
    </tr>
  );
}
