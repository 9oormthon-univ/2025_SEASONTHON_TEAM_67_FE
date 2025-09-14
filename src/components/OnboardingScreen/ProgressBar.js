import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function ProgressBar({ progress = 0 }) {
  // progress: 0 ~ 1
  return (
      <View style={s.container}>
        <View style={[s.bar, { flex: progress }]} />
        <View style={[s.barBg, { flex: 1 - progress }]} />
      </View>
  );
}

const s = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginHorizontal: 24,
    marginTop: 24,     // 화면과 떨어지도록
    marginBottom: 40,  // 타이틀과 간격
  },
  bar: {
    backgroundColor: '#FFFFFF', // ✅ 흰색
  },
  barBg: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
});
