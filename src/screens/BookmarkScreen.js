import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Bookmark from '../components/BookmarkScreen/Bookmark';

export default function BookmarkScreen({ navigation }) {
  return (
    <SafeAreaView style={s.wrap}>
      <Bookmark />
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});