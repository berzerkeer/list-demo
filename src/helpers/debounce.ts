type DebounceCallbackFn = (...args: string[]) => Promise<void>;

const debounce = (callback: DebounceCallbackFn, wait: number) => {
  let timeoutId: number;
  return (...args: string[]) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
};

export default debounce;
