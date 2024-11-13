import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

import COLOR from '../../../../../shared/constant/colorset';
import { multiMaxLineText } from '../../../../../shared/utils';
import { PickupPlaceText } from '../../../shared/interfaces';
import NaverMap from '../../../../../shared/components/NaverMap/NaverMap';
import Marker from '../../../../../shared/components/NaverMap/Marker';
import { NaverMapContextProvider } from '../../../../../shared/context/NaverMapContext/NaverMapContext';
import { selectedMarkerIcon } from '../../../shared/utils/pickup/getMarkerIcon';
import { SHOW_MARKER_LATITUDE_CENTER } from '../../../../../shared/components/NaverMap/constants/showMarkerLatitudeCenter';

const List = styled.ul`
  background-color: ${COLOR.bgLightGray};
  border-radius: 6px;
  padding: 4px 16px 16px;
  font-size: 14px;
  line-height: 19px;
`;

const Item = styled.li`
  display: flex;
`;

const Title = styled.header`
  flex-shrink: 0;
  width: 72px;
  padding-top: 12px;
  color: ${COLOR.kurlyGray600};
`;

const Content = styled.div`
  flex-basis: calc(100% - 72px);
  -webkit-flex-basis: calc(100% - 72px);
  -webkit-flex-grow: 1;
  flex-grow: 1;
  padding-top: 12px;
  color: ${COLOR.kurlyGray800};
  font-weight: 600;
`;

const SubContent = styled.p`
  padding-top: 2px;
  font-weight: 400;
  &:first-of-type {
    ${multiMaxLineText(2)};
  }
`;

const SpecialContent = styled.div`
  div {
    margin-top: 2px;

    &:first-of-type {
      margin-top: 0;
    }
  }
`;

interface Props {
  contents: PickupPlaceText | null;
  showMap?: boolean;
}

export default function SelectedPickupPlace({ contents, showMap = false }: Props) {
  if (!contents) {
    return null;
  }

  return (
    <List>
      <Item>
        <Title>픽업지</Title>
        <Content>
          {contents?.shopName}
          <SubContent>{contents?.shopAddress}</SubContent>
        </Content>
      </Item>

      <Item>
        <Title>픽업일자</Title>
        <Content>
          {contents?.pickupPeriod.start} - {contents?.pickupPeriod.end}
        </Content>
      </Item>

      {!isEmpty(contents.specialList) && (
        <Item>
          <Title>특이사항</Title>
          <Content>
            <SpecialContent>
              {contents.specialList.map((special) => (
                <div key={special}>{special}</div>
              ))}
            </SpecialContent>
          </Content>
        </Item>
      )}

      <Item>
        <Title>필수지참</Title>
        <Content>본인확인을 위해 신분증이 필요합니다</Content>
      </Item>
      {showMap && (
        <NaverMapContextProvider>
          <NaverMap
            center={{ latitude: contents.latitude + SHOW_MARKER_LATITUDE_CENTER, longitude: contents.longitude }}
            style={{
              width: '100%',
              height: '124px',
              overflow: 'hidden',
              pointerEvents: 'none',
              marginTop: '20px',
            }}
            innerStyle={{
              border: `1px solid ${COLOR.kurlyGray250}`,
              borderRadius: '8px',
            }}
          >
            <Marker
              title={contents.shopName}
              position={{ latitude: contents.latitude, longitude: contents.longitude }}
              icon={selectedMarkerIcon({ size: { width: 32, height: 40 } })}
            />
          </NaverMap>
        </NaverMapContextProvider>
      )}
    </List>
  );
}
