import React, { useRef, useState, useCallback, useMemo } from 'react';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { StyleSheet, Animated, View } from 'react-native';

import NewsComponent from './NewsComponent';
import QuizComponent from './QuizComponent';
import ContentComponent from './ContentWrapper';
import HomeScreen from '../../screens/HomeScreen'; // 실제 경로에 맞게 수정
import BackArrow from '../Common/back_arrow';
import GradientBg from '../Common/gradientBg';
import GradientFooter from '../Common/GradientFooter';

const Scroll = ({ data, scrollRef, navigation }) => {
  const { height } = useSafeAreaFrame();
  const [isHome, setIsHome] = useState(true);
  const [prevIsHome, setPrevIsHome] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current;

  const flatListData = useMemo(() => {
    if (!Array.isArray(data)) return [];

    const result = [
      { type: 'home', id: 'home' }, // 첫 번째 아이템: HomeScreenComponent
    ];

    data.forEach(item => {
      if (item) {
        // news 아이템
        const newsId = `${item.newsId ?? item.id}`;
        result.push({
          ...item,
          type: 'news',
          id: newsId,
        });
        // quiz 아이템 (랜덤)
        if (Math.random() < 0.5) {
          const quizId = `quiz_${item.newsId ?? item.id}`;

          result.push({
            ...item,
            type: 'quiz',
            id: quizId,
          });
        }
      }
    });
    return result;
  }, [data]);

  // 스크롤 위치에 따라 isScrolled 상태 변경
  const onScroll = useCallback(
    Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
      useNativeDriver: true,
      listener: event => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const idx = Math.round(offsetY / height);
        if (flatListData[idx]?.type === 'home') {
          setIsHome(true);
        } else {
          setIsHome(false);
        }
      },
    }),
    [flatListData, height],
  );

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

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }) => {
      if (viewableItems && viewableItems.length > 0) {
        setPrevIsHome(isHome);
        setIsHome(viewableItems[0].item.type === 'home');
      }
    },
    [isHome],
  );

  const handleGoHome = useCallback(() => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollToIndex({ index: 0, animated: true });
    }
  }, [scrollRef]);

  const renderItem = useCallback(
    ({ item }) => {
      if (item.type === 'news') {
        return (
          <View style={{ flex: 1 }}>
            <ContentComponent
              data={item}
              RenderComponent={NewsComponent}
              navigation={navigation}
              scrollRef={scrollRef}
            />
          </View>
        );
      }
      if (item.type === 'quiz') {
        return (
          <View style={{ flex: 1 }}>
            <ContentComponent
              data={item}
              RenderComponent={QuizComponent}
              navigation={navigation}
              scrollRef={scrollRef}
            />
          </View>
        );
      }
      return (
        <HomeScreen
          key={`home_${item.id}`}
          navigation={navigation}
          onPressCard={itemId => {
            const idx = flatListData.findIndex(
              d => d.id === itemId && d.type == 'news',
            );
            console.log('Scroll: home card pressed, idx:', idx);
            if (scrollRef && scrollRef.current && idx >= 0) {
              scrollRef.current.scrollToIndex({
                index: idx,
                animated: true,
              });
            }
          }}
        />
      );
    },
    [navigation, scrollRef, flatListData, isHome, prevIsHome, handleGoHome],
  );

  return (
    <View style={{ flex: 1 }}>
      <GradientBg overlayOpacity={50}>
        {/* 🔥 수정한 부분: 보이는 BackArrow에 onPress 연결 */}
        {!isHome && (
          <BackArrow
            style={{ zIndex: 100 }}
            onPress={handleGoHome}
          />
        )}

        <Animated.FlatList
          pagingEnabled
          showsVerticalScrollIndicator={false}
          ref={scrollRef}
          automaticallyAdjustContentInsets
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 20 }}
          onScroll={onScroll}
          scrollEventThrottle={5}
          data={flatListData}
          renderItem={renderItem}
          getItemLayout={getItemLayout}
          decelerationRate="fast"
          keyExtractor={keyExtractor}
          onEndReachedThreshold={0.9}
          removeClippedSubviews={false}
          bounces={false}
        />
        <GradientFooter isHome={isHome} />
      </GradientBg>
    </View>
  );
};

export default Scroll;

const s = StyleSheet.create({
  flexContainer: { flex: 1, backgroundColor: 'black' },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 200,
  },
});
