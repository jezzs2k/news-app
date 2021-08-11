/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvide } from '@ui-kitten/components';
import SplashScreen from 'react-native-splash-screen'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <ApplicationProvider {...eva} theme={eva.light}>
    {null}
  </ApplicationProvider>
};

export default App;
