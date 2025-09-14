import { StyleSheet, View, Platform } from 'react-native';

import { SafeAreaView, useSafeAreaFrame } from 'react-native-safe-area-context';
import React, { useMemo } from 'react';
import FeedSideBar from './FeedSideBar';
import FeedFooter from './FeedFooter';

const ContentWrapper = ({ data, RenderComponent }) => {
  const frame = useSafeAreaFrame();
  const safeHeight = frame.height;
  const container = useMemo(() => styles.container(safeHeight), [safeHeight]);

  React.useEffect(() => {
    console.log('ContentWrapper RenderComponent:', RenderComponent);
  }, [RenderComponent]);
  return (
    <View style={[container, { flex: 1 }]}>
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
    </View>
  );
};

export default ContentWrapper;

const styles = StyleSheet.create({
  container: safeHeight => ({
    width: '100%',
    height: Platform.OS === 'ios' ? safeHeight : safeHeight,
    paddingVertical: 20,
    paddingHorizontal: 14,
  }),
});
