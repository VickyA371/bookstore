import React from 'react';
import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';

// ** Misc
import colors from '../constants/colors';

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
        width: (width * 50) / 100 - 45 / 2, // calculations with paddings
        ...styles.container,
      }}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  value: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
  },
});

export default CardTextItem;
