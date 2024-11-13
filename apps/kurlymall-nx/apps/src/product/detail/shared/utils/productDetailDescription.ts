const findMWTestReportElement = (testReportElement: HTMLElement) => {
  const testReportOpenButton = testReportElement.querySelector<HTMLElement>('.tit_certify');
  const testReportThumbView = testReportElement.querySelector<HTMLElement>('.thumb_certify');
  const testReportImages = Array.from(testReportElement.querySelectorAll<HTMLElement>('.thumb'));
  const currentPageNumber = testReportElement.querySelector<HTMLElement>('.current');
  const prevButton = testReportElement.querySelector<HTMLElement>('.page_certify > .btn.btn_prev');
  const nextButton = testReportElement.querySelector<HTMLElement>('.page_certify > .btn.btn_next');

  return {
    testReportOpenButton,
    testReportThumbView,
    testReportImages,
    currentPageNumber,
    prevButton,
    nextButton,
  };
};

const openTestReportView = (element: HTMLElement) => {
  if (element.style.display === 'none') {
    element.style.display = 'block';
    return;
  }
  element.style.display = 'none';
};

const toggleTestReport = (testReport: HTMLElement) => {
  testReport.classList.toggle('on');
};

const isOpen = (targetElement: HTMLElement) => {
  return targetElement.classList.contains('on');
};

const moveSlide = (testReportImages: HTMLElement[], currentPageNumber: HTMLElement, nextPageNumber: number) => {
  testReportImages.forEach((image, i) => {
    if (image.classList.contains('on')) {
      image.classList.remove('on');
    }

    if (nextPageNumber === i + 1) {
      image.classList.add('on');
    }
  });

  // NOTE: 이동한 page number로 업데이트
  currentPageNumber.textContent = String(nextPageNumber);
};

const handleClickPrevSlide = (testReportElement: HTMLElement) => {
  const { currentPageNumber, prevButton, testReportImages } = findMWTestReportElement(testReportElement);

  if (!currentPageNumber || !prevButton) {
    return;
  }

  prevButton.addEventListener('click', () => {
    const pageNumber = Number(currentPageNumber.textContent);
    const nextPageNumber = pageNumber <= 1 ? testReportImages.length : pageNumber - 1;

    moveSlide(testReportImages, currentPageNumber, nextPageNumber);
  });
};

const handleClickNextSlide = (testReportElement: HTMLElement) => {
  const { currentPageNumber, nextButton, testReportImages } = findMWTestReportElement(testReportElement);

  if (!currentPageNumber || !nextButton) {
    return;
  }

  nextButton.addEventListener('click', () => {
    const pageNumber = Number(currentPageNumber.textContent);
    const nextPageNumber = pageNumber >= testReportImages.length ? 1 : pageNumber + 1;

    moveSlide(testReportImages, currentPageNumber, nextPageNumber);
  });
};

const initMWTestReport = (
  testReportElement: HTMLElement,
  testReportThumbView: HTMLElement,
  testReportImages: HTMLElement[],
) => {
  if (isOpen(testReportElement)) {
    openTestReportView(testReportThumbView);
  }

  // NOTE: 첫번째 이미지 보여주기
  testReportImages.forEach((testReportImage, index) => index === 0 && testReportImage.classList.add('on'));

  handleClickPrevSlide(testReportElement);
  handleClickNextSlide(testReportElement);
};

