import React, { useRef, useState, useCallback, useMemo } from 'react';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { SafeAreaView, Animated, View } from 'react-native';

import NewsComponent from './NewsComponent';
import QuizComponent from './QuizComponent';
import ContentComponent from './ContentWrapper';
import HomeScreen from '../../screens/HomeScreen'; // 실제 경로에 맞게 수정

const Scroll = ({ data, onTypeChange, scrollRef, navigation }) => {
  const { height } = useSafeAreaFrame();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [scrollInfo, setScrollInfo] = useState({ isViewable: true, index: 0 });
  const refFlatList = useRef(null);

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 80 });

  const onViewableItemsChanged = useCallback(({ changed }) => {
    if (changed.length > 0) {
      setScrollInfo({
        isViewable: changed[0].isViewable,
        index: changed[0].index,
      });
    }
  }, []);

  const getItemLayout = useCallback(
    (_, index) => ({
      length: height,
      offset: height * index,
      index,
    }),
    [height],
  );

  const keyExtractor = useCallback(
    (item, idx) => `${item.id || 'home'}_${item.type || 'home'}_${idx}`,
    [],
  );

  const onScroll = useCallback(
    Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
      useNativeDriver: true,
    }),
    [],
  );
  // scroll data 출력
  console.log('Scroll data:', data);

  // flatListData의 맨 앞에 HomeScreenComponent용 dummy 데이터 추가
  const flatListData = useMemo(() => {
    if (!Array.isArray(data)) return [];

    const result = [
      { type: 'home', id: 'home' }, // 첫 번째 아이템: HomeScreenComponent
    ];
    data.forEach(item => {
      if (item.isSuccess === true && item.result) {
        result.push({ ...item.result, type: 'news', id: item.id });
        if (Math.random() < 0.5) {
          result.push({ ...item.result, type: 'quiz', id: item.id });
        }
      }
    });
    return result;
  }, [data]);

  console.log('flatListData:', flatListData);
  const renderItem = useCallback(
    ({ item }) => {
      if (item.type === 'home') {
        return (
          <HomeScreen
            key={`home_${item.id}`} // key 추가(필수는 아니지만 안전)
            navigation={navigation}
            onPressCard={itemId => {
              const idx = flatListData.findIndex(
                d => d.id === itemId && d.type !== 'home',
              );
              if (scrollRef && scrollRef.current && idx >= 0) {
                scrollRef.current.scrollToIndex({ index: idx, animated: true });
              }
            }}
          />
        );
      }
      if (item.type === 'quiz') {
        return (
          <ContentComponent
            data={item}
            RenderComponent={QuizComponent}
            navigation={navigation}
            scrollRef={scrollRef}
          />
        );
      }
      return (
        <ContentComponent
          data={item}
          RenderComponent={NewsComponent}
          navigation={navigation}
          scrollRef={scrollRef}
        />
      );
    },
    [navigation, scrollRef, flatListData],
  );

  // FlatList에 ref 연결
  return (
    <View style={{ flex: 1 }}>
      <Animated.FlatList
        pagingEnabled
        showsVerticalScrollIndicator={false}
        ref={scrollRef} // 연결
        automaticallyAdjustContentInsets
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig.current}
        onScroll={onScroll}
        data={flatListData}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        decelerationRate="fast"
        keyExtractor={keyExtractor}
        onEndReachedThreshold={0.9}
        removeClippedSubviews={false}
        bounces={false}
      />
    </View>
  );
};

export default Scroll;
