import React, {useCallback, useState} from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import colors from '../constants/colors';

type SearchBarPropTypes = {
  initialSearchValue?: string;
  onChangeText: (val: string) => void;
};

const SearchBar = (props: SearchBarPropTypes & TextInputProps) => {
  const {initialSearchValue, onChangeText} = props;
  const [searchVal, setSearchVal] = useState(initialSearchValue ?? '');

  const onChangeHandler = useCallback(
    (enteredText: string) => {
      setSearchVal(enteredText);
      onChangeText(enteredText);
    },
    [onChangeText],
  );

  return (
    <TextInput
      placeholder="Search Book"
      returnKeyType="search"
      blurOnSubmit
      placeholderTextColor={colors.black}
      autoCapitalize="none"
      autoCorrect={false}
      {...props}
      style={[styles.inputDefault, props.style]}
      value={searchVal}
      onChangeText={onChangeHandler}
    />
  );
};

const styles = StyleSheet.create({
  inputDefault: {
    fontSize: 14,
    backgroundColor: colors.grey,
    color: colors.black,
    padding: 15,
    marginVertical: 15,
    borderRadius: 10,
  },
});

export default SearchBar;
