import {useCallback, useEffect, useState} from 'react';
import {plainToInstance} from 'class-transformer';
import axios from 'axios';

// ** Services
import {getBooks, searchBooksService} from '../services/books';

// ** Types
import {
  FETCH_BOOKS,
  FETCH_SEARCH_BOOKS,
  LOG_ENTRY,
  SEARCH_DOC_TYPE,
} from '../services/books/types';

const useBooks = () => {
  const [books, setBooks] = useState<LOG_ENTRY[] | SEARCH_DOC_TYPE[]>([]);

  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);

  const initHandler = useCallback(async () => {
    try {
      const resp = await getBooks();
      setLoading(false);
      const arr = plainToInstance(FETCH_BOOKS, {
        data: resp.data.reading_log_entries,
      });

      setBooks(arr.data);
    } catch (error: any) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        console.log('[useBooks - initHandler] error.response?.data : ', error);
      } else {
        console.log('[useBooks - initHandler] unexpected error: ', error);
      }
    }
  }, []);

  useEffect(() => {
    initHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchBooks = useCallback(
    async (searchQuery: string, searchByTitle = true) => {
      try {
        setSearchLoading(true);
        const resp = await searchBooksService(searchQuery, searchByTitle);
        const arr = plainToInstance(FETCH_SEARCH_BOOKS, {
          data: resp.data.docs,
        });
        setBooks(arr.data);
        setSearchLoading(false);
      } catch (error: any) {
        setSearchLoading(false);
        if (axios.isAxiosError(error)) {
          console.log(
            '[useBooks - searchBooks] error.response?.data : ',
            error?.message,
          );
        } else {
          console.log('[useBooks - searchBooks] unexpected error: ', error);
        }
      }
    },
    [],
  );

  return {
    loading,
    searchLoading,
    books,
    searchBooks,
  };
};

export default useBooks;
