import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import debounce from 'lodash.debounce';

// ** Hooks
import useBooks from '../../hooks/useBooks';

// ** Components
import Loader from '../../components/Loader';
import SearchBar, {RefType} from '../../components/SearchBar';
import BookItemRow from '../../components/BookItemRow';

// ** Types
import {LOG_ENTRY, SEARCH_DOC_TYPE} from '../../services/books/types';
import {RootNavigationType} from '../../navigation/types';

// ** MISC
import colors from '../../constants/colors';
import {keyExtractorHandler} from '../../utils/misc';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootNavigationType>>();

  const {books, booksFromSearch, searchLoading, searchBooks} = useBooks();

  const searchBarRef = useRef<RefType>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSave = useCallback(
    debounce((...values: [string, boolean]) => {
      searchBooks(...values);
    }, 600),
    [],
  );

  const onSearch = useCallback(
    (enteredText: string, searchByTitle: boolean) => {
      debouncedSave(enteredText, searchByTitle);
    },
    [debouncedSave],
  );

  const onBookItemPressHandler = (coverId: string) => {
    navigation.navigate('bookDetails', {
      coverId,
    });
  };

  const renderBookItemHandler = (
    searchDataLen: number,
    bookItemObj: ListRenderItemInfo<LOG_ENTRY | SEARCH_DOC_TYPE>,
  ) => {
    try {
      return (
        <BookItemRow
          coverId={
            searchDataLen
              ? bookItemObj.item.cover_i
              : bookItemObj.item.work.cover_id
          }
          title={
            searchDataLen
              ? bookItemObj.item.title
              : bookItemObj.item.work.title
          }
          authorNames={
            searchDataLen
              ? bookItemObj.item.author_name
              : bookItemObj.item.work.author_names
          }
          publishYear={
            searchDataLen
              ? bookItemObj.item.first_publish_year
              : bookItemObj.item.work.first_publish_year
          }
          onPress={onBookItemPressHandler.bind(
            null,
            searchDataLen
              ? bookItemObj.item.key.substring(
                  bookItemObj.item.key.lastIndexOf('/') + 1,
                )
              : bookItemObj.item.work.cover_edition_key,
          )}
        />
      );
    } catch (err: any) {
      console.log(
        '[HomeScreen - renderBookItemHandler] Error : ',
        err?.message,
      );
      return null;
    }
  };

  const renderListEmptyComponent = () => <Loader />;

  useEffect(() => {
    searchBarRef.current?.setLoading(searchLoading);
  }, [searchLoading]);

  const renderListHeaderComponent = useCallback(() => {
    return <SearchBar key="search" ref={searchBarRef} onUpdate={onSearch} />;
  }, [onSearch]);

  const data = useMemo(
    () => (booksFromSearch.length ? booksFromSearch : books),
    [books, booksFromSearch],
  );

  return (
    <FlatList<LOG_ENTRY | SEARCH_DOC_TYPE>
      data={data}
      renderItem={renderBookItemHandler.bind(null, booksFromSearch.length)}
      keyExtractor={keyExtractorHandler}
      style={styles.listStyle}
      contentContainerStyle={styles.contentContainer}
      ListEmptyComponent={renderListEmptyComponent}
      ListHeaderComponent={renderListHeaderComponent}
    />
  );
};

const styles = StyleSheet.create({
  listStyle: {
    flex: 1,
  },
  contentContainer: {
    // flex: 1,
    paddingHorizontal: 15,
    backgroundColor: colors.white,
    paddingBottom: 10,
  },
});

export default HomeScreen;
