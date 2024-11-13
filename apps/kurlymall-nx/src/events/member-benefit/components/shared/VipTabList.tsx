import { VipInfoList } from '../../../../shared/api/events/member/benefit.api';

import { TabInfoList } from '../../shared/styled';
import RawHTML from '../../../../shared/components/layouts/RawHTML';

interface Props {
  list: VipInfoList[];
}

export default function VipTabList({ list }: Props) {
  return (
    <TabInfoList>
      {list.map(({ title, subList }) => (
        <li key={title}>
          <RawHTML html={title} />
          {subList ? (
            <ul className="sub-list">
              {subList.map((data) => (
                <li key={data}>
                  <RawHTML html={data} />
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </TabInfoList>
  );
}
