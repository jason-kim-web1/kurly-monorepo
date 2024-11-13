export const removeAddressRegistered = () => {
  sessionStorage.removeItem('haveToPrint');
  sessionStorage.removeItem('hasRegistered');
  sessionStorage.removeItem('hasChanged');
};

export const storeAddressRegistered = (isAddressAssigned: boolean) => {
  // V2 에서 초기화 되지 못한 경우
  removeAddressRegistered();

  if (isAddressAssigned) {
    sessionStorage.setItem('hasRegistered', 'YES');
    return;
  }

  sessionStorage.setItem('hasChanged', 'YES');
};
