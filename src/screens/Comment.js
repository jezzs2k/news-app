import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { Navigation } from 'react-native-navigation';
import Feather from 'react-native-vector-icons/Feather';

import { getNews } from '../stores/news';
import { Comments } from '../components/comment'

export const CommentScreen = ({ item }) => {
  const [newItem, setNewItem] = useState(item ?? {});
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');

  const crawlData = async () => {
    setLoading(true);
    const data = await getNews();

    setNewItem(data[0]);
    setLoading(false);
  };

  const handleChangeText = (text) => {
    setText(text);
  }

  useEffect(() => {
    if (!item) {
      crawlData();
    }
  }, []);

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
      <TouchableOpacity style={styles.sendBtn}>
        <Feather name={'send'} style={styles.iconSend} size={widthPercentageToDP(5)} />
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
    <Comments listHeaderComp={<View style={styles.container}>
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