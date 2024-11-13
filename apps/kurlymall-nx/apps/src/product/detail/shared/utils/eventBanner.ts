const findEventBanner = (eventBannerElement: HTMLElement) => {
  const eventBannerButton =
    eventBannerElement.querySelector<HTMLElement>('.bnr_viewevent .btn') ||
    eventBannerElement.querySelector<HTMLElement>('.banner_view_event .arrow_button');
  const eventBannerView =
    eventBannerElement.querySelector<HTMLElement>('.bnr_viewevent > .view_event') ||
    eventBannerElement.querySelector<HTMLElement>('.banner_view_event > .content');

  return {
    eventBannerButton,
    eventBannerView,
  };
};

const isOpen = (targetElement: HTMLElement) => {
  return targetElement.classList.contains('btn_close');
};

const openEventBannerView = (eventBannerElement: HTMLElement) => {
  const { eventBannerButton, eventBannerView } = findEventBanner(eventBannerElement);

  if (!eventBannerButton || !eventBannerView) {
    return;
  }

  if (!isOpen(eventBannerButton)) {
    eventBannerButton.classList.add('btn_close');
    eventBannerView.classList.add('open');
    return;
  }

  eventBannerButton.classList.remove('btn_close');
  eventBannerView.classList.remove('open');
};

export const handleEventBanner = (eventBannerElement: HTMLElement) => {
  const { eventBannerButton } = findEventBanner(eventBannerElement);

  if (!eventBannerButton) {
    return;
  }

  eventBannerButton.addEventListener('click', () => {
    openEventBannerView(eventBannerElement);
  });
};
