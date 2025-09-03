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
      {/* <LinearGradient
        colors={[
          '#000000F0',
          '#000000D0',
          '#000000A0',
          '#00000070',
          '#00000040',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.5 }}
        style={styles.controlsContainer}
      /> */}
    </View>
  );
};

export default NewsComponent;

const styles = StyleSheet.create({
  news: safeHeight => ({
    backgroundColor: 'gray',
    width: '100%',
    height: Platform.OS === 'ios' ? safeHeight : safeHeight, //이후 변경
    borderColor: 'white',
    borderWidth: 2,
  }),
  controlsContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },
});
