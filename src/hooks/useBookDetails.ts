import {useCallback, useEffect, useState} from 'react';
import axios from 'axios';

import {getBookDetails} from '../services/books';
import {GET_BOOK_DETAILS_RESPONSE} from '../services/books/types';

const useBookDetails = (coverId: string) => {
  const [isLoading, setLoading] = useState(true);
  const [bookDetails, setBookDetails] = useState<GET_BOOK_DETAILS_RESPONSE>();

  const fetchBookDetails = useCallback(async () => {
    try {
      const bookDetailRes = await getBookDetails(coverId);
      setLoading(false);
      setBookDetails(bookDetailRes.data);
    } catch (error: any) {
      setLoading(false);
      console.log('Error : ', error?.message);
      if (axios.isAxiosError(error)) {
        console.log('[useBooks - initHandler] error.response?.data : ', error);
      } else {
        console.log('[useBooks - initHandler] unexpected error: ', error);
      }
    }
  }, [coverId]);

  useEffect(() => {
    fetchBookDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
    bookDetails,
  };
};
export default useBookDetails;
