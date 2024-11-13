import { memo, useState } from 'react';
import styled from '@emotion/styled';

import useToggle from '../../../checkout/shared/hooks/useToggle';
import { TermsPolicyList, TermsType } from '../../../../shared/interfaces';

import TermsViewModal from '../../../../shared/modals/TermsViewModal';
import Checkbox from '../../../../shared/components/Input/Checkbox';

const styles = {
  label: {
    padding: 0,
    fontWeight: 500,
    fontSize: 18,
    textDecoration: 'underline',
    cursor: 'pointer',
  },
};

const Wrapper = styled.div`
  padding-top: 18px;
`;

const Terms = styled.p`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  line-height: 19px;
  + p {
    margin-top: 12px;
  }
`;

const Subject = styled.span`
  display: inline-block;
  text-decoration: underline;
  cursor: pointer;
`;

interface Props {
  terms: TermsPolicyList[];
  onChange: (agreed: boolean, code: TermsType) => void;
}

function TermsList({ terms, onChange }: Props) {
  const [params, setParams] = useState({
    url: '',
    key: '',
  });
  const { isOpen, open, close } = useToggle();

  const handleClick = ({ url, key }: { url: string; key: string }) => {
    setParams({
      url,
      key,
    });

    open();
  };

  return (
    <>
      <Wrapper>
        {terms.map(({ subject, url, key, agreed, code }) => (
          <Terms key={subject}>
            <Checkbox
              id={`terms-agree-${key}`}
              checked={agreed}
              onChange={({ target }) => onChange(target.checked, code)}
              css={styles.label}
              flatTheme
            />
            <Subject onClick={() => handleClick({ url, key })}>{subject}</Subject>
          </Terms>
        ))}
      </Wrapper>
      <TermsViewModal open={isOpen} params={params} onClose={close} />
    </>
  );
}

export default memo(TermsList);
