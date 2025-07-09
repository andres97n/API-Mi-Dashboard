
export enum SerieTypeEnum {
  animeSeries = 'ANIME_SERIES',
  mangaSeries = 'MANGA_SERIES',
  tvSeries = 'TV_SERIES',
  movieSeries =  'MOVIE',
  documentary = 'DOCUMENTARY'
};

export enum SerieStatusEnum {
  inBroadcast = 'IN_BROADCAST',
  incomplete = 'INCOMPLETE',
  completed = 'COMPLETED',
  unfinished = 'UNFINISHED',
  canceled = 'CANCELED',
  empty = 'EMPTY'
}

export enum SerieEmissionStatusEnum {
  finishedSerie = 'FINISHED_SERIE',
  unfinishedSerie = 'UNFINISHED_SERIES',
  streaminSerie = 'STREAMING_SERIES',
  serieNotStarted = 'SERIES_NOT_STARTED'
};

export enum SerieViewStatusEnum {
  seenSeries = 'SEEN_SERIES',
  unseenSeries = 'UNSEEN_SERIES',
  incompleteViewSeries = 'INCOMPLETE_VIEW_SERIES'
};