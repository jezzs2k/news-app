/**
 * @format
 */

import {Navigation} from 'react-native-navigation';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

//SCREENS
import {CallScreen, HomeScreen} from './src/screens';

AppRegistry.registerComponent(appName, () => App);

Navigation.registerComponent('Home', () => HomeScreen);
Navigation.registerComponent('Call', () => CallScreen);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: 'BOTTOM_TABS_LAYOUT',
        children: [
          {
            stack: {
              id: 'HOME_TAB',
              children: [
                {
                  component: {
                    id: 'Home',
                    name: 'Home',
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('./home.png'),
                },
              },
            },
          },
          {
            stack: {
              id: 'PROFILE_TAB',
              children: [
                {
                  component: {
                    id: 'Call',
                    name: 'Call',
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('./call.png'),
                },
              },
            },
          },
        ],
      },
    },
  });
});
