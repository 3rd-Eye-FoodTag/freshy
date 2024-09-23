export const LoadingState = {
  INITIAL: 'INITIAL',
  FETCH: 'FETCH',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

export const aysncField = (field: any | undefined) => {
  return {
    ...field,
    loadingState: LoadingState.INITIAL,
    error: undefined,
  };
};

export const fetch = (field: any) => {
  return {...field, loadingState: LoadingState.FETCH};
};

export const success = (field: any, data: any) => {
  const obj = {...field, loadingState: LoadingState.SUCCESS};
  if (data) {
    return Object.assign(obj, data);
  }

  return obj;
};

export const error = (field: any, exception: any, errorCode: any) => {
  return {
    ...field,
    loadingState: LoadingState.ERROR,
    error: exception,
    errorCode,
  };
};
