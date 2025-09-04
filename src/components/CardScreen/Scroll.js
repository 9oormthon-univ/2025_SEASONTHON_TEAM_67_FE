import React, { useRef, useState, useCallback } from 'react';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Animated } from 'react-native';
import FeedRow from './FeedRow';

const Scroll = ({ data }) => {
  const { width, height } = useSafeAreaFrame();
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

  const keyExtractor = useCallback(item => `${item.id}`, []);

  const onScroll = useCallback(
    Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
      useNativeDriver: true,
    }),
    [],
  );

  const renderItem = useCallback(
    ({ item, index }) => {
      const { index: scrollIndex } = scrollInfo;
      const isNext = Math.abs(index - scrollIndex) <= 1;

      return (
        <FeedRow
          data={item}
          // index={index}
          // isNext={isNext}
          // visible={scrollInfo}
          // isVisible={scrollIndex === index}
        />
      );
    },
    [scrollInfo],
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Animated.FlatList
        pagingEnabled
        showsVerticalScrollIndicator={false}
        ref={refFlatList}
        automaticallyAdjustContentInsets
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig.current}
        onScroll={onScroll}
        data={data}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        decelerationRate="fast"
        keyExtractor={keyExtractor}
        onEndReachedThreshold={0.9}
        removeClippedSubviews
        bounces={false}
      />
    </SafeAreaView>
  );
};

export default Scroll;
