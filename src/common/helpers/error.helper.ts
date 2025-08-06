import { HttpException } from "@nestjs/common";

import { DEFAULT_EXCEPTION_MESSAGE } from "../constants";
import { getExceptionDefault } from "./http-exception.helper";


export const handleApiError = (
  err: any, 
  showError?: (data: any) => void
) => {
  const { status, data } = err.response || {};
  if (showError) showError(data);


  // getExceptionDefault(500, );
  throw new HttpException(
    'Fetch error',
    status || 500
  );
};

export const getErrorMessage = (error: any, subField?: string): string => {

if (Array.isArray(error) && error.length > 0) {
    if (subField && subField in error[0]) return error[0][subField];
    return error[0]['message'] ?? error[0];
  }

  if (typeof error === 'object') {
    if (subField && error[subField]) return error[subField];
    return error['message'] ?? error;
  }

  if (typeof error === 'string') return error;

  return error || DEFAULT_EXCEPTION_MESSAGE;
}