import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

import { Segment } from '../../../../shared/interfaces/MyKurlyStyle';

const SegmentTitle = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 23px;
`;

const TooltipWrapper = styled.div``;

const TooltipTitle = styled.dt`
  margin: 16px 0 8px;
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
`;

const TooltipDescription = styled.dd`
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  color: ${COLOR.kurlyGray600};
`;

interface Props {
  name: string;
  segments: Segment[];
}

export default function Tooltip({ name, segments }: Props) {
  return (
    <>
      <SegmentTitle>{name} 안내</SegmentTitle>
      {segments.map(({ id, name: segmentName, description }) => (
        <TooltipWrapper key={id}>
          <TooltipTitle>{segmentName}</TooltipTitle>
          {description && <TooltipDescription>{description}</TooltipDescription>}
        </TooltipWrapper>
      ))}
    </>
  );
}
