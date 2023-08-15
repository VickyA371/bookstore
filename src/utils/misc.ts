import constants from '../constants';
import {BOOK_COVER_RESOLUTION} from '../services/books/types';

export const getBookCover = (
  coverId: number,
  coverResolution: BOOK_COVER_RESOLUTION = BOOK_COVER_RESOLUTION.medium,
): string =>
  `${constants.URLs.BOOK_COVER_BASE_URL}${coverId}-${coverResolution}.jpg`;
