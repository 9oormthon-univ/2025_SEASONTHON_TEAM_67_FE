import React, {
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { StyleSheet, Animated, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import NewsComponent from './NewsComponent';
import QuizComponent from './QuizComponent';
import ContentComponent from './ContentWrapper';
import HomeScreen from '../../screens/HomeScreen'; // 실제 경로에 맞게 수정

const GradientFooter = ({ isHome }) => {
  const animatedValue = useRef(new Animated.Value(isHome ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isHome ? 1 : 0,
      duration: 700,
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

const Scroll = ({ data, onTypeChange, scrollRef, navigation }) => {
  const { height } = useSafeAreaFrame();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [scrollInfo, setScrollInfo] = useState({ isViewable: true, index: 0 });
  const [isHome, setIsHome] = useState(true); // 현재 보여지는 아이템이 home인지 체크
  const [isScrolled, setIsScrolled] = useState(false); // 스크롤 여부 상태
  const refFlatList = useRef(null);

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 80 });

  const onViewableItemsChanged = useCallback(
    ({ changed }) => {
      if (changed.length > 0) {
        setScrollInfo({
          isViewable: changed[0].isViewable,
          index: changed[0].index,
        });
        // home 여부 판단
        setIsHome(flatListData[changed[0].index]?.type === 'home');
      }
    },
    [flatListData],
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

  // 스크롤 위치에 따라 isScrolled 상태 변경
  const onScroll = useCallback(
    Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
      useNativeDriver: true,
      listener: event => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setIsScrolled(offsetY > 10); // 10px 이상 스크롤 시 true
      },
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
      if (item) {
        result.push({ ...item, type: 'news', id: item.id });
        if (Math.random() < 0.5) {
          result.push({ ...item, type: 'quiz', id: item.id });
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
        ref={scrollRef}
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
      <GradientFooter isHome={!isScrolled} />
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
