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
  TouchableOpacity,
  View,
} from 'react-native';

import colors from '../constants/colors';

type SearchBarPropTypes = {
  initialSearchValue?: string;
  onUpdate: (val: string, searchByTitle: boolean) => void;
  onClear: () => void;
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
    const {initialSearchValue, onUpdate, onClear} = props;

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

    // applying custom ref properties and methods
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

    const onClearSearchHandler = useCallback(() => {
      setSearchVal('');
      onClear();
    }, [onClear]);

    return (
      <View style={styles.container}>
        <Pressable
          disabled={isLoading}
          onPress={toggleSearchBy}
          style={styles.btn}>
          <Text style={styles.btnText}>{`By ${
            searchByTitle ? 'Title' : 'Author'
          }`}</Text>
        </Pressable>
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
        {!isLoading && searchVal ? (
          <TouchableOpacity onPress={onClearSearchHandler}>
            <Text style={styles.clearText}>{'clear'}</Text>
          </TouchableOpacity>
        ) : null}
        {isLoading && (
          <ActivityIndicator
            size={'small'}
            color={colors.black}
            style={styles.loaderStyle}
          />
        )}
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
  clearText: {
    paddingHorizontal: 10,
  },
  loaderStyle: {
    paddingRight: 10,
  },
});

export default SearchBar;
