import { memo, useState } from 'react';
import styled from '@emotion/styled';

import useToggle from '../../../checkout/shared/hooks/useToggle';

import TermsViewModal from '../../../../shared/modals/TermsViewModal';
import Checkbox from '../../../../shared/components/Input/Checkbox';
import { TermsPolicyList, TermsType } from '../../../../shared/interfaces';

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
  padding-top: 16px;
`;

const Terms = styled.p`
  font-size: 14px;
  line-height: 24px;
  + p {
    margin-top: 6px;
  }
`;

const Subject = styled.span`
  display: inline-block;
  width: 310px;
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
