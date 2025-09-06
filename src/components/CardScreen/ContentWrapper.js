import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Platform,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  SafeAreaView,
  useSafeAreaInsets,
  useSafeAreaFrame,
} from 'react-native-safe-area-context';
import React, { useMemo } from 'react';
import FeedSideBar from './FeedSideBar';
import FeedFooter from './FeedFooter';

const ContentWrapper = ({
  data,
  RenderComponent,
  navigation,
  showArrow = true,
  scrollRef,
}) => {
  const insets = useSafeAreaInsets();
  const frame = useSafeAreaFrame();
  const safeHeight = frame.height;
  const container = useMemo(() => styles.container(safeHeight), [safeHeight]);

  const handleGoHome = () => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollToIndex({ index: 0, animated: true });
    }
  };
  React.useEffect(() => {
    console.log('ContentWrapper RenderComponent:', RenderComponent);
  }, [RenderComponent]);
  return (
    <View style={[container, { flex: 1 }]}>
      {showArrow && (
        <TouchableOpacity
          style={[styles.btn, { top: insets.top, zIndex: 2 }]}
          onPress={handleGoHome}
        >
          <Image
            source={require('../../assets/images/Common/arrow.png')}
            style={styles.img}
          />
        </TouchableOpacity>
      )}
      {/* <ImageBackground
        source={require('../../assets/images/Common/background.png')}
        style={s.flexContainer}
        resizeMode="cover"
      >
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'transparent',
          }}
          pointerEvents="none"
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(42, 32, 117, 0.3)',
            }}
          />
        </View>
      </ImageBackground> */}
      <SafeAreaView style={{ flex: 1 }}>
        {RenderComponent ? (
          <RenderComponent
            data={data}
            style={{ paddingVertical: 40, paddingHorizontal: 20 }}
          />
        ) : null}
        <FeedSideBar data={data} />
        <FeedFooter data={data} />
      </SafeAreaView>
      {/* <GradientFooter /> */}
    </View>
  );
};

export default ContentWrapper;

const styles = StyleSheet.create({
  container: safeHeight => ({
    width: '100%',
    height: Platform.OS === 'ios' ? safeHeight : safeHeight,
    padding: 20,
  }),
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 200,
  },
  btn: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  img: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
