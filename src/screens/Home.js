import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, RefreshControl, ActivityIndicator, Alert } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, Card, List } from '@ui-kitten/components';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SplashScreen from 'react-native-splash-screen';
import { Navigation } from 'react-native-navigation';

//APOLO CLIENT
import { gql, useQuery, useSubscription, useMutation } from '@apollo/client';

//MESSAGE_FIREBASE
import messaging from '@react-native-firebase/messaging';
import { firebase } from '../utils';

//COMPONENTS
import { BottomSheetModal } from '../components';

//CALL_API
import { getNews } from '../stores/news';

let page = 1;

const GetNews = (pageIndex) => gql`
query{
  getNews(pageIndex: "${pageIndex}"){
    content
    createdAt
    title
    date
    image
    newId
    _id
  }
}
`;

const RegisterTokenDevice = gql`
  mutation RegisterDeviceToken($deviceToken: String!){
      registerDeviceToken(deviceToken: $deviceToken){
        message
      }
    }`;

const SubscribleNews = gql`
  subscription{
    newPost {
    image
      title
      date
      content
      _id
      createdAt
    }
  }
`

export const HomeScreen = props => {
  const [news, setNews] = useState([]);
  const [itemSheet, setItemSheet] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadingRefresh, setLoadingRefresh] = useState(false);

  //APOLO
  const { loading, error, data, fetchMore, refetch } = useQuery(GetNews(page));
  const [registerDeviceToken, { loading: loadingToken, error: errorToken, data: dataToken }] = useMutation(RegisterTokenDevice);

  // const { data: dataSubs, loading: loadingSubs } = useSubscription(
  //   SubscribleNews
  // );

  // console.log('dataSubs', dataSubs);
  // console.log('loadingSubs', loadingSubs);

  // useEffect(() => {
  //   if (dataSubs?.newPost) {
  //     Alert.alert('I real time ne', `${dataSubs.newPost[0]}`)
  //   }
  // }, [dataSubs])

  const refRBSheet = useRef();

  const crawlData = async () => {
    data && setNews((news => ([...news, ...data?.getNews])));
  };

  const handleRefresh = async () => {
    setLoadingRefresh(true);
    await refetch();
    setLoadingRefresh(false);
  };

  const handleOpenSheet = (item) => {
    setItemSheet(item)
    setTimeout(() => {
      refRBSheet.current.open();
    }, 0);
  };

  const handleToComment = (item) => Navigation.push(props.componentId, {
    component: {
      name: 'Comments',
      options: {
        topBar: {
          title: {
            text: item.title,
          },
        }
      },
      passProps: { item }
    }
  })

  const handleLoadMore = async () => {
    if (loadingMore) {
      return;
    };

    page = page + 1

    setLoadingMore(true);
    const { data } = await fetchMore({
      query: GetNews(page)
    });
    setLoadingMore(false);
  };

  const handleOpenDetail = (item) => Navigation.push(props.componentId, {
    component: {
      name: 'WebView',
      options: {
        topBar: {
          title: {
            text: item.title
          }
        }
      },
      passProps: { item }
    }
  })

  const handleGetDeviceId = async () => {
    firebase.messaging().getToken().then((token) => {
      registerDeviceToken({
        variables: {
          deviceToken: token
        }
      })
    });
  };

  useEffect(() => {
    handleGetDeviceId();
  }, [])

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage);

      remoteMessage & Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body, [{ text: 'Ok', onPress: handleRefresh }]);
    });

    return unsubscribe;
  }, [])

  useEffect(() => {
    crawlData();
  }, [data])

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const renderItemHeader = (headerProps, info) => (
    <View {...headerProps}>
      <Text category='h6'>
        {info.item.title} {info.index + 1}
      </Text>
    </View>
  );

  const renderItemFooter = (footerProps, item) => (
    <View>
      <View style={styles.date}>
        <Text>{item.date}</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerContainer} onPress={() => handleOpenDetail(item)}>
          <Text {...footerProps} style={styles.textFooter}>
            Details
          </Text>
          <AntDesign name='right' style={styles.iconFooter} size={wp(3.2)} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerContainer} onPress={() => handleToComment(item)}>
          <Text {...footerProps} style={styles.textFooter}>
            Comments
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderItem = (info) => (
    <Card
      style={styles.item}
      status='basic'
      header={headerProps => renderItemHeader(headerProps, info)}
      footer={(footerProps) => renderItemFooter(footerProps, info.item)}>
      <TouchableOpacity style={styles.containerItem} onPress={() => handleOpenSheet(info.item)}>
        <Image source={{ uri: info.item.image }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.textContent} lineBreakMode="tail">
            {info.item.content}
          </Text>
          <TouchableOpacity style={styles.moreBtn} onPress={() => handleOpenSheet(info.item)}>
            <Text style={styles.moreText}>More</Text>
            <AntDesign name='down' style={styles.iconFooter} size={wp(3.2)} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Card>
  );

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <BottomSheetModal item={itemSheet} refRBSheet={refRBSheet} componentId={props.componentId} />
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <List
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          data={news}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={!loadingMore && loading || loadingRefresh}
              onRefresh={handleRefresh}
            />
          }
          onEndReachedThreshold={0.5}
          onEndReached={handleLoadMore}
          windowSize={news?.length / 2 || 10}
          maxToRenderPerBatch={19}
          updateCellsBatchingPeriod={20}
          initialNumToRender={10}
          onEndReachedThreshold={0.5}
          pageSize={news.length / 2}
          ListFooterComponent={loadingMore ? <ActivityIndicator color={'#000'} size={'small'} /> : null}
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  date: {
    paddingVertical: hp(1),
    paddingLeft: wp(5.5),
  },
});