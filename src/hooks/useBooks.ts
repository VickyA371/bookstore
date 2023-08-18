import {useCallback, useEffect, useState} from 'react';
import axios from 'axios';

// ** Services
import {getBooks, searchBooksService} from '../services/books';

// ** Types
import {LOG_ENTRY, SEARCH_DOC_TYPE} from '../services/books/types';

const useBooks = () => {
  const [books, setBooks] = useState<LOG_ENTRY[]>([]);
  const [booksFromSearch, setBooksFromSearch] = useState<SEARCH_DOC_TYPE[]>([]);

  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);

  const initHandler = useCallback(async () => {
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
        setBooksFromSearch(resp.data.docs);
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
    booksFromSearch,
    searchBooks,
  };
};

export default useBooks;
