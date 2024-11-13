import { useCallback } from 'react';

import styled from '@emotion/styled';

import { useSelector } from 'react-redux';

import { css } from '@emotion/react';

import Alert from '../../../../shared/components/Alert/Alert';
import Button from '../../../../shared/components/Button/Button';

import ListStyle from './ListStyle';
import { AppState } from '../../../../shared/store';
import usePrivacyPolicyState from '../../shared/hooks/usePrivacyPolicyState';
import COLOR from '../../../../shared/constant/colorset';
import TableStyle from '../../shared/components/TableStyle';

const Description = styled.p`
  margin-top: 16px;
  font-size: 14px;
  line-height: 18px;
  color: ${COLOR.kurlyGray600};
  text-align: left;
`;

const styles = {
  button: css`
    background: none;
    height: auto;
    text-align: left;
    padding: 0 0 0 4px;

    span {
      color: ${COLOR.kurlyGray800};
      font-size: 14px;
      text-decoration-line: underline;
    }
  `,
};

export default function MobilePrivacyPolicy() {
  const {
    privacyPolicy: { period, purpose, items, description },
    myKurlyStyleInformation: { privacyPolicyStatus },
  } = useSelector(({ myKurlyStyle }: AppState) => myKurlyStyle);

  const { changePrivacyPolicyStatus } = usePrivacyPolicyState(privacyPolicyStatus);

  const onClickPrivacyPolicy = useCallback(async () => {
    await Alert({
      title: '프로필 수집 및 이용 약관 동의 (필수)',
      confirmButtonText: '확인',
      contents: (
        <>
          <TableStyle period={period} purpose={purpose} items={items} />
          <Description>{description}</Description>
        </>
      ),
    });
  }, [description, items, period, purpose]);
  return (
    <>
      <Button text="프로필 수집 및 이용 약관 동의 (필수)" onClick={onClickPrivacyPolicy} css={styles.button} />
      {changePrivacyPolicyStatus && (
        <ListStyle period={period} purpose={purpose} items={items} description={description} />
      )}
    </>
  );
}
