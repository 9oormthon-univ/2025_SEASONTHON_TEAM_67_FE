import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function BackArrow({ onPress, style, imgStyle }) {
  const insets = useSafeAreaInsets();
  return (
    <TouchableOpacity
      style={[
        styles.btn,
        { top: insets.top + 20 }, // SafeArea top 적용
        style,
      ]}
      onPress={onPress}
    >
      <Image
        source={require('../assets/images/Common/arrow.png')}
        style={[styles.img, { transform: [{ rotate: '90deg' }] }, imgStyle]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    left: 20,
    zIndex: 10,
  },
  img: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
});
