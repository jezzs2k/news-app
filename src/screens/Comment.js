import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { Navigation } from 'react-native-navigation';

import { getNews } from '../stores/news'

export const CommentScreen = ({ item }) => {
  const [newItem, setNewItem] = useState(item ?? {});
  const [loading, setLoading] = useState(false);

  const crawlData = async () => {
    setLoading(true);
    const data = await getNews();

    setNewItem(data[0]);
    setLoading(false);
  };

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

  if (loading) {
    return <ActivityIndicator style={{ paddingVertical: 8 }} color={'#000'} size={'small'} />
  }

  if (!newItem) {
    return null;
  }

  return (
    <ScrollView style={styles.container} nestedScrollEnabled showsVerticalScrollIndicator={false}>
      <View>
        <Image source={{ uri: newItem.image }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.textContent} lineBreakMode="tail">
            {newItem.content}
          </Text>
          <View style={styles.detailBtn}>
            <Text style={styles.detailText}>Comments</Text>
          </View>
        </View>
      </View>
    </ScrollView>
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