import {
  StyleSheet,
  View,
  useWindowDimensions,
  Platform,
  Text,
} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import React, { useMemo } from 'react';

const ContentComponent = ({ data }) => {
  //   const { height } = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const frame = useSafeAreaFrame();
  const safeHeight = frame.height - insets.top - insets.bottom;
  const newsStyle = useMemo(() => styles.news(safeHeight), [safeHeight]);

  return (
    <View>
      <View style={newsStyle}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>
          test
        </Text>
      </View>
      {/* <View style={styles.controlsContainer} /> */}
    </View>
  );
};

export default ContentComponent;

const styles = StyleSheet.create({
  news: safeHeight => ({
    width: '100%',
    height: Platform.OS === 'ios' ? safeHeight : safeHeight, //이후 변경
    padding: 20,
    borderColor: 'black',
    borderWidth: 1, //test
  }),
  controlsContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },
});
