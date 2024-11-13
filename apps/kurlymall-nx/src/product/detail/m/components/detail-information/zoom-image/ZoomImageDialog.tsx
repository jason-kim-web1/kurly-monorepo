import styled from '@emotion/styled';

import SimpleDialog from '../../../../../../shared/components/Dialog/SimpleDialog';

const ContentsWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const CloseButton = styled.button`
  position: fixed;
  z-index: 2;
  right: 20px;
  top: 44px;
  width: 44px;
  height: 38px;
  background: url(https://res.kurly.com/mobile/service/common/1910/ico_close_333_88x76.png) no-repeat 50% 50%;
  background-size: 44px 38px;
`;

const Image = styled.img`
  width: 100%;
`;

interface Props {
  open: boolean;
  onHandleClose(): void;
  dialogImage: string;
}

export default function ZoomImageDialog({ open, onHandleClose, dialogImage }: Props) {
  return (
    <SimpleDialog onHandleClose={onHandleClose} open={open}>
      <ContentsWrapper>
        <CloseButton onClick={onHandleClose} />
        <Image src={dialogImage} alt="자세히 보기 이미지" />
      </ContentsWrapper>
    </SimpleDialog>
  );
}
