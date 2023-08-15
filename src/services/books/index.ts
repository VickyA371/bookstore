import {AxiosResponse} from 'axios';
import axios from '../axios';
import {GET_BOOKS_RESPONSE} from './types';

export const getBooks = async (): Promise<AxiosResponse<GET_BOOKS_RESPONSE>> =>
  await axios.get('people/mekBot/books/currently-reading.json');
