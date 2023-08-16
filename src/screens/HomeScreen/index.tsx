import React from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet} from 'react-native';

// ** Hooks
import useBooks from '../../hooks/useBooks';

// ** Components
import Loader from '../../components/Loader';
import BookItemRow from '../../components/BookItemRow';

// ** MISC
import {LOG_ENTRY} from '../../services/books/types';
import colors from '../../constants/colors';

const HomeScreen = () => {
  const {books} = useBooks();

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

  const keyExtractorHandler = (_item: LOG_ENTRY, index: number) =>
    index.toString();

  const renderListEmptyComponent = () => <Loader />;

  return (
    <FlatList<LOG_ENTRY>
      data={books}
      renderItem={renderBookItemHandler}
      keyExtractor={keyExtractorHandler}
      contentContainerStyle={styles.contentContainer}
      ListEmptyComponent={renderListEmptyComponent}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: colors.white,
    paddingVertical: 10,
  },
});

export default HomeScreen;
