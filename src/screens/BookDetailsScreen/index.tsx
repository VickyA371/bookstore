import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Animated from 'react-native-reanimated';

// ** Hooks
import useBookDetails from '../../hooks/useBookDetails';

// ** Components
import Loader from '../../components/Loader';
import CardTextItem from '../../components/BookDetailsCardText';

// ** Misc
import {RootNavigationType} from '../../navigation/types';
import {formatAuthorNames, getBookCover} from '../../utils/misc';
import colors from '../../constants/colors';

const BookDetailsScreen = (
  props: NativeStackScreenProps<RootNavigationType, 'bookDetails'>,
) => {
  const {route} = props;
  const {params} = route;
  const {coverId, img} = params;

  const {bookDetails, isLoading} = useBookDetails(coverId);

  return (
    <ScrollView style={styles.container}>
      <Animated.Image
        source={{uri: getBookCover(img)}}
        style={styles.cover}
        resizeMode="contain"
        sharedTransitionTag={`img-${coverId}`}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <View style={styles.subContainer}>
          <Text style={styles.title}>{bookDetails?.title}</Text>
          <Text style={styles.description}>
            {bookDetails?.description?.value ??
              bookDetails?.description ??
              'Description Not available'}
          </Text>
          {bookDetails?.by_statement && (
            <Text style={styles.description}>
              By {bookDetails?.by_statement}
            </Text>
          )}
          <View style={styles.detailsContainer}>
            {bookDetails?.publish_date && (
              <CardTextItem
                title="Published Year"
                value={bookDetails?.publish_date}
              />
            )}
            {bookDetails?.publishers && (
              <CardTextItem
                title="Published By"
                value={formatAuthorNames(bookDetails?.publishers)}
              />
            )}
            {bookDetails?.languages && (
              <CardTextItem
                title="Languages"
                value={bookDetails?.languages.reduce(
                  (prevVal, currVal, index, array) => {
                    return (
                      currVal.key
                        .substring(currVal.key.lastIndexOf('/') + 1)
                        .toUpperCase() +
                      (index === array.length - 2
                        ? ' and '
                        : index === array.length - 1
                        ? ''
                        : ', ') +
                      prevVal
                    );
                  },
                  '',
                )}
              />
            )}

            {bookDetails?.number_of_pages && (
              <CardTextItem
                title="Pages"
                value={'' + bookDetails?.number_of_pages}
              />
            )}

            {bookDetails?.isbn_10 && (
              <CardTextItem title="ISBN 10" value={'' + bookDetails?.isbn_10} />
            )}
            {bookDetails?.isbn_13 && (
              <CardTextItem title="ISBN 13" value={'' + bookDetails?.isbn_13} />
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  cover: {
    height: 250,
    marginBottom: 20,
  },
  subContainer: {paddingHorizontal: 15},
  detailsContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    marginBottom: 15,
  },
});

export default BookDetailsScreen;
