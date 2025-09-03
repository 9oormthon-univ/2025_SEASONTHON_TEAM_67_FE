import { StyleSheet, View, Platform } from 'react-native';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import React, { useMemo } from 'react';

import NewsComponent from './NewsComponent';
import QuizComponent from './QuizComponent';

const ContentComponent = ({ data }) => {
  const insets = useSafeAreaInsets();
  const frame = useSafeAreaFrame();
  const safeHeight = frame.height - insets.top - insets.bottom;
  const newsStyle = useMemo(() => styles.news(safeHeight), [safeHeight]);

  return (
    <View style={newsStyle}>
      {data.content === 2 ? (
        <QuizComponent data={data} />
      ) : (
        <NewsComponent data={data} />
      )}
    </View>
  );
};

export default ContentComponent;

const styles = StyleSheet.create({
  news: safeHeight => ({
    width: '100%',
    height: Platform.OS === 'ios' ? safeHeight : safeHeight, //이후 변경
    padding: 20,
    // borderColor: 'black',
    // borderWidth: 1, //test
  }),
  controlsContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },
});
