import { FreshCertifyInfo } from '../../../../events/kf365/constants';
import { isProduction, RESOURCE_URL } from '../../../configs/config';
import { getFile } from '../../common/getFile';

export async function fetchKurlyTestReport() {
  const url = `${RESOURCE_URL}/json/test-report/${isProduction() ? 'testReport' : 'testReport_dev'}.json`;
  const response = await getFile<{
    id: string;
    data: FreshCertifyInfo[];
  }>(url);

  return response;
}
