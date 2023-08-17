import React, {useMemo} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

// ** MISC
import {getBookCover} from '../utils/misc';
import colors from '../constants/colors';

type BookItemRowPropTypes = {
  coverId: number;
  title: string;
  authorNames: string[];
  publishYear: number;
  onPress: () => void;
};

const BookItemRow = (props: BookItemRowPropTypes) => {
  const {coverId, title, authorNames, publishYear, onPress} = props;

  const imgSource = useMemo(() => ({uri: getBookCover(coverId)}), [coverId]);

  const renderAuthorName = useMemo(() => {
    return authorNames && Array.isArray(authorNames) && authorNames.length ? (
      <Text style={styles.author}>
        {'By ' +
          authorNames.reduce(
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
    ) : null;
  }, [authorNames]);

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image style={styles.img} resizeMode={'contain'} source={imgSource} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        {renderAuthorName}
        <Text style={styles.author}>Published in {publishYear}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    flexDirection: 'row',
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  img: {
    height: 100,
    width: 75,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default BookItemRow;
