import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// ** Screens
import HomeScreen from '../screens/HomeScreen';
import BookDetailsScreen from '../screens/BookDetailsScreen';
import SearchScreen from '../screens/SearchBooks';

// ** MISC
import constants from '../constants';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={constants.routes.home}
          options={{
            title: 'Home',
          }}
          component={HomeScreen}
        />
        <Stack.Screen
          name={constants.routes.bookDetails}
          component={BookDetailsScreen}
          options={{
            title: 'Book Details',
          }}
        />
        <Stack.Screen
          name={constants.routes.search}
          component={SearchScreen}
          options={{
            title: 'Search',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
