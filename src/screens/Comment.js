import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { Navigation } from 'react-native-navigation';
import Feather from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

//QUERY
import { getNews } from '../stores/news';

//COMP
import { Comments } from '../components/comment';

let oneTime = true;

export const CommentScreen = ({ item, ...props }) => {
  const [newItem, setNewItem] = useState(item ?? {});
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [loadingComment, setLoadingComment] = useState(false);
  const [text, setText] = useState('');

  const commentRef = firestore().collection('comments');

  const newId = newItem?.id;

  const crawlData = async () => {
    setLoading(true);
    const data = await getNews();

    setNewItem(data[0]);
    setLoading(false);
  };

  const handleChangeText = (text) => {
    setText(text);
  };

  const handleAddComment = () => {
    if (text && text.length > 0) {
      const timestamp = firestore.FieldValue.serverTimestamp();
      const data = {
        text,
        newId: newItem?.id,
        createdAt: timestamp,
        likes: [],
        senderUser: null,
        commentId: uuid.v4(),
      };

      setLoadingComment(true);
      commentRef.add(data).then(_doc => {
        setText('')
        Keyboard.dismiss()
        setLoadingComment(false);
      }).catch((error) => {
        setLoadingComment(false);
        alert(error)
      });;
    }
  };

  useEffect(() => {
    if (!item && oneTime) {
      crawlData();
    };
    oneTime = false;
  }, []);

  useEffect(() => {
    let screenEventListener;
    let unsubscribe;

    if (!screenEventListener) {
      screenEventListener = Navigation.events().registerComponentDidAppearListener(({ componentId, componentName, passProps }) => {
        if (componentId === props.componentId) {
          if (newId) {
            unsubscribe = commentRef.where('newId', '==', newId).onSnapshot(querySnapshot => {
              const newsData = [];
              querySnapshot?.forEach(doc => {
                newsData.push(doc.data());
              });

              setComments(newsData);
            })
          }
        }
      });
    }
    return () => {
      screenEventListener && screenEventListener.remove();
      unsubscribe?.();
    }
  }, [])

  useEffect(() => {
    if (newItem) {
      Navigation.setDefaultOptions({
        topBar: {
          title: {
            text: newItem?.title,
            fontSize: widthPercentageToDP(4.5),
            fontWeight: '700',
            alignment: 'center',

          },
        }
      })
    }
  }, [newItem])

  const renderTextInput = () => {
    return <View style={styles.footerComp}>
      <TextInput value={text} multiline style={styles.textInput} placeholder={'Typing...'} onChangeText={handleChangeText} />
      <TouchableOpacity style={styles.sendBtn} onPress={handleAddComment}>
        {!loadingComment ? <Feather name={'send'} style={styles.iconSend} size={widthPercentageToDP(5)} /> : <ActivityIndicator size={'small'} color={'#000'} />}
      </TouchableOpacity>
    </View>
  };


  if (loading) {
    return <ActivityIndicator style={{ paddingVertical: 8 }} color={'#000'} size={'small'} />
  }

  if (!newItem) {
    return null;
  }

  return (
    <Comments comments={comments} listHeaderComp={<View style={styles.container}>
      <Image source={{ uri: newItem.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.textContent} lineBreakMode="tail">
          {newItem.content}
        </Text>
        <TouchableOpacity style={styles.detailBtn}>
          <Text style={styles.detailText}>Comments</Text>
        </TouchableOpacity>
      </View>
      {renderTextInput()}
    </View>} />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: heightPercentageToDP(1),
    paddingHorizontal: widthPercentageToDP(3),
  },
  image: {
    width: '100%',
    height: heightPercentageToDP(30),
    maxHeight: heightPercentageToDP(40),
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
    paddingBottom: heightPercentageToDP(1),
    // borderColor: "#d1d1d178",
    // borderBottomWidth: 1,
  },
  detailText: {
    fontWeight: '700',
    fontSize: widthPercentageToDP(3.9),
  },
  iconFooter: {
    marginLeft: widthPercentageToDP(2),
  },
  textInput: {
    borderColor: "#d1d1d178",
    borderWidth: 1,
    paddingHorizontal: widthPercentageToDP(2),
    paddingRight: widthPercentageToDP(11),
    borderRadius: 8,
  },
  footerComp: {
    width: '100%',
    maxHeight: heightPercentageToDP(15),
    paddingHorizontal: widthPercentageToDP(3),
    justifyContent: 'center',
  },
  iconSend: {

  },
  sendBtn: {
    position: 'absolute',
    right: widthPercentageToDP(4),
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
})