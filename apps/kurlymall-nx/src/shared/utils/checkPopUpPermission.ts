export const checkPopUpPermission = (childWindow: Window | undefined | null) => {
  try {
    return !(!childWindow || childWindow.closed || typeof childWindow.closed === 'undefined');
  } catch (error) {
    return false;
  }
};
