import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// ** Screens
import HomeScreen from './src/screens/HomeScreen';
import BookDetailsScreen from './src/screens/BookDetailsScreen';
import SearchScreen from './src/screens/SearchBooks';

// ** MISC
import constants from './src/constants';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={constants.routes.home} component={HomeScreen} />
        <Stack.Screen
          name={constants.routes.bookDetails}
          component={BookDetailsScreen}
        />
        <Stack.Screen name={constants.routes.search} component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
