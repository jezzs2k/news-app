import React from "react";
import { ScrollView, Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import AntDesign from 'react-native-vector-icons/AntDesign';

export const BottomSheetModal = ({ item, refRBSheet }) => {

    const handleToDetail = () => {
        console.log(item);
    }

    return (
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            dragFromTopOnly={true}
            animationType={'fade'}
            openDuration={200}
            height={heightPercentageToDP(70)}
            closeOnPressMask
            nestedScrollEnabled
            customStyles={{
                wrapper: {
                    backgroundColor: "#00000030"
                },
                draggableIcon: {
                    backgroundColor: "#000"
                }
            }}
        >
            {item &&
                <ScrollView style={styles.container} nestedScrollEnabled showsVerticalScrollIndicator={false}>
                    <View>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <View style={styles.content}>
                            <Text style={styles.textContent} lineBreakMode="tail">
                                {item.content}
                            </Text>
                            <TouchableOpacity style={styles.detailBtn} onPress={handleToDetail}>
                                <Text style={styles.detailText}>Detail</Text>
                                <AntDesign name='arrowright' style={styles.iconFooter} size={widthPercentageToDP(3.8)} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>}
        </RBSheet>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: heightPercentageToDP(1),
        paddingHorizontal: widthPercentageToDP(3),
    },
    image: {
        width: '100%',
        height: heightPercentageToDP(50),
        maxHeight: heightPercentageToDP(60),
        borderRadius: 8,
    },
    content: {
        marginTop: heightPercentageToDP(1),
    },
    textContent: {},
    detailBtn: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: heightPercentageToDP(3),
        paddingBottom: heightPercentageToDP(4),
    },
    detailText: {
        fontWeight: '700',
        fontSize: widthPercentageToDP(3.9),
    },
    iconFooter: {
        marginLeft: widthPercentageToDP(2),
    },
})