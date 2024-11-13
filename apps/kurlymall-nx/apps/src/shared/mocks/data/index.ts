export function getStaticDataByPathName(pathname: string): NodeRequire {
  return require(`./${pathname.split('/').join('__')}.json`);
}

export function getStaticDataByFileName(fileName: string): NodeRequire {
  return require(`./${fileName}.json`);
}
