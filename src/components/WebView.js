import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { WebView } from 'react-native-webview';

export const MyWebComponent = ({ item }) => {
    const [loading, setLoading] = useState(false);

    return <View style={{ flex: 1, backgroundColor: '#fff' }}>
        {loading && <ActivityIndicator style={{ paddingVertical: 8 }} color={'#000'} size={'small'} />}
        <WebView source={{ uri: item.detail }} onLoadEnd={() => {
            setLoading(false);
        }} onLoadStart={() => {
            setLoading(true);
        }} />
    </View>
}