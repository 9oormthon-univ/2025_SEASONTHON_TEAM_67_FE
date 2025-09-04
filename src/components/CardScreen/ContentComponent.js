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
  const newsStyle = useMemo(() => s.news(safeHeight), [safeHeight]);

  return (
    <View style={newsStyle}>
      {data.content === 2 ? (
        <QuizComponent data={data} />
      ) : (
        <NewsComponent
          data={data}
          style={{ paddingHorizontal: 20, paddingVertical: 40 }}
        />
      )}
    </View>
  );
};

export default ContentComponent;

const s = StyleSheet.create({
  news: safeHeight => ({
    width: '100%',
    height: Platform.OS === 'ios' ? safeHeight : safeHeight, //이후 변경
    padding: 20,
    // borderColor: 'black',
    // borderWidth: 1, //test
  }),
});
