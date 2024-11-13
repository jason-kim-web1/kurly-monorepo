import styled from '@emotion/styled';

import COLOR from '../../../../../../shared/constant/colorset';

import { ShareItemWrapper } from '../../../containers/ShareContainer';

const LinkShare = styled.a`
  width: 113px;
  text-align: left;
`;

const SNSLogo = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 8px;
  vertical-align: top;
`;

const SNSName = styled.span`
  display: inline-block;
  padding-top: 4px;
  font-weight: 500;
  font-size: 12px;
  color: ${COLOR.kurlyBlack};
  line-height: 20px;
  vertical-align: top;
  letter-spacing: -0.5px;
  &:hover {
    text-decoration: underline;
  }
`;

interface Props {
  name: string;
  value: string;
  imageUrl: string;
  onClick(): void;
}

export default function SNSButton({ name, value, imageUrl, onClick }: Props) {
  return (
    <ShareItemWrapper>
      <LinkShare onClick={onClick}>
        <SNSLogo src={imageUrl} alt={value} />
        <SNSName>{name}</SNSName>
      </LinkShare>
    </ShareItemWrapper>
  );
}
