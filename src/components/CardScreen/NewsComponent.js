import { StyleSheet, View, useWindowDimensions, Platform } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import React, { useMemo } from 'react';

const NewsComponent = () => {
  //   const { height } = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const frame = useSafeAreaFrame();
  const safeHeight = frame.height - insets.top - insets.bottom;
  const newsStyle = useMemo(() => styles.news(safeHeight), [safeHeight]);

  return (
    <View>
      <View style={newsStyle} />
      {/* <View style={styles.controlsContainer} /> */}
    </View>
  );
};

export default NewsComponent;

const styles = StyleSheet.create({
  news: safeHeight => ({
    width: '100%',
    height: Platform.OS === 'ios' ? safeHeight : safeHeight, //이후 변경
    borderColor: 'black',
    borderWidth: 2,
  }),
  controlsContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },
});
