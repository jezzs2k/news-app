import React from 'react';
import { WebView } from 'react-native-webview';

export const MyWebComponent = ({ item }) => {
    return <WebView source={{ uri: item.detail }} />;
}