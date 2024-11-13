const isNotNull = <T>(arg: T | null): arg is T => arg !== null;

const isDefined = <T>(arg: T | undefined): arg is T => typeof arg !== 'undefined';

const isNotEmpty = <T>(arg: T[] | undefined): arg is T[] => typeof arg !== 'undefined' && arg.length > 0;

export { isNotNull, isDefined, isNotEmpty };
