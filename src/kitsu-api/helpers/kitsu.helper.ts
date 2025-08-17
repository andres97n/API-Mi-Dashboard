import { KITSU_API_BASE_URL } from "../constants";
import { KitsuIndividualResponse } from "../interfaces";


export const replaceKitsuApiUrls = (
  obj: KitsuIndividualResponse, 
  oldBase: string = KITSU_API_BASE_URL, 
  newBase: string,
): any  => {

  if (Array.isArray(obj)) {
    return obj.map(item => replaceKitsuApiUrls(item, oldBase, newBase));
  }

  if (obj !== null && typeof obj === 'object') {
    const result: any = {};

    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        if (value.startsWith(oldBase)) result[key] = value.replace(oldBase, newBase);
        if (!value.startsWith(oldBase)) result[key] = value;
      } 

      if (typeof value !== 'string') {
        result[key] = replaceKitsuApiUrls(value, oldBase, newBase);
      }
    }

    return result;
  }

  return obj;
}