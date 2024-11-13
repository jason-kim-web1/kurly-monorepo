import styled from '@emotion/styled';

import COLOR from '../../../../constant/colorset';

const Icon = styled.svg`
  transition: fill 300ms ease-out;
`;

interface Props {
  width: number;
  height: number;
  color: string;
}

// Disabled = EEE
// Active = #333

const ArrowNext24x44 = ({ width = 24, height = 44, color = COLOR.kurlyGray200 }: Props) => (
  <Icon xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 44">
    <g fill="none" fillRule="evenodd">
      <path d="M0 0H24V44H0z" transform="translate(-673 -2125) translate(607 2125) translate(56) translate(10)" />
      <path
        fill={color}
        d="M15.146 13.646c.196-.195.512-.195.708 0 .173.174.192.443.057.638l-.057.07L8.207 22l7.647 7.646c.173.174.192.443.057.638l-.057.07c-.174.173-.443.192-.638.057l-.07-.057-8-8c-.173-.174-.192-.443-.057-.638l.057-.07 8-8z"
        transform="translate(-673 -2125) translate(607 2125) translate(56) translate(10) matrix(-1 0 0 1 23 0)"
      />
    </g>
  </Icon>
);

export default ArrowNext24x44;
