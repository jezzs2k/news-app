/**
 * @format
 */

//LIBS
import React from 'react';
import { Navigation } from 'react-native-navigation';
import { AppRegistry } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Provider as ProviderPaper } from 'react-native-paper'

//MESSAGE_FIREBASE
import messaging from '@react-native-firebase/messaging';

//APP
import App from './App';
import { name as appName } from './app.json';

//SCREENS
import { CommentScreen, HomeScreen, NumberCaScreen } from './src/screens';
import { MyWebComponent } from './src/components';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://crawl-new-api.herokuapp.com/',
  cache: new InMemoryCache()
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);

Navigation.registerComponent('Home', () => (props) => <ApolloProvider client={client}>
  <HomeScreen  {...props} />
</ApolloProvider>);
Navigation.registerComponent('Comments', () => (props) => {
  return <ApolloProvider client={client}><CommentScreen {...props} /></ApolloProvider>
});
Navigation.registerComponent('WebView', () => MyWebComponent);
Navigation.registerComponent('Ca', () => (props) => <ApolloProvider client={client}><ProviderPaper><NumberCaScreen {...props} /></ProviderPaper></ApolloProvider>)

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
                  icon: Feather.getImageSourceSync('home', 30, '#000'),
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
              id: 'CA_TAB',
              children: [
                {
                  component: {
                    id: 'Ca',
                    name: 'Ca',
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: AntDesign.getImageSourceSync('dotchart', 30, '#000'),
                },
                topBar: {
                  title: {
                    text: 'Totals',
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
