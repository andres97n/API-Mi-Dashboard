import { CoverImage, PosterImage, Titles } from "./kitsu.interface";


export interface KitsuAnime {
  createdAt:           Date;
  updatedAt:           Date;
  slug:                string;
  synopsis:            string;
  description:         string;
  coverImageTopOffset: number;
  titles:              Titles;
  canonicalTitle:      string;
  abbreviatedTitles:   string[];
  averageRating:       string;
  ratingFrequencies:   { [key: string]: string };
  userCount:           number;
  favoritesCount:      number;
  startDate:           Date;
  endDate:             Date;
  nextRelease:         null;
  popularityRank:      number;
  ratingRank:          number;
  ageRating:           string;
  ageRatingGuide:      string;
  subtype:             string;
  status:              string;
  tba:                 null;
  posterImage:         PosterImage;
  coverImage:          CoverImage;
  episodeCount:        number;
  episodeLength:       number;
  totalLength:         number;
  youtubeVideoId:      string;
  showType:            string;
  nsfw:                boolean;
}

export interface KitsuManga {
  createdAt:           Date;
  updatedAt:           Date;
  slug:                string;
  synopsis:            string;
  description:         string;
  coverImageTopOffset: number;
  titles:              Titles;
  canonicalTitle:      string;
  abbreviatedTitles:   string[];
  averageRating:       string;
  ratingFrequencies:   { [key: string]: string };
  userCount:           number;
  favoritesCount:      number;
  startDate:           Date;
  endDate:             Date;
  nextRelease:         null;
  popularityRank:      number;
  ratingRank:          number;
  ageRating:           null;
  ageRatingGuide:      null;
  subtype:             string;
  status:              string;
  tba:                 null;
  posterImage:         PosterImage;
  coverImage:          null;
  chapterCount:        number;
  volumeCount:         number;
  serialization:       string;
  mangaType:           string;
}

