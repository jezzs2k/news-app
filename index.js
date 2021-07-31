/**
 * @format
 */

//LIBS
import { Navigation } from 'react-native-navigation';
import { AppRegistry } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

//APP
import App from './App';
import { name as appName } from './app.json';

//SCREENS
import { CallScreen, HomeScreen } from './src/screens';
import { MyWebComponent } from './src/components';

AppRegistry.registerComponent(appName, () => App);

Navigation.registerComponent('Home', () => HomeScreen);
Navigation.registerComponent('Call', () => CallScreen);
Navigation.registerComponent('WebView', () => MyWebComponent);

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
                topBar: {
                  title: {
                    text: 'News',
                    fontSize: wp(4.5),
                    fontWeight: '700',
                    alignment: 'center'
                  },
                  noBorder: true,
                }
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
                options: {
                  bottomTab: {
                    icon: require('./home.png'),
                  },
                },
                topBar: {
                  title: {
                    text: 'Settings',
                    fontSize: wp(4.5),
                    fontWeight: '700',
                    alignment: 'center'
                  },
                  noBorder: true,
                }
              },
            },
          },
        ],
      },
    },
  });
});
