import firebase from '@react-native-firebase/app';
import { Platform } from 'react-native';

// Your secondary Firebase project credentials for Android...
const androidCredentials = {
    clientId: '230135639833-7hfok5ojhfv7e69oc4n06hgf3v6pst4t.apps.googleusercontent.com',
    appId: '1:230135639833:android:9deb8d2b75ad01817a9f88',
    apiKey: 'AIzaSyAWz-4hZgNdanekn34ossnPgvJXWl054bQ',
    databaseURL: 'https://news-app-e0332-default-rtdb.firebaseio.com/',
    // storageBucket: '',
    // messagingSenderId: '',
    projectId: 'news-app-e0332',
};

// Your secondary Firebase project credentials for iOS...
// const iosCredentials = {
//     clientId: '',
//     appId: '',
//     apiKey: '',
//     databaseURL: '',
//     storageBucket: '',
//     messagingSenderId: '',
//     projectId: '',
// };

// Select the relevant credentials
const credentials = Platform.select({
    android: androidCredentials,
    // ios: iosCredentials,
});

const config = {
    name: 'NEWS_APP',
};

await firebase.initializeApp(credentials, config);

export { firebase }
// await firebase.app('NEWS_APP').delete();