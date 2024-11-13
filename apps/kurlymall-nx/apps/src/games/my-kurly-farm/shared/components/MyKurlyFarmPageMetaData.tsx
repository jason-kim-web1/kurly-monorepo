import PageMetaData from '../../../../shared/components/PageMeta/PageMetaData';
import { RESOURCE_URL } from '../../../../shared/configs/config';

export default function MyKurlyFarmPageMetaData() {
  return (
    <PageMetaData
      title={'마이컬리팜 - 컬리'}
      description={'모바일로 키우면 문 앞으로 받는 마이컬리팜. 마이컬리팜에서 직접 수확한 작물을 집에서 받아보아요!'}
      image={`${RESOURCE_URL}/games/my-kurly-farm/images/meta-v3.png`}
      url={'/games/my-kurly-farm'}
      keyword={'마이컬리팜'}
    />
  );
}
