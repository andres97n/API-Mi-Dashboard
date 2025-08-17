
export enum KitsuTypeEnum {
  Anime = 'anime',
  Manga = 'manga',
  Categories = 'categories', 
}

// export const getKitsuTypeEnum = (type: string): KitsuTypeEnum => {
//   switch (type) {
//     case KitsuTypeEnum.Anime:
//       return KitsuTypeEnum.Anime;
//     case KitsuTypeEnum.Manga:
//       return KitsuTypeEnum.Manga;
//     case KitsuTypeEnum.Categories:
//       return KitsuTypeEnum.Categories;
//     default:
//       throw new Error(`Unknown Kitsu type: ${type}`);
//   }
// }

export const isKitsuTypeEnum = (type: string): type is KitsuTypeEnum => {
  return Object.values(KitsuTypeEnum).includes(type as KitsuTypeEnum);
}