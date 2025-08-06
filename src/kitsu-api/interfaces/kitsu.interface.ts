import { KitsuAnime, KitsuManga } from "./kitsu-detail.interface";


export interface KitsuResponse {
  data: Array<any> | object;
  meta: {
    count: number;
    total?: number;
  };
  links?: {
    first: string;
    last: string;
    next?: string;
    prev?: string;
  };
}

export interface KitsuSearchResponse {
  data: Array<any> | object;
  meta: {
    count: number;
    total?: number;
    first: string;
    last: string;
    next?: string;
    prev?: string;
  };
}

export interface KitsuMainIndividualResponse {
  data: KitsuIndividualResponse;
  errors?: KitsuErrorResponse[];
}

export interface KitsuErrorResponse {
  title: string;
  detail: string;
  code: string;
  status: string;
}

export interface KitsuIndividualResponse {
  id:            string;
  type:          string;
  links:         KitsuIndividualResponseLinks;
  attributes:    KitsuAnime | KitsuManga;
  relationships: { [key: string]: Relationship };
}

export interface CoverImage {
  tiny:     string;
  large:    string;
  small:    string;
  original: string;
  meta:     Meta;
}

export interface Meta {
  dimensions: Dimensions;
}

export interface Dimensions {
  tiny:    Large;
  large:   Large;
  small:   Large;
  medium?: Large;
}

export interface Large {
  width:  number;
  height: number;
}

export interface PosterImage {
  tiny:     string;
  large:    string;
  small:    string;
  medium:   string;
  original: string;
  meta:     Meta;
}

export interface Titles {
  en:    string;
  en_jp: string;
  ja_jp: string;
}

export interface KitsuIndividualResponseLinks {
  self: string;
}

export interface Relationship {
  links: RelationshipLinks;
}

export interface RelationshipLinks {
  self:    string;
  related: string;
}
