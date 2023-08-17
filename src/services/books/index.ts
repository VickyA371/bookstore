import {AxiosResponse} from 'axios';
import axios from '../axios';
import {GET_BOOKS_RESPONSE, GET_BOOK_DETAILS_RESPONSE} from './types';

export const getBooks = async (): Promise<AxiosResponse<GET_BOOKS_RESPONSE>> =>
  await axios.get('people/mekBot/books/currently-reading.json');

export const getBookDetails = async (
  workId: string,
): Promise<AxiosResponse<GET_BOOK_DETAILS_RESPONSE>> =>
  await axios.get(`works/${workId}.json`);
