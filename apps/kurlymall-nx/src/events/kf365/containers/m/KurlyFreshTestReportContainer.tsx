import InfoContent from '../../components/m/InfoContent';
import SlideContent from '../../components/m/SlideContent';
import NavMenu from '../../components/m/NavMenu';
import { useWebview } from '../../../../shared/hooks/useWebview';
import useKurlyTestReport from '../../hooks/useKurlyTestReport';

export default function KurlyFreshTestReportContainer() {
  const webview = useWebview();

  const { data: freshCertifyInfo } = useKurlyTestReport();

  return (
    <>
      <NavMenu webview={webview} navigatorMenu={freshCertifyInfo} />
      {freshCertifyInfo.map(({ id, name, infoText, infoImageUrlMo, imageList }) => (
        <div key={id} id={id}>
          <InfoContent info={infoText} bgImage={infoImageUrlMo} />
          <SlideContent title={name} imageList={imageList} />
        </div>
      ))}
    </>
  );
}
