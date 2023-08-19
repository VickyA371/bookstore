import React, {memo, useMemo} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  Extrapolate,
} from 'react-native-reanimated';

// ** MISC
import {getBookCover} from '../utils/misc';
import colors from '../constants/colors';

type BookItemRowPropTypes = {
  coverId: number;
  title: string;
  authorNames: string[];
  publishYear: number;
  onPress: () => void;
  workId: string;
  index: number;
  scrollY: SharedValue<number>;
};

const ROW_HEIGHT = 125;

const BookItemRow = (props: BookItemRowPropTypes) => {
  const {
    coverId,
    title,
    authorNames,
    publishYear,
    onPress,
    workId,
    index,
    scrollY,
  } = props;

  const imgSource = useMemo(() => ({uri: getBookCover(coverId)}), [coverId]);

  const renderAuthorName = useMemo(() => {
    return authorNames && Array.isArray(authorNames) && authorNames.length ? (
      <Text style={styles.author}>
        {'By ' +
          authorNames.reduce(
            (
              prevVal: string,
              currVal: string,
              currIndex: number,
              array: string[],
            ) =>
              prevVal +
              currVal +
              (currIndex === array.length - 2
                ? ' and '
                : currIndex === array.length - 1
                ? ''
                : ', '),
            '',
          )}
      </Text>
    ) : null;
  }, [authorNames]);

  const {height} = useWindowDimensions(); // screen height

  const startPosition = index * ROW_HEIGHT;
  const containerHeight = height - 250;

  const animatedStyle = useAnimatedStyle(() => {
    const pos1 = startPosition - containerHeight;
    const pos2 = startPosition + ROW_HEIGHT - containerHeight;
    return {
      opacity: interpolate(scrollY.value, [pos1, pos2], [0, 1]),
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [pos1, pos2],
            [-ROW_HEIGHT / 2, 0],
            Extrapolate.CLAMP,
          ),
        },
        {
          scale: interpolate(
            scrollY.value,
            [pos1, pos2],
            [0.8, 1],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <Pressable style={styles.container} onPress={onPress}>
        <Animated.Image
          style={styles.img}
          resizeMode={'contain'}
          source={imgSource}
          sharedTransitionTag={`img-${workId}`}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>
          {renderAuthorName}
          <Text style={styles.author}>Published in {publishYear}</Text>
        </View>
      </Pressable>
    </Animated.View>
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

function arePropsEqual(
  prevProps: BookItemRowPropTypes,
  nextProps: BookItemRowPropTypes,
) {
  return prevProps.workId === nextProps.workId;
}

export default memo(BookItemRow, arePropsEqual);
