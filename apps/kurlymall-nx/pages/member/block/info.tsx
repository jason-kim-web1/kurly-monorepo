import styled from '@emotion/styled';
import { useEffect, useMemo, useState } from 'react';

import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import COLOR from '../../../src/shared/constant/colorset';
import BlockUserContainer from '../../../src/member/block/shared/containers/BlockUserContainer';
import { getLockedToken } from '../../../src/member/block/shared/service';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${COLOR.bgLightGray};
`;

function BlockInformationPage() {
  const [lockedTokenStr, setLockedTokenStr] = useState<string>('temp');
  const isNormalUser = useMemo(() => !lockedTokenStr, [lockedTokenStr]);

  useEffect(() => {
    const setToken = setTimeout(() => {
      setLockedTokenStr(getLockedToken());
    }, 500);
    return () => clearTimeout(setToken);
  }, []);

  return (
    <>
      <Header />
      <Content>
        <BlockUserContainer isPC isNormalUser={isNormalUser} />
      </Content>
      <Footer />
    </>
  );
}

export default BlockInformationPage;
