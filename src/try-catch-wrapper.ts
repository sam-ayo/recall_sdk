interface RecallError {
  error: any;
  status: number;
}
const recallRequestTryCatchWrapper = async <T>(func: () => Promise<any>): Promise<T | RecallError> => {
  try {
    const response = await func();
    return response.data;
  } catch (e: any) {
    return { error: e.response.data, status: e.response.statusCode };
  }
};

export { recallRequestTryCatchWrapper, RecallError };
