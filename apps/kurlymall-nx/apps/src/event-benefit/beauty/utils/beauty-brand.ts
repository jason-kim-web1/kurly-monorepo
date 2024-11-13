const productNameMapper = (name: string) => name.replace(/\[.*?]/g, '').trim();

export { productNameMapper };
