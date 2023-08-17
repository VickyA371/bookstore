import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

// ** Hooks
import useBookDetails from '../../hooks/useBookDetails';

// ** Components
import Loader from '../../components/Loader';

// ** Misc
import {RootNavigationType} from '../../navigation/types';
import {formatAuthorNames, getBookCover} from '../../utils/misc';
import colors from '../../constants/colors';

type CardTextItemPropsType = {
  title: string;
  value: string;
};

const CardTextItem = (props: CardTextItemPropsType) => {
  const {width} = useWindowDimensions();
  const {title, value} = props;
  return (
    <View
      style={{
        width: (width * 50) / 100 - 45 / 2,
        padding: 10,
        borderRadius: 10,
        shadowColor: colors.black,
        backgroundColor: colors.white,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 15,
      }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        {title}
      </Text>
      <Text style={{fontSize: 14, textAlign: 'center', marginTop: 4}}>
        {value}
      </Text>
    </View>
  );
};

const BookDetailsScreen = (
  props: NativeStackScreenProps<RootNavigationType, 'bookDetails'>,
) => {
  const {route} = props;
  const {params} = route;
  const coverId = params.coverId;

  const {bookDetails, isLoading} = useBookDetails(coverId);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{uri: getBookCover(bookDetails?.covers[0])}}
        style={styles.cover}
        resizeMode="contain"
      />
      <View style={{paddingHorizontal: 15}}>
        <Text style={styles.title}>{bookDetails?.title}</Text>
        <Text style={styles.description}>
          {bookDetails?.description ?? 'Description Not available'}
        </Text>
        {bookDetails?.by_statement && (
          <Text style={styles.description}>By {bookDetails?.by_statement}</Text>
        )}
        <View
          style={{
            flex: 1,
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 15,
          }}>
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
  title: {fontSize: 16, fontWeight: 'bold', marginBottom: 10},
  description: {fontSize: 14, marginBottom: 15},
});

export default BookDetailsScreen;
