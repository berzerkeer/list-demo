type withAsyncFn<T = unknown> = () => T | Promise<T>;

type withAsyncReturn<TData, TError> = Promise<{
  response: TData | null;
  error: TError | unknown;
}>;

export async function withAsync<TData = unknown, TError = unknown>(
  fn: withAsyncFn<TData>
): withAsyncReturn<TData, TError> {
  try {
    if (typeof fn !== 'function') {
      throw new Error('withAsync requires a function as the first argument');
    }
    const response = await fn();
    return {
      response,
      error: null,
    };
  } catch (error) {
    return {
      error,
      response: null,
    };
  }
}
