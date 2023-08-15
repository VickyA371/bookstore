import React from 'react';
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import useBooks from '../../hooks/useBooks';

import {LOG_ENTRY} from '../../services/books/types';
import {getBookCover} from '../../utils/misc';

const HomeScreen = () => {
  const {books} = useBooks();

  const renderBookItemHandler = (
    bookItemObj: ListRenderItemInfo<LOG_ENTRY>,
  ) => {
    try {
      return (
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            marginTop: 10,
            flexDirection: 'row',
          }}>
          <Image
            style={{height: 100, width: 75}}
            resizeMode={'contain'}
            source={{uri: getBookCover(bookItemObj.item.work.cover_id)}}
          />
          <View style={{flex: 1, marginLeft: 15}}>
            <Text>{bookItemObj.item.work.title}</Text>
            {bookItemObj.item.work.author_names &&
            Array.isArray(bookItemObj.item.work.author_names) &&
            bookItemObj.item.work.author_names.length ? (
              <Text>
                By{' '}
                {bookItemObj.item.work.author_names.reduce(
                  (
                    prevVal: string,
                    currVal: string,
                    index: number,
                    array: string[],
                  ) =>
                    prevVal +
                    currVal +
                    (index === array.length - 2
                      ? ' and '
                      : index === array.length - 1
                      ? ''
                      : ', '),
                  '',
                )}
              </Text>
            ) : null}
          </View>
        </View>
      );
    } catch (err: any) {
      console.log(
        '[HomeScreen - renderBookItemHandler] Error : ',
        err?.message,
      );
      return null;
    }
  };

  const keyExtractorHandler = (item: LOG_ENTRY, index: number) =>
    index.toString();

  return (
    <FlatList<LOG_ENTRY>
      data={books}
      renderItem={renderBookItemHandler}
      keyExtractor={keyExtractorHandler}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 15,
  },
});

export default HomeScreen;
