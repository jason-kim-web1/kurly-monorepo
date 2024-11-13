import styled from '@emotion/styled';

import { UserInquiryContentImageData } from '../../../types';

const Container = styled.div`
  max-width: 744px;
  margin-top: 20px;
`;

const Image = styled.img`
  min-width: 338px;
  max-width: 744px;
  height: 450px;
  margin: 10px 10px 0 0;
  vertical-align: middle;
  border-radius: 6px;
`;

interface Props {
  images: UserInquiryContentImageData[];
}

export default function InquiryQnaImages({ images }: Props) {
  return (
    <Container>
      {images.map((image) => (
        <Image key={image.id} src={image.imageUrl} alt="" />
      ))}
    </Container>
  );
}
