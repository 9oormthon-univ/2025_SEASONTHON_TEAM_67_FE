import React, {
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import {
  useSafeAreaInsets,
  useSafeAreaFrame,
} from 'react-native-safe-area-context';
import {
  StyleSheet,
  Animated,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import NewsComponent from './NewsComponent';
import QuizComponent from './QuizComponent';
import ContentComponent from './ContentWrapper';
import HomeScreen from '../../screens/HomeScreen'; // 실제 경로에 맞게 수정
import BackArrow from '../back_arrow'; // 추가

const GradientFooter = ({ isHome }) => {
  const animatedValue = useRef(new Animated.Value(isHome ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isHome ? 1 : 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [isHome, animatedValue]);

  // 두 개의 Animated.View + LinearGradient를 겹치고 opacity로 cross-fade
  const homeOpacity = animatedValue;
  const normalOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <View style={s.footer}>
      <Animated.View
        style={[StyleSheet.absoluteFill, { opacity: normalOpacity }]}
        pointerEvents="none"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(22,22,22,0.5)']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
      </Animated.View>
      <Animated.View
        style={[StyleSheet.absoluteFill, { opacity: homeOpacity }]}
        pointerEvents="none"
      >
        <LinearGradient
          colors={['rgba(186,227,252,0.0)', 'rgba(135,206,250,0.2)']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
      </Animated.View>
    </View>
  );
};

// scroll
const Scroll = ({ data, scrollRef, navigation }) => {
  const { height } = useSafeAreaFrame();
  const [isHome, setIsHome] = useState(true);
  const [prevIsHome, setPrevIsHome] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current;

  // flatListData의 맨 앞에 HomeScreenComponent용 dummy 데이터 추가
  const flatListData = useMemo(() => {
    if (!Array.isArray(data)) return [];

    const result = [
      { type: 'home', id: 'home' }, // 첫 번째 아이템: HomeScreenComponent
    ];

    data.forEach(item => {
      if (item) {
        result.push({ ...item, type: 'news', id: item.id });
        if (Math.random() < 0.5) {
          result.push({ ...item, type: 'quiz', id: item.id });
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
        // FlatList의 높이로 현재 index 추정
        const idx = Math.round(offsetY / height);
        // flatListData[idx]가 home인지 체크
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

  // home 여부 추적
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
      // HomeScreen만 zIndex: 10 적용
      return (
        <HomeScreen
          key={`home_${item.id}`}
          navigation={navigation}
          onPressCard={itemId => {
            const idx = flatListData.findIndex(
              d => d.id === itemId && d.type !== 'home',
            );
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

  // FlatList에 ref 연결
  return (
    <View style={{ flex: 1 }}>
      <View pointerEvents={isHome ? 'none' : 'auto'}>
        <BackArrow style={{ zIndex: 0 }} />
        <BackArrow style={{ zIndex: 100, opacity: 0 }} onPress={handleGoHome} />
      </View>

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
