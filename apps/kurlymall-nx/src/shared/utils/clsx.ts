import { chain, isString } from 'lodash';

const clsx = (...args: string[]) => chain(args).filter(isString).join(' ').value();

export { clsx };
