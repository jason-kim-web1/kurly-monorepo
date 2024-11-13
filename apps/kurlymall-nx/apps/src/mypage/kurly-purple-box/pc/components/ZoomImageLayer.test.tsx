import { fireEvent, render } from '@testing-library/react';

import ZoomImageLayer from './ZoomImageLayer';
import { ICON_CAMERA_PC } from '../../shared/constants/imageUrl';

describe('KurlyPurpleBoxZoomImageLayer', () => {
  const closeZoomLayer = jest.fn();
  const zoomImage = ICON_CAMERA_PC;

  const renderZoomImageLayer = () => render(<ZoomImageLayer closeZoomLayer={closeZoomLayer} zoomImage={zoomImage} />);

  it('이미지가 로딩 된다', () => {
    const { queryByRole } = renderZoomImageLayer();

    expect(queryByRole('img')).toHaveAttribute('src', zoomImage);
  });

  it('줌인 이미지 닫기 버튼을 클릭하면, 줌레이어 팝업이 닫히는 함수가 호출된다', () => {
    const { getByText } = renderZoomImageLayer();
    fireEvent.click(getByText('줌인 이미지 닫기'));

    expect(closeZoomLayer).toBeCalled();
  });
});
