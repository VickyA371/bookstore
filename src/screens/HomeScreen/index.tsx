import React, {useMemo} from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';

// ** Hooks
import useBooks from '../../hooks/useBooks';

// ** Components
import Loader from '../../components/Loader';
import SearchBar from '../../components/SearchBar';
import BookItemRow from '../../components/BookItemRow';

// ** Types
import {LOG_ENTRY} from '../../services/books/types';
import {RootNavigationType} from '../../navigation/types';

// ** MISC
import colors from '../../constants/colors';
import {keyExtractorHandler} from '../../utils/misc';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootNavigationType>>();
  const {books, booksFromSearch, searchBooks} = useBooks();

  const onBookItemPressHandler = (coverId: string) => {
    navigation.navigate('bookDetails', {
      coverId,
    });
  };

  const renderBookItemHandler = (
    bookItemObj: ListRenderItemInfo<LOG_ENTRY>,
  ) => {
    try {
      return (
        <BookItemRow
          coverId={bookItemObj.item.work.cover_id}
          title={bookItemObj.item.work.title}
          authorNames={bookItemObj.item.work.author_names}
          publishYear={bookItemObj.item.work.first_publish_year}
          onPress={onBookItemPressHandler.bind(
            null,
            bookItemObj.item.work.cover_edition_key,
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

  const renderListHeaderComponent = () => {
    return <SearchBar onChangeText={searchBooks} />;
  };

  const data = useMemo(
    () => (booksFromSearch.length ? booksFromSearch : books),
    [books, booksFromSearch],
  );

  return (
    <FlatList<LOG_ENTRY>
      data={data}
      renderItem={renderBookItemHandler}
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
