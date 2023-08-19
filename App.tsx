import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// ** Navigation
import RootNavigation from './src/navigation';
import ErrorBoundary from './src/components/ErrorBoundary';

const App = () => {
  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <RootNavigation />
      </ErrorBoundary>
    </SafeAreaProvider>
  );
};

export default App;
