import { css } from '@emotion/react';

import styled from '@emotion/styled';

import SignupAgreeForm from '../../pc/components/SignupAgreeForm';
import { isPC } from '../../../../../util/window/getDevice';
import InputGroup from '../../../../shared/components/InputGroup/InputGroup';

const Container = styled.div`
  padding: ${isPC ? '0' : '0 20px'};
`;

const styles = {
  group: css`
    padding-right: 0;
  `,
};

export default function TermsContainer() {
  return (
    <Container>
      <InputGroup label={'이용약관동의'} isRequired colspan css={styles.group}>
        <SignupAgreeForm />
      </InputGroup>
    </Container>
  );
}
