import {AxiosResponse} from 'axios';
import axios from '../axios';
import {
  GET_BOOKS_RESPONSE,
  GET_BOOK_DETAILS_RESPONSE,
  GET_SEARCH_RESULTS_RESPONSE_TYPE,
} from './types';

export const getBooks = async (): Promise<AxiosResponse<GET_BOOKS_RESPONSE>> =>
  await axios.get('people/mekBot/books/currently-reading.json');

export const getBookDetails = async (
  workId: string,
): Promise<AxiosResponse<GET_BOOK_DETAILS_RESPONSE>> =>
  await axios.get(`works/${workId}.json`);

export const searchBooksService = async (
  query: string,
  byTitle: boolean,
): Promise<AxiosResponse<GET_SEARCH_RESULTS_RESPONSE_TYPE>> => {
  const str = `search.json?q=${
    byTitle ? 'title' : 'author'
  }:${query}&_spellcheck_count=0&limit=10&fields=key,first_publish_year,cover_i,title,subtitle,author_name,name&mode=everything`;
  return await axios.get(str);
};