// MW 시험성적서 동작 스크립트
export const handleMWTestReport = ({
  testReportElement,
  handleClickOpen,
}: {
  testReportElement: HTMLElement;
  handleClickOpen(imageSrc: string): void;
}) => {
  const { testReportOpenButton, testReportThumbView, testReportImages } = findMWTestReportElement(testReportElement);

  if (!testReportOpenButton || !testReportThumbView) {
    return;
  }

  initMWTestReport(testReportElement, testReportThumbView, testReportImages);

  testReportOpenButton.addEventListener('click', () => {
    if (isOpen(testReportElement)) {
      openTestReportView(testReportThumbView);
    }

    if (!isOpen(testReportElement)) {
      openTestReportView(testReportThumbView);

      testReportImages.forEach((testReportImage) => {
        const zoomImage = testReportImage.querySelector('.thumbZoom');

        if (!zoomImage) {
          return;
        }

        testReportImage.addEventListener('click', () => {
          const imageSrc = zoomImage.getAttribute('src');

          if (!imageSrc) {
            return;
          }

          handleClickOpen(imageSrc);
        });
      });
    }

    toggleTestReport(testReportElement);
  });
};

const findPCTestReportElement = (testReportElement: HTMLElement) => {
  const testReportOpenButton = testReportElement.querySelector<HTMLElement>('.tit_certify');
  const testReportThumbView = testReportElement.querySelector<HTMLElement>('.thumb_certify');
  const testReportImages = Array.from(testReportElement.querySelectorAll<HTMLElement>('.view_certify .thumb'));
  const pageCertifyWrapper = testReportElement.querySelector<HTMLElement>('.page_certify .page');
  const pageCertifyList = testReportElement.querySelector<HTMLElement>('.page_certify .page .list');
  const thumbImages = testReportElement.querySelectorAll<HTMLElement>('.page_certify .page .list > li');
  const prevButton = testReportElement.querySelector<HTMLElement>('.page_certify > .btn.btn_prev');
  const nextButton = testReportElement.querySelector<HTMLElement>('.page_certify > .btn.btn_next');

  // api상 inline style이 같이 내려오고 있어 해당 영역 초기화해줌
  if (testReportThumbView) {
    testReportThumbView.style.display = '';
  }

  return {
    testReportOpenButton,
    testReportThumbView,
    testReportImages,
    pageCertifyWrapper,
    pageCertifyList,
    thumbImages,
    prevButton,
    nextButton,
  };
};

const getCurrentNumber = (testReportElement: HTMLElement) => {
  const testReportItems = testReportElement.querySelectorAll<HTMLElement>('.page_certify .page .list > li');
  const currentPageNumber = Array.from(testReportItems).findIndex((item) => item.className === 'on') + 1;
  return currentPageNumber;
};

const MORE_SHOW_SIZE = 20;
const THUMB_IMAGES_DEFAULT_GAP = 4;
const THUMB_IMAGE_MARGIN_SIZE = 78;

const getPageWrapperTopSize = (testReportElement: HTMLElement, nextPageNumber: number) => {
  const { pageCertifyList, thumbImages, pageCertifyWrapper } = findPCTestReportElement(testReportElement);

  if (nextPageNumber === 1 || !pageCertifyList || !pageCertifyWrapper) {
    return `top: ${THUMB_IMAGES_DEFAULT_GAP}px`;
  }

  let parentTop = 0;
  thumbImages.forEach((it, i) => {
    if (i < getCurrentNumber(testReportElement) - 1) {
      parentTop += it.offsetHeight + 10;
    }
  });

  if (parentTop > pageCertifyList.offsetHeight - pageCertifyWrapper.offsetHeight) {
    return `top: -${pageCertifyList.offsetHeight - pageCertifyWrapper.offsetHeight - THUMB_IMAGES_DEFAULT_GAP}px`;
  }

  return `top: -${parentTop - MORE_SHOW_SIZE}px`;
};

const movePcSlide = (testReportElement: HTMLElement, nextPageNumber: number) => {
  const { testReportImages, pageCertifyList, thumbImages } = findPCTestReportElement(testReportElement);

  if (!testReportImages || !pageCertifyList || !thumbImages) {
    return;
  }

  testReportImages.forEach((it, i) => {
    it.classList.remove('off');

    if (nextPageNumber !== i + 1) {
      it.classList.add('off');
    }
  });

  thumbImages.forEach((it, i) => {
    it.classList.add('on');

    if (nextPageNumber !== i + 1) {
      it.classList.remove('on');
    }
  });

  pageCertifyList.style.cssText = getPageWrapperTopSize(testReportElement, nextPageNumber);
};

