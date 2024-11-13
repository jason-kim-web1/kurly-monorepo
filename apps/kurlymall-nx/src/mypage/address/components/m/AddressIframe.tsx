import styled from '@emotion/styled';

import { useContext } from 'react';

import { AddressContext } from '../../context/addressContext';

const AddressSearch = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: 0;
`;

export default function AddressIframe() {
  const { showIframe, iframeUrl } = useContext(AddressContext);

  return showIframe ? (
    <AddressSearch>
      <Iframe key={'address-search'} src={iframeUrl} width="100%" height="100%" />
    </AddressSearch>
  ) : null;
}
