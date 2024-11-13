import styled from '@emotion/styled';
import { isEmpty } from 'lodash';

import type { PointBanner } from '../../../../product/detail/types';
import COLOR from '../../../constant/colorset';

interface StyleProps {
  body?: string;
  color: string;
  font: string;
  size: number;
  disabled?: boolean;
}

const getWeight = (font: string) => {
  switch (font) {
    case 'bold':
    case 'semibold':
      return '700';
    case 'light':
      return '300';
    case 'regular':
    case 'normal':
    default:
      return '400';
  }
};

const getColor = (color: string, disabled?: boolean) => {
  if (disabled) {
    return color; // COLOR.kurlyGray350; // TODO : disabled 상태에서는 색상을 그대로 사용인데 기획에서만 확인됨
  }
  return color || COLOR.kurlyGray600;
};

const Text = styled.span<StyleProps>`
  font-size: ${({ size }) => (size ? `${size}px` : '12px')};
  color: ${({ color, disabled }) => getColor(color, disabled)};
  font-weight: ${({ font }) => getWeight(font)};
`;

const PointBannerText = ({ pointBanner, disabled }: { pointBanner: PointBanner; disabled?: boolean }) => {
  const { isShow, contents } = pointBanner;
  if (!isShow || isEmpty(contents)) {
    return null;
  }

  return (
    <>
      {contents.map(({ body, color, font, size }, index) => (
        <Text key={`pointBanner-${index}`} color={color} size={size} font={font} disabled={disabled}>
          {index > 0 ? ', ' : ''}
          {body}
        </Text>
      ))}
    </>
  );
};

export default PointBannerText;
