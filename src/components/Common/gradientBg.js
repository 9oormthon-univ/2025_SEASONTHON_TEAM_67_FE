import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function gradientBg({ children, style, overlayOpacity = 50 }) {
  // overlayOpacity: 0~100, 50이면 0.5
  const overlayAlpha = Math.max(0, Math.min(overlayOpacity, 100)) / 100;

  return (
    <LinearGradient
      colors={['#443C90', '#1C1A2F']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={[{ flex: 1 }, style]}
    >
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: `rgba(34,34,34,${overlayAlpha})`,
          zIndex: 1,
        }}
        pointerEvents="none"
      />
      <View style={{ flex: 1, zIndex: 2 }}>{children}</View>
    </LinearGradient>
  );
}
