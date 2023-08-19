import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// ** Screens
import HomeScreen from '../screens/HomeScreen';
import BookDetailsScreen from '../screens/BookDetailsScreen';

// ** MISC
import {RootNavigationType} from './types';

const Stack = createNativeStackNavigator<RootNavigationType>();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={'home'}
          options={{
            title: 'Books',
          }}
          component={HomeScreen}
        />
        <Stack.Screen
          name={'bookDetails'}
          component={BookDetailsScreen}
          options={{
            title: 'Book Details',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
