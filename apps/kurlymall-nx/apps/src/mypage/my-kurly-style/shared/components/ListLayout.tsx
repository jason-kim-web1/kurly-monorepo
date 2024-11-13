import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { isPC } from '../../../../../util/window/getDevice';
import COLOR from '../../../../shared/constant/colorset';

import { useAppSelector } from '../../../../shared/store';
import useStep from '../hooks/useStep';
import Button from '../../../../shared/components/Button/Button';
import MobileFooter from '../../../../shared/components/layouts/MobileFooter';
import PcProfileCategory from '../../pc/components/ProfileCategory';
import MobileProfileCategory from '../../m/components/ProfileCategory';

const Wrapper = styled.div`
  ${isPC &&
  css`
    padding: 44px 36px 60px;
    border-bottom: 1px solid ${COLOR.kurlyGray200};
  `};
`;

const InnerWrapper = styled.div`
  width: 104px;
  margin: 50px auto 0;
`;

const styles = {
  footer: css`
    ${isPC &&
    css`
      position: relative;
      background: none;
      padding: 0 !important;

      + div {
        display: none;
      }
    `}
  `,
  button: css`
    width: 100%;
    ${isPC &&
    css`
      span {
        font-size: 13px;
      }
    `}
  `,
};

interface Props {
  profileId: string;
}

export default function ListLayout({ profileId }: Props) {
  const {
    profile: { categories },
  } = useAppSelector(({ myKurlyStyle }) => myKurlyStyle);

  const { saveProfile, isSaved } = useStep({ categories, profileId });

  return (
    <Wrapper>
      {isPC ? <PcProfileCategory listLayout /> : <MobileProfileCategory listLayout />}
      <InnerWrapper>
        <MobileFooter css={styles.footer} transparent={true}>
          <Button
            text="저장"
            onClick={saveProfile}
            theme={isPC ? 'tertiary' : 'primary'}
            width={91}
            height={isPC ? 36 : 52}
            radius={isPC ? 3 : 6}
            css={styles.button}
            isLoading={isPC && !isSaved}
            isSubmitLoading={!isPC && !isSaved}
          />
        </MobileFooter>
      </InnerWrapper>
    </Wrapper>
  );
}
