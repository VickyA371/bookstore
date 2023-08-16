import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import colors from '../constants/colors';

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.black} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loader;
