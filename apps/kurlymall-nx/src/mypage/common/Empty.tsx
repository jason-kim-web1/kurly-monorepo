import styled from '@emotion/styled';

import Button from '../../shared/components/Button/Button';
import { isPC } from '../../../util/window/getDevice';

const Wrapper = styled.div`
  position: ${isPC ? 'static' : 'absolute'};
  width: 100%;
  height: ${isPC ? '557px' : 'calc(100% - 44px)'};
  top: 44px;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button > span {
    font-size: ${isPC ? '14px' : '16px'};
    line-height: 44px;
  }
`;

const Title = styled.strong<{ imgUrl: string }>`
  display: block;
  margin-bottom: ${isPC ? '20px' : '28px'};
  font-size: 16px;
  font-weight: normal;
  color: #b5b5b5;
  &:before {
    display: block;
    width: ${isPC ? '60px' : '68px'};
    height: ${isPC ? '60px' : '68px'};
    margin: 0 auto ${isPC ? '16px' : '8px'};
    background: url(${(props) => props.imgUrl}) no-repeat 50% 50% / cover;
    content: '';
  }
`;

interface Props {
  titleText: string;
  titleImage: string;
  buttonText: string;
  onClickEmptyButton(): void;
}

export default function Empty({ titleText, titleImage, buttonText, onClickEmptyButton }: Props) {
  return (
    <Wrapper>
      <Title imgUrl={titleImage}>{titleText}</Title>
      <Button
        text={buttonText}
        width={isPC ? 150 : 146}
        height={44}
        radius={isPC ? 3 : 22}
        onClick={onClickEmptyButton}
      />
    </Wrapper>
  );
}
