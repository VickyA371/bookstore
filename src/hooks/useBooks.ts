import {useEffect, useState} from 'react';
import axios from 'axios';

// ** Services
import {getBooks} from '../services/books';

// ** Types
import {LOG_ENTRY} from '../services/books/types';

const useBooks = () => {
  const [books, setBooks] = useState<LOG_ENTRY[]>([]);
  const [loading, setLoading] = useState(true);

  const initHandler = async () => {
    try {
      const resp = await getBooks();
      setLoading(false);
      setBooks(resp.data.reading_log_entries);
    } catch (error: any) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        console.log('[useBooks - initHandler] error.response?.data : ', error);
      } else {
        console.log('[useBooks - initHandler] unexpected error: ', error);
      }
    }
  };

  useEffect(() => {
    initHandler();
  }, []);

  return {
    loading,
    books,
  };
};

export default useBooks;
