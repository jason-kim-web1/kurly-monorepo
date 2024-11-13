import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

import { iconInfo } from '../../../../shared/images';

interface Props {
  address: string;
}

const Wrapper = styled.div`
  padding-bottom: 12px;
`;

const Star = styled.span`
  color: ${COLOR.pointText};
`;

const Label = styled.label`
  display: inline-block;
  padding: 8px 0 11px;
  font-size: 14px;
  font-weight: 600;
  line-height: 19px;
  color: #333;
`;

const Address = styled.div`
  font-size: 16px;
  margin-bottom: 12px;
  line-height: normal;
`;

const Guide = styled.div`
  display: flex;
  font-size: 13px;
  line-height: 19px;
  color: #999999;
`;

const GuideHead = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: 500;
  color: #999999;
  margin-bottom: 8px;
  margin-left: -5px;
  > div {
    margin-right: 6px;
  }
`;

const MiddleDot = styled.div`
  margin-right: 9px;
  color: #ccc;
`;

const GuideWrap = styled.div`
  background-color: #fafafa;
  border-radius: 6px;
  padding: 16px 17px 16px 22px;
`;

const IconInfo = styled.div`
  display: inline-block;
  margin-right: 4px;
  width: 14px;
  height: 14px;
  background: url('${iconInfo}') 0 0 no-repeat;
  vertical-align: top;
  background-size: cover;
  content: '';
`;

export default function AddressBox({ address }: Props) {
  const contents: string[] = [
    '배송지에 따라 상품정보가 달라질 수 있습니다.',
    '회원가입 후 마이컬리 > 배송지 관리에서 배송지 수정이 가능합니다',
  ];

  return (
    <Wrapper>
      <Label>
        주소 <Star>*</Star>
      </Label>
      <Address>{address}</Address>
      <GuideWrap>
        <GuideHead>
          <IconInfo />
          카카오에서 불러온 정보를 확인해주세요!
        </GuideHead>
        {contents.map((content) => (
          <Guide key={content}>
            <MiddleDot>•</MiddleDot>
            {content}
          </Guide>
        ))}
      </GuideWrap>
    </Wrapper>
  );
}
