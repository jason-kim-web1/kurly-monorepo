import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { isEmpty } from 'lodash';

import { PickupPlaceText } from '../../../shared/interfaces';

import InformationRow from '../../../../../shared/components/layouts/InformationRow';
import COLOR from '../../../../../shared/constant/colorset';
import Button from '../../../../../shared/components/Button/Button';

const row = css`
  span {
    font-weight: 500;
    line-height: 24px;
    color: ${COLOR.kurlyGray800};
  }
  div {
    line-height: 24px;
  }
  &:first-of-type {
    padding: 30px 0 0 0;
  }
  padding: 16px 0 0 0;
`;

const Wrapper = styled.div`
  padding-bottom: 20px;
  border-bottom: 1px solid ${COLOR.bg};
`;

const ShopAddress = styled.div`
  color: ${COLOR.kurlyGray600};
  padding: 4px 0 12px;
  line-height: 19px;
`;

const SpecialContent = styled.div`
  div {
    margin-top: 4px;

    &:first-of-type {
      margin-top: 0;
    }
  }
`;

const styles = {
  button: {
    '> span': {
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 500,
    },
  },
};

interface Props {
  contents: PickupPlaceText;
  openDialog: () => void;
}

export default function SelectedPickupPlace({ contents, openDialog }: Props) {
  const { shopName, shopAddress, pickupPeriod, specialList } = contents;

  return (
    <Wrapper>
      <InformationRow css={row} title="픽업지">
        {shopName}
        <ShopAddress>{shopAddress}</ShopAddress>
        <Button
          theme="tertiary"
          text="변경"
          width={60}
          height={30}
          radius={3}
          css={styles.button}
          onClick={openDialog}
        />
      </InformationRow>
      <InformationRow css={row} title="픽업일자">
        {pickupPeriod.start} - {pickupPeriod.end}
      </InformationRow>
      {!isEmpty(specialList) && (
        <InformationRow css={row} title="특이사항">
          <SpecialContent>
            {specialList.map((special) => (
              <div key={special}>{special}</div>
            ))}
          </SpecialContent>
        </InformationRow>
      )}
      <InformationRow css={row} title="필수지참">
        본인확인을 위해 신분증이 필요합니다
      </InformationRow>
    </Wrapper>
  );
}
