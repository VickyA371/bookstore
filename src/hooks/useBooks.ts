import {useEffect, useState} from 'react';
import axios from 'axios';

// ** Services
import {getBooks} from '../services/books';

// ** Types
import {LOG_ENTRY} from '../services/books/types';

const useBooks = () => {
  const [books, setBooks] = useState<LOG_ENTRY[]>([]);

  const initHandler = async () => {
    try {
      const resp = await getBooks();
      setBooks(resp.data.reading_log_entries);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log('error.response?.data : ', error);
      } else {
        console.log('unexpected error: ', error);
      }
    }
  };

  useEffect(() => {
    initHandler();
  }, []);

  return {
    books,
  };
};

export default useBooks;
