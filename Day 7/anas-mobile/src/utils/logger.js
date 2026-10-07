const PREFIX = '>>> AnasMobile:';

export const log = (...args) => { if (__DEV__) console.log(PREFIX, ...args); };
export const warn = (...args) => { if (__DEV__) console.warn(PREFIX, ...args); };
export const error = (...args) => { if (__DEV__) console.error(PREFIX, ...args); };