import React from 'react';
import { View, StyleSheet, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

export const Comments = ({ listHeaderComp }) => {
    function renderItem({ item }) {
        return <View style={styles.itemContainer}>
            <View style={styles.leftComment}>
                <Image style={styles.avatar} source={{ uri: 'https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/icon.a78e4b51.png' }} />
            </View>
            <View style={styles.rightComment}>
                <View style={styles.textContent}>
                    <Text style={styles.text} numberOfLines={4}>VU THANH HIEU, lorermAvatar may have different root component to render images. This might be helpful when needed to improve image loading with 3rd party image libraries.</Text>
                </View>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.actionItem}>
                        <Text style={styles.actionText}>Like</Text>
                        <AntDesign name='like2' style={[styles.iconAction, false && styles.iconActive]} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionItem}>
                        <Text style={styles.actionText}>Reply</Text>
                        <Entypo name='reply' style={styles.iconAction} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>;
    };

    return <FlatList
        data={[1, 2, 3]}
        keyExtractor={(item, index) => item?.id ?? `${index}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={listHeaderComp}
        renderItem={renderItem}
        keyboardDismissMode={'on-drag'}
        keyboardShouldPersistTaps={'handled'}
    />
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        marginVertical: heightPercentageToDP(1),
        paddingHorizontal: widthPercentageToDP(3),
    },
    leftComment: {
        width: '20%',
    },
    avatar: {
        width: widthPercentageToDP(10),
        height: widthPercentageToDP(10),
        borderRadius: widthPercentageToDP(5),
        paddingHorizontal: widthPercentageToDP(2),
    },
    rightComment: {
        width: '80%',
    },
    iconAction: {
        color: 'red',
        marginHorizontal: widthPercentageToDP(1),
    },
    iconActive: {
        color: 'blue'
    },
    actions: {
        flexDirection: 'row',
        marginTop: heightPercentageToDP(0.6),
        borderBottomWidth: 1,
        borderColor: "#d1d1d178"
    },
    actionItem: {
        marginHorizontal: widthPercentageToDP(1),
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: heightPercentageToDP(0.4),
    },
    actionText: {
        fontSize: widthPercentageToDP(2.8),
    },

});
