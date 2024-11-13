import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';

const Button = styled.button`
  display: inline-flex;
  color: ${COLOR.validBlue};
  align-items: center;
  font-size: 14px;
  font-weight: 500;

  svg {
    margin-left: 3px;
  }
`;

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="15" viewBox="0 0 8 15" fill="none">
    <rect opacity="0.01" y="0.5" width="8" height="14" fill="white" />
    <path
      d="M2 2.5L6.5 7L2 11.5"
      stroke={COLOR.validBlue}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const OpenCustomsSiteButton = () => {
  const handleClick = () => {
    //웹뷰에서 브라우저 새창열기를 위해 window.open 사용
    window.open('https://unipass.customs.go.kr/csp/persIndex.do', '_blank', 'noopener');
  };

  return (
    <Button onClick={handleClick}>
      관세청 사이트에서 조회/발급하기 <ArrowIcon />
    </Button>
  );
};

export default OpenCustomsSiteButton;
