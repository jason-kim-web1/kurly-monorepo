import styled from '@emotion/styled';

import { kurlyMainLogo } from '../../shared/images';
import Button from '../../shared/components/Button/Button';
import NextImage from '../../shared/components/NextImage';
import COLOR from '../../shared/constant/colorset';
import useAppLink from '../../shared/hooks/useAppLink';

const Wrapper = styled.div`
  padding-top: 180px;
  text-align: center;
`;

const Text = styled.div`
  margin-top: 16px;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  white-space: pre-line;
`;

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  line-height: 19px;
`;

const OpenButton = styled.button`
  margin-top: 22px;
  color: ${COLOR.kurlyGray600};
`;

interface Props {
  title?: string;
  uriScheme: string;
}

export default function AppInstallButtons({ title, uriScheme }: Props) {
  const { moveToStore, onClickOpenApp } = useAppLink(uriScheme);

  return (
    <Wrapper>
      <NextImage src={kurlyMainLogo} alt="마켓컬리 로고" width={120} height={70} objectFit="contain" />
      {title && <Text>{title}</Text>}
      <ButtonWrapper>
        <Button onClick={moveToStore} width={187} height={56} radius={100} text="컬리 앱 설치하기" />
        <OpenButton onClick={onClickOpenApp}>{'컬리 앱 열기 >'}</OpenButton>
      </ButtonWrapper>
    </Wrapper>
  );
}
