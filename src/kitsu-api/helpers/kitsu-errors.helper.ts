
import { KitsuErrorByIdResponse } from "../interfaces";
import { showErrorException } from "src/common/helpers";


export const getKitsuErrorById = (
  responseError: KitsuErrorByIdResponse
) => {
  const { errors } = responseError;
  showErrorException(errors, 404, 'detail');
}