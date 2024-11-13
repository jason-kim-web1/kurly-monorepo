import { render } from '@testing-library/react';

import MainQuickMenuCardImage from './MainQuickMenuCardImage';

describe('MainQuickMenuCardImage', () => {
  const renderMainQuickMenuCardImage = () =>
    render(
      <MainQuickMenuCardImage
        className={given.className}
        imageUrl={given.imageUrl}
        lottieUrl={given.lottieUrl}
        lottieLoop={given.lottieLoop}
      >
        {given.children}
      </MainQuickMenuCardImage>,
    );

  beforeEach(() => {
    given('lottieUrl', () => '');
    given('imageUrl', () => '');
    given('lottieLoop', () => null);
  });

  context('lottie url이 있으면', () => {
    given('lottieUrl', () => 'https://lottie.host/1a8359aa-7f5b-48e4-9803-c4e0008c90e0/GFRKPHJ5Dt.json');

    it('lottie player가 렌더링 되어야 한다.', () => {
      const { getByTestId } = renderMainQuickMenuCardImage();
      expect(getByTestId('quick-menu-lottie')).toBeInTheDocument();
    });
  });

  context('이미지 url이 있으면', () => {
    given(
      'imageUrl',
      () => 'https://product-image-stg.kurly.com/product/image/28b2c55e-0dc0-43f1-9140-88e2cf153e49.png',
    );

    it('이미지가 노출되어야 되어야 한다.', () => {
      const { getByAltText } = renderMainQuickMenuCardImage();
      expect(getByAltText('퀵메뉴 이미지')).toBeInTheDocument();
    });
  });

  context('lottie url과 이미지 url이 둘다 있으면', () => {
    given('lottieUrl', () => 'https://lottie.host/1a8359aa-7f5b-48e4-9803-c4e0008c90e0/GFRKPHJ5Dt.json');
    given(
      'resizeImageUrl',
      () => 'https://product-image-stg.kurly.com/product/image/28b2c55e-0dc0-43f1-9140-88e2cf153e49.png',
    );

    it('lottie가 노출되고 이미지는 노출되지 않아야 한다.', () => {
      const { getByTestId, queryByAltText } = renderMainQuickMenuCardImage();
      expect(getByTestId('quick-menu-lottie')).toBeInTheDocument();
      expect(queryByAltText('퀵메뉴 이미지')).not.toBeInTheDocument();
    });
  });
});
