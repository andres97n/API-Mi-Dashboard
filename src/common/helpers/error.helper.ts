import { HttpException } from "@nestjs/common";


export const handleApiError = (
  err: any, 
  showError?: (data: any) => void
) => {
  const { status, data } = err.response || {};
  if (showError) showError(data);

  throw new HttpException(
    'Fetch error',
    status || 500
  );
};