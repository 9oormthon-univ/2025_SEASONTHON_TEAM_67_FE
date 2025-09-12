import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function BackArrow({ onPress, style, imgStyle }) {
  const insets = useSafeAreaInsets();
  return (
    <TouchableOpacity
      style={[
        { position: 'absolute', left: 15, top: insets.top + 20, zIndex: 1 },
        style,
      ]}
      onPress={onPress}
    >
      <Image
        source={require('../assets/images/Common/arrow.png')}
        style={[styles.img, imgStyle]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
});
