import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import colors from '../constants/colors';

type SearchBarPropTypes = {
  initialSearchValue?: string;
  onUpdate: (val: string, searchByTitle: boolean) => void;
};

export type RefType = {
  searchQuery: string;
  loading?: boolean;
  searchByTitle: boolean;
  setLoading: (loading: boolean) => void;
  blur?: () => void;
};

const SearchBar = forwardRef(
  (
    props: TextInputProps & SearchBarPropTypes,
    ref: React.ForwardedRef<RefType>,
  ) => {
    const {initialSearchValue, onUpdate} = props;

    const baseInputRef = useRef<TextInput>(null);

    const [isLoading, setLoading] = useState(true);

    const [searchByTitle, setSearchByTitle] = useState(true);
    const [searchVal, setSearchVal] = useState(initialSearchValue ?? '');

    const initHandler = useCallback(
      (): RefType => ({
        searchQuery: searchVal,
        searchByTitle,
        setLoading: (loadingState: boolean) => {
          setLoading(loadingState);
        },
        blur: () => {
          baseInputRef.current?.blur();
        },
      }),
      [searchByTitle, searchVal],
    );

    useImperativeHandle(ref, initHandler, [initHandler]);

    const onChangeHandler = useCallback(
      (enteredText: string) => {
        setSearchVal(enteredText);
        onUpdate(enteredText, searchByTitle);
      },
      [onUpdate, searchByTitle],
    );

    const toggleSearchBy = useCallback(() => {
      setSearchByTitle(!searchByTitle);
      onUpdate(searchVal, !searchByTitle);
    }, [onUpdate, searchByTitle, searchVal]);

    return (
      <View style={styles.container}>
        <TextInput
          ref={baseInputRef}
          key="input"
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
        {isLoading && <ActivityIndicator size={'small'} color={colors.black} />}
        <Pressable
          disabled={isLoading}
          onPress={toggleSearchBy}
          style={styles.btn}>
          <Text style={styles.btnText}>{`By ${
            searchByTitle ? 'Title' : 'Author'
          }`}</Text>
        </Pressable>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    borderRadius: 10,
    backgroundColor: colors.grey,
  },
  inputDefault: {
    flex: 1,
    fontSize: 14,
    backgroundColor: colors.grey,
    color: colors.black,
    padding: 15,
    borderRadius: 10,
    marginRight: 5,
  },
  btn: {
    width: 80,
    paddingVertical: 12,
    borderRadius: 10,
  },
  btnText: {
    textAlign: 'center',
  },
});

export default SearchBar;
