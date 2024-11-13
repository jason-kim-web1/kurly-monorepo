import AddressTopText from '../../components/m/AddressTopText';
import ListItemContainer from '../shared/ListItemContainer';
import useIframeAddressHandler from '../../hooks/useIframeAddressHandler';

export default function ListContainer() {
  const { handleModifyIframe } = useIframeAddressHandler();

  return (
    <>
      <AddressTopText />
      <ListItemContainer modifyAddress={handleModifyIframe} />
    </>
  );
}
