export const assign = (path: string): void => {
  if (typeof window !== 'object') {
    return;
  }

  window.location.assign(path);
};
