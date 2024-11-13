import MyKurlyFarmContainer from '../../../src/games/my-kurly-farm/pc/containers/MyKurlyFarmContainer';
import { getWebviewServerSideProps } from '../../../src/server/webview';

export default MyKurlyFarmContainer;

export const getServerSideProps = getWebviewServerSideProps();
