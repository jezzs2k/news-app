import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

const likesGlobal = {};

function RenderItem({ item }) {
    const [likes, setLikes] = useState(null);
    const [docId, setDocId] = useState(null);

    const commentRef = firestore().collection('comments');

    const handleLikeComment = () => {
        if (!docId) {
            return;
        };

        const data = {
            name: 'hieu',
            avatar: 'hieu',
            createdAt: new Date(),
            id: uuid.v4(),
        };

        commentRef.doc(docId).update({ likes: [...likes, data] }).then(() => {
            console.log('Update Success');
            setLikes([...likesGlobal[item.commentId], data]);
            likesGlobal[item.commentId] = [...likesGlobal[item.commentId], data];
        }).catch(e => {
            console.log(e);
        });
    };

    const handleReplyComment = () => { };

    useEffect(() => {
        let unsubscribe;
        if (item.commentId) {
            unsubscribe = commentRef.where('commentId', '==', item.commentId).onSnapshot(querySnapshot => {
                let likeComments = [];
                querySnapshot?.forEach(doc => {
                    setDocId(doc.id);
                    likeComments = [...(doc.data()?.likes ?? [])]
                });

                likesGlobal[item.commentId] = likeComments;

                setLikes(likeComments);
                unsubscribe?.();
            })
        }
    }, [])

    return <View style={styles.itemContainer}>
        <View style={styles.leftComment}>
            <Image style={styles.avatar} source={{ uri: 'https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/icon.a78e4b51.png' }} />
        </View>
        <View style={styles.rightComment}>
            <View style={styles.textContent}>
                <Text style={styles.text} numberOfLines={4}>{item.text}</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity style={styles.actionItem} onPress={handleLikeComment}>
                    <Text style={styles.actionText}>{likes?.length ?? 0} Like</Text>
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


export { RenderItem };

