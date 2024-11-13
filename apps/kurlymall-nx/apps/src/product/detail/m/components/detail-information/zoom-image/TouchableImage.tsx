import styled from '@emotion/styled';

const TouchableWrapper = styled.div`
  display: flex;
`;

const Image = styled.img`
  width: 100%;
  padding: 0 16px;
`;

interface Props {
  imageUrl: string;
  onClickTouchableImage(): void;
}

export default function TouchableImage({ imageUrl, onClickTouchableImage }: Props) {
  return (
    <TouchableWrapper onClick={onClickTouchableImage}>
      <Image src={imageUrl} alt="자세히 보기 이미지" />
    </TouchableWrapper>
  );
}