const handleClickPcPrevSlide = (testReportElement: HTMLElement) => {
  const { prevButton, testReportImages } = findPCTestReportElement(testReportElement);

  if (!prevButton || !testReportImages) {
    return;
  }

  prevButton.addEventListener('click', () => {
    const pageNumber = getCurrentNumber(testReportElement);
    const nextPageNumber = pageNumber <= 1 ? testReportImages.length : pageNumber - 1;

    movePcSlide(testReportElement, nextPageNumber);
  });
};

const handleClickPcNextSlide = (testReportElement: HTMLElement) => {
  const { nextButton, testReportImages } = findPCTestReportElement(testReportElement);

  if (!nextButton || !testReportImages) {
    return;
  }

  nextButton.addEventListener('click', () => {
    const pageNumber = getCurrentNumber(testReportElement);
    const nextPageNumber = pageNumber >= testReportImages.length ? 1 : pageNumber + 1;

    movePcSlide(testReportElement, nextPageNumber);
  });
};

const initPCTestReport = (testReportElement: HTMLElement, testReportThumbView: HTMLElement) => {
  if (isOpen(testReportElement)) {
    testReportThumbView.classList.add('close');
  }

  const { testReportImages, pageCertifyWrapper } = findPCTestReportElement(testReportElement);

  const imagesHeight = testReportImages.map((it) => it.offsetHeight);
  const thumbMaxHeight = Math.max(...imagesHeight);
  if (testReportThumbView && pageCertifyWrapper && thumbMaxHeight !== 0) {
    testReportThumbView.style.height = `${thumbMaxHeight + THUMB_IMAGE_MARGIN_SIZE}px`;
    pageCertifyWrapper.style.height = `${thumbMaxHeight}px`;
  }
  testReportThumbView.classList.add('close');

  movePcSlide(testReportElement, 1);

  handleClickPcPrevSlide(testReportElement);
  handleClickPcNextSlide(testReportElement);
};

// PC 시험성적서 동작 스크립트
export const handlePCTestReport = (testReportElement: HTMLElement) => {
  const { testReportOpenButton, testReportThumbView, thumbImages } = findPCTestReportElement(testReportElement);

  if (!testReportOpenButton || !testReportThumbView || !thumbImages) {
    return;
  }

  initPCTestReport(testReportElement, testReportThumbView);

  testReportOpenButton.addEventListener('click', () => {
    if (isOpen(testReportElement)) {
      testReportThumbView.classList.add('close');
    }

    if (!isOpen(testReportElement)) {
      testReportThumbView.classList.remove('close');
      thumbImages.forEach((thumbImage, i) => {
        thumbImage.addEventListener('click', () => {
          movePcSlide(testReportElement, i + 1);
        });
      });
    }

    toggleTestReport(testReportElement);
  });
};

const findPCCertificationElement = (certificationElement: HTMLElement) => {
  const certificationButtons = Array.from(certificationElement.querySelectorAll<HTMLElement>('.showSingle'));
  const certificationImages = Array.from(certificationElement.querySelectorAll<HTMLElement>('.target_contents'));

  return {
    certificationButtons,
    certificationImages,
  };
};

// 시험성적서 - 인증서
export const handleCertification = (certificationElement: HTMLElement) => {
  const { certificationButtons, certificationImages } = findPCCertificationElement(certificationElement);

  certificationButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      certificationButtons.forEach((it, j) => {
        if (j !== index) {
          it.classList.remove('selected');
          certificationImages[j].style.display = 'none';
          return;
        }

        it.classList.add('selected');
        certificationImages[j].style.display = '';
      });
    });
  });
};
