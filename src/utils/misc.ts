import {ToastAndroid} from 'react-native';
import constants from '../constants';
import {BOOK_COVER_RESOLUTION} from '../services/books/types';

export const getBookCover = (
  coverId: number,
  coverResolution: BOOK_COVER_RESOLUTION = BOOK_COVER_RESOLUTION.medium,
): string =>
  `${constants.URLs.BOOK_COVER_BASE_URL}${coverId}-${coverResolution}.jpg`;

export const keyExtractorHandler = (_item: any, index: number) =>
  index.toString();

export const showToast = (message: string, timeout = ToastAndroid.LONG) => {
  ToastAndroid.show(message, timeout);
};

export const formatAuthorNames = (authorNames: string[]) => {
  return authorNames.reduce(
    (prevVal: string, currVal: string, index: number, array: string[]) =>
      prevVal +
      currVal +
      (index === array.length - 2
        ? ' and '
        : index === array.length - 1
        ? ''
        : ', '),
    '',
  );
};

export const getRandomNumber = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};
