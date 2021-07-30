import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, Card, List } from '@ui-kitten/components';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

import { getNews } from '../stores/news';

export const HomeScreen = props => {
  const [news, setNews] = useState([]);

  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    console.log('sdsadasd')
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const crawlData = async () => {
    const data = await getNews();

    setNews(data);
  };

  useEffect(() => {
    crawlData();
  }, [])

  const renderItemHeader = (headerProps, info) => (
    <View {...headerProps}>
      <Text category='h6'>
        {info.item.title} {info.index + 1}
      </Text>
    </View>
  );

  const renderItemFooter = (footerProps) => (
    <TouchableOpacity style={styles.footerContainer}>
      <Text {...footerProps} style={styles.textFooter}>
        Details
      </Text>
      <AntDesign name='right' style={styles.iconFooter} size={wp(3.2)} />
    </TouchableOpacity>
  );

  const renderItem = (info) => (
    <Card
      style={styles.item}
      status='basic'
      header={headerProps => renderItemHeader(headerProps, info)}
      footer={renderItemFooter}>
      <TouchableOpacity style={styles.containerItem}>
        <Image source={{ uri: info.item.image }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.textContent} lineBreakMode="tail">
            {info.item.content}
          </Text>
          <TouchableOpacity style={styles.moreBtn}>
            <Text style={styles.moreText}>More</Text>
            <AntDesign name='down' style={styles.iconFooter} size={wp(3.2)} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Card>
  );

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <BottomSheetModalProvider>
        <View style={styles.containerSheet}>
          <Button
            onPress={handlePresentModalPress}
            title="Present Modal"
            color="black"
          />
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
          >
            <View style={styles.contentContainer}>
              <Text>Awesome 🎉</Text>
            </View>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <List
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          data={news}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </Layout>
    </ApplicationProvider>
  );
};

const styles = StyleSheet.create({
  containerSheet: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    maxHeight: hp(100),
    width: wp(100)
  },
  contentContainer: {
    paddingHorizontal: wp(2),
  },
  item: {
    marginVertical: hp(1),
  },
  image: {
    width: wp(20),
    height: hp(10),
    marginHorizontal: wp(1),
    marginVertical: hp(0.9),
  },
  content: {
    marginHorizontal: wp(1),
    width: wp(78),
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  textContent: {
    width: '80%',
    maxHeight: '85%',
  },
  containerItem: {
    flexDirection: 'row',
    height: hp(20),
  },
  textFooter: {
    fontWeight: '700',
    fontSize: wp(3.2),
    paddingLeft: wp(4),
    paddingVertical: hp(1.3),
    paddingRight: wp(2),
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconFooter: {
    paddingVertical: hp(1.5),
  },
  moreBtn: {
    width: '100%',
    flexDirection: 'row',
  },
  moreText: {
    fontWeight: '700',
    fontSize: wp(3.2),
    paddingVertical: hp(1.3),
  },
});