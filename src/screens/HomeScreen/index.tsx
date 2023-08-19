import React, {useCallback, useEffect, useRef} from 'react';
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
import {getRandomNumber, keyExtractorHandler} from '../../utils/misc';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootNavigationType>>();

  const {books, searchLoading, searchBooks, initHandler} = useBooks();

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

  const onBookItemPressHandler = useCallback(
    (coverId: string, img: number) => {
      searchBarRef.current?.blur?.();
      navigation.navigate('bookDetails', {
        coverId,
        img,
      });
    },
    [navigation],
  );

  const renderBookItemHandler = useCallback(
    (bookItemObj: ListRenderItemInfo<LOG_ENTRY | SEARCH_DOC_TYPE>) => {
      try {
        const workId =
          (bookItemObj.item instanceof LOG_ENTRY
            ? bookItemObj.item.work.cover_edition_key
            : bookItemObj.item.key.substring(
                bookItemObj.item.key.lastIndexOf('/') + 1,
              )) ?? getRandomNumber(1000, 9999);

        const img =
          bookItemObj.item instanceof LOG_ENTRY
            ? bookItemObj.item.work.cover_id
            : bookItemObj.item.cover_i;
        return (
          <BookItemRow
            coverId={img}
            title={
              bookItemObj.item instanceof LOG_ENTRY
                ? bookItemObj.item.work.title
                : bookItemObj.item.title
            }
            authorNames={
              bookItemObj.item instanceof LOG_ENTRY
                ? bookItemObj.item.work.author_names
                : bookItemObj.item.author_name
            }
            publishYear={
              bookItemObj.item instanceof LOG_ENTRY
                ? bookItemObj.item.work.first_publish_year
                : bookItemObj.item.first_publish_year
            }
            workId={workId}
            onPress={onBookItemPressHandler.bind(null, workId, img)}
          />
        );
      } catch (err: any) {
        console.log(
          '[HomeScreen - renderBookItemHandler] Error : ',
          err?.message,
        );
        return null;
      }
    },
    [onBookItemPressHandler],
  );

  const renderListEmptyComponent = useCallback(() => <Loader />, []);

  useEffect(() => {
    searchBarRef.current?.setLoading(searchLoading);
  }, [searchLoading]);

  const onClearSearchResHandler = useCallback(() => {
    initHandler();
  }, [initHandler]);

  const renderListHeaderComponent = useCallback(() => {
    return (
      <SearchBar
        key="search"
        ref={searchBarRef}
        onUpdate={onSearch}
        onClear={onClearSearchResHandler}
      />
    );
  }, [onClearSearchResHandler, onSearch]);

  return (
    <FlatList<LOG_ENTRY | SEARCH_DOC_TYPE>
      data={books}
      renderItem={renderBookItemHandler}
      keyExtractor={keyExtractorHandler}
      style={styles.listStyle}
      extraData={books}
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
