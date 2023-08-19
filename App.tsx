import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
// ** Navigation
import RootNavigation from './src/navigation';

const App = () => {
  return (
    <SafeAreaProvider>
      <RootNavigation />
    </SafeAreaProvider>
  );
};

export default App;
