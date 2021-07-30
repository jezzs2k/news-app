/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';

const App = () => {
  return <ApplicationProvider {...eva} theme={eva.light}>
    {null}
  </ApplicationProvider>
};

export default App;
